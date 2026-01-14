import React, { useState, useEffect } from 'react';
import AccountInput from './AccountInput';
import BankButtonList from './BankButtonList';
import CustomKeypad from './CustomKeypad';
import { getMatchedBanks } from '../utils/bankMatcher'; // [박지은] 로직 임포트

const BankFinder = () => {
  // 1. 상태 정의
  const [account, setAccount] = useState('');      // 계좌번호
  const [matchedBanks, setMatchedBanks] = useState([]); // 매칭된 은행들

  // 2. 로직 호출 (박지은: bankMatcher 로직 호출)
  useEffect(() => {
    // 류경록 님이 Debounce 처리된 값을 주면 더 좋고, 
    // 여기서 직접 호출도 가능
    const results = getMatchedBanks(account);
    setMatchedBanks(results);
  }, [account]); // account가 바뀔 때마다 실행

  // 3. 이벤트 핸들러
  const handleInputChange = (value) => setAccount(value);
  const handleKeyPress = (num) => setAccount((prev) => prev + num);
  const handleDelete = () => setAccount((prev) => prev.slice(0, -1));

  return (
    <div className="bank-finder-container">
      {/* 류경록: 계좌번호 입력창 */}
      <AccountInput 
        value={account} 
        onChange={handleInputChange} 
      />

      {/* 김시온: 결과 버튼 리스트 (매칭된 결과를 전달) */}
      <BankButtonList 
        banks={matchedBanks} 
      />

      {/* 고희연: 키패드 (입력/삭제 함수 전달) */}
      <CustomKeypad 
        onInput={handleKeyPress} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default BankFinder;