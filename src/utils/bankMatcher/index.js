import { GenerateDetector, AccountNumberDetector } from './detectorClass.js';
import { BANK_PLUGINS_DATA } from './bankData.js';

const detectorSystem = new AccountNumberDetector();

/**
 * 데이터 기반으로 감지기 등록
 */
BANK_PLUGINS_DATA.forEach(data => {
  detectorSystem.addDetector(new GenerateDetector(data.name, data.rules));
});


/**
 * 외부에서 사용할 메인 함수
 * @param {string} accountNumber - 검증할 계좌번호
 * @returns {Array} score 기반 정렬된 은행 리스트
 */
export const detectAccountNumber = (accountNumber) => {
  return detectorSystem.detectAccountNumber(accountNumber);
};

export { GenerateDetector, AccountNumberDetector };