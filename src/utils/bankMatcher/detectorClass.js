/**
 * [Architecture]
 * GenerateDetector: 인덱스 기반 과목코드 검증 + 은행 코드 가산점
 */
export class GenerateDetector {
  constructor(bankName, bankCodes, subjectCodes, accountRules) {
    this.bankName = bankName;
    this.bankCodes = bankCodes; // ['020', '084', ...]
    this.subjectCodes = subjectCodes;
    this.accountRules = accountRules;
  }

  evaluate(accountNumber) {
    let score = 0;
    const cleanNumber = accountNumber.replace(/-/g, "");

    // 은행 대표 코드로 시작할 경우 가산점
    for (const bCode of this.bankCodes) {
      if (cleanNumber.startsWith(bCode)) {
        score += 5; // 대표 코드로 시작하면 5점 추가
      }
    }

    // 1. 해당 계좌 길이와 일치하는 규칙 탐색
    const matchedRule = this.accountRules.find(rule => rule.length === cleanNumber.length);

    if (matchedRule) {
      score += 0.5; // 자리수 일치 기본 점수

      // 2. 문서에 명시된 위치에서 과목코드 추출
      const extractedCode = cleanNumber.substring(
        matchedRule.subStart, 
        matchedRule.subStart + matchedRule.subLen
      );

      // 3. 추출된 코드가 해당 은행의 과목코드 목록에 있는지 확인
      if (this.subjectCodes.includes(extractedCode)) {
        // 정확한 인덱스 매칭이므로 높은 가중치 부여
        score += (extractedCode.length * 5); 
      }
    }

    return {
      bankName: this.bankName,
      representativeCode: this.bankCodes[0],
      score: score
    };
  }
}

export class AccountNumberDetector {
  constructor() {
    this.detectors = [];
  }

  addDetector(detector) {
    this.detectors.push(detector);
  }

  detectAccountNumber(accountNumber) {
    if (!accountNumber || accountNumber.length < 8) return [];

    const results = this.detectors.map(detector => detector.evaluate(accountNumber));

    // 1. 점수가 있는 은행들 필터링 및 정렬
    let sortedResults = results
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score);

    // 2. 만약 모든 결과가 0점이라면? (잘못 입력한 경우)
    if (sortedResults.length === 0) {
      // 자리수라도 맞는지 재확인 (0.5점 미만인 것들 중 추천)
      // 혹은 서비스 정책에 따라 빈 배열 반환
      return []; 
    }

    return sortedResults.slice(0, 3);
  }
}