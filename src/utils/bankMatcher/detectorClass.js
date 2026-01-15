/**
 * GenerateDetector: 각 은행의 개별 규칙을 관리하고 점수를 계산하는 플러그인
 */
export class GenerateDetector {
  // 인자 2개(은행명, 규칙배열)
  constructor(bankName, accountRules) {
    this.bankName = bankName;
    this.accountRules = accountRules;
  }

  evaluate(accountNumber) {
    let score = 0;
    const cleanNumber = accountNumber.replace(/-/g, "");
    const accountLen = cleanNumber.length;

    const matchedRules = (this.accountRules || []).filter(rule => rule.length === accountLen);

    if (matchedRules.length > 0) {
      score += 0.5; // 길이 일치 기본 점수

      matchedRules.forEach(rule => {
        if (!rule.subLen || rule.subLen === 0) return;

        const extractedCode = cleanNumber.substring(
          rule.subStart, 
          rule.subStart + rule.subLen
        );

        if (rule.subjects && rule.subjects.includes(extractedCode)) {
          score += (rule.subLen * 5); 
        }
      });
    }

    return {
      bankName: this.bankName,
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

    const results = this.detectors.map(detector => detector.evaluate(accountNumber));

    return results
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }
}