import { useState, useEffect } from 'react';
import AccountInput from './AccountInput';
import BankButtonList from './BankButtonList';
import CustomKeypad from './CustomKeypad';
import { detectAccountNumber } from '../utils/bankMatcher';

const BankFinder = () => {

  const [account, setAccount] = useState('');      // 계좌번호
  const [matchedBanks, setMatchedBanks] = useState([]); // 매칭된 은행들
  const [selectedBank, setSelectedBank] = useState(null); // 선택된 은행

  useEffect(() => {
    const results = detectAccountNumber(account);
    setMatchedBanks(results);
  }, [account]); 

  // 입력창의 값이 변경될 때 계좌번호 상태를 업데이트 (동기화)
  const handleInputChange = (value) => setAccount(value);

  // 키패드 숫자를 입력받아 뒤에 추가하며, 최대 14자리까지만 입력 허용
  const handleKeyPress = (num) => {
    setAccount((prev) => {
    if((prev+num).length > 14) return prev;
    return prev + num;
    });
  };

  // 마지막 글자를 지우고, 번호가 변경되므로 선택된 은행 정보도 함께 초기화
  const handleDelete = () => {
    setSelectedBank(null);
    setAccount((prev) => prev.slice(0, -1));
  }

  // 사용자가 리스트에서 특정 은행을 클릭했을 때 해당 은행을 선택 상태로 저장
  const handleSelectBank = (bank) => {setSelectedBank(bank);};

  // '전체 삭제' 버튼 클릭 시 계좌번호와 선택된 은행 정보를 모두 초기화
  const handleClearAll = () => {
    setAccount(''); 
    setSelectedBank(null);
  };

  return (
    <div className="BankFinder_container">
      <nav className="BankFinder_navbar">
        <span className="BankFinder_navTitle">계좌 입력</span>
      </nav>

      {/* 입력창 */}
      <main className="BankFinder_content">
        <AccountInput
          value={account}
          onChange={handleInputChange}
          bankName={selectedBank?.bankName || ""}
          onClear={handleClearAll}
        />
      </main>

      <footer className="BankFinder_footer">
        {/* 은행 목록 */}
        <BankButtonList
          banks={matchedBanks}
          onSelect={handleSelectBank}
          selectedBankName={selectedBank?.bankName}
        />
        {/* 키패드 */}
        <CustomKeypad
          onInput={handleKeyPress}
          onDelete={handleDelete}
        />
      </footer>

    </div>
  );
};
export default BankFinder;