import React, { useState, useEffect } from 'react';
import AccountInput from './AccountInput';
import BankButtonList from './BankButtonList';
import CustomKeypad from './CustomKeypad';
import { detectAccountNumber } from '../utils/bankMatcher';

const BankFinder = () => {
  // 1. 상태 정의
  const [account, setAccount] = useState('');      // 계좌번호
  const [matchedBanks, setMatchedBanks] = useState([]); // 매칭된 은행들
  const [selectedBank, setSelectedBank] = useState(null); // 선택된 은행
  
  // 2. 로직 호출 (박지은: bankMatcher 로직 호출)
  useEffect(() => {
    // 류경록 님이 Debounce 처리된 값을 주면 더 좋고,
    // 여기서 직접 호출도 가능
    const results = detectAccountNumber(account);
    setMatchedBanks(results);
  }, [account]); // account가 바뀔 때마다 실행

  // 3. 이벤트 핸들러
  const handleInputChange = (value) => setAccount(value);
  const handleKeyPress = (num) => setAccount((prev) => {
    if((prev+num).length > 16) return prev;
    return prev + num;
  });
  const handleDelete = () => setAccount((prev) => prev.slice(0, -1));
  const handleSelectBank = (bank) => {setSelectedBank(bank);};
  
  return (
    <div className="BankFinder_container">
      
      {/* 상단: 네비게이션 바 */}
      <nav className="BankFinder_navbar">
        <span className="BankFinder_navTitle">계좌 입력</span>
      </nav>

      {/* 중앙: 입력창 (남은 공간 차지) */}
      <main className="BankFinder_content">
        <AccountInput 
          value={account} 
          onChange={handleInputChange} 
          bankName={selectedBank?.bankName || ""}
        />
      </main>

      {/* 하단: 은행 리스트 + 키패드 (고정) */}
      <footer className="BankFinder_footer">
        
        {/* 은행 목록 */}
        <BankButtonList 
          banks={matchedBanks} 
          onSelect={handleSelectBank}
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