import { GenerateDetector, AccountNumberDetector } from './detectorClass.js';
import { BANK_PLUGINS_DATA } from './bankData.js';

// 엔진 인스턴스 생성
const detectorSystem = new AccountNumberDetector();

/**
 * 데이터 기반으로 감지기 등록
 * [수정사항] subjects를 별도 인자로 보내지 않고 rules 데이터에 포함된 것을 사용합니다.
 */
BANK_PLUGINS_DATA.forEach(data => {
  detectorSystem.addDetector(
    new GenerateDetector(data.name, data.codes, data.rules)
  );
});

/**
 * 외부에서 사용할 메인 함수
 * @param {string} accountNumber - 검증할 계좌번호
 * @returns {Array} score 기반 정렬된 은행 리스트
 */
export const detectAccountNumber = (accountNumber) => {
  return detectorSystem.detectAccountNumber(accountNumber);
};

// 클래스도 필요한 경우를 위해 별도로 export
export { GenerateDetector, AccountNumberDetector };