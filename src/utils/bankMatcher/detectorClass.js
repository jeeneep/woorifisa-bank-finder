/**
 * [Architecture]
 * GenerateDetector: 각 은행의 개별 규칙을 관리하고 점수를 계산하는 플러그인
 */
export class GenerateDetector {
  // 인자를 3개(은행명, 기관코드배열, 규칙배열)로 조정하여 데이터 구조와 맞춥니다.
  constructor(bankName, bankCodes, accountRules) {
    this.bankName = bankName;
    this.bankCodes = bankCodes;
    this.accountRules = accountRules; // 각 rule 내부에 subjects가 포함된 구조
  }

  evaluate(accountNumber) {
    let score = 0;
    const cleanNumber = accountNumber.replace(/-/g, "");
    const accountLen = cleanNumber.length;

    // 1. 은행 기관 코드로 시작할 경우 가산점 (식별력 강화)
    for (const bCode of this.bankCodes) {
      if (cleanNumber.startsWith(bCode)) {
        score += 5; 
      }
    }

    // 2. 해당 계좌 길이와 일치하는 '모든' 규칙 탐색 (국민은행 12자리 인덱스 3, 4 동시 대응) 
    const matchedRules = (this.accountRules || []).filter(rule => rule.length === accountLen);

    if (matchedRules.length > 0) {
      score += 0.5; // 자리수 일치 기본 점수

      matchedRules.forEach(rule => {
        // 과목코드가 없는 평생계좌(subLen: 0) 등은 점수 계산 제외 [cite: 42]
        if (!rule.subLen || rule.subLen === 0) return;

        // 3. 문서에 명시된 위치에서 과목코드 추출
        const extractedCode = cleanNumber.substring(
          rule.subStart, 
          rule.subStart + rule.subLen
        );

        // 4. 해당 규칙(길이/인덱스)에 정의된 전용 과목코드 목록과 대조
        if (rule.subjects && rule.subjects.includes(extractedCode)) {
          // 과목코드 길이에 비례하여 가중치 부여 (3자리면 15점, 2자리면 10점)
          score += (rule.subLen * 5); 
        }
      });
    }

    return {
      bankName: this.bankName,
      representativeCode: this.bankCodes[0],
      score: score
    };
  }
}

/**
 * AccountNumberDetector: 등록된 모든 플러그인을 순회하며 가장 적합한 은행을 탐지
 */
export class AccountNumberDetector {
  constructor() {
    this.detectors = [];
  }

  addDetector(detector) {
    this.detectors.push(detector);
  }

  detectAccountNumber(accountNumber) {
    if (!accountNumber || accountNumber.length < 8) return [];

    // 모든 detector를 순회하며 score 계산
    const results = this.detectors.map(detector => detector.evaluate(accountNumber));

    // 점수가 높은 순으로 정렬하여 상위 3개 반환
    return results
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }
}