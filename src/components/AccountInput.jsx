import React, { useEffect, useState } from 'react';

const AccountInput = ({value, onChange, bankName}) => {
  const [localValue, setLocalValue] = useState(value); // 입력값 반응

  // 계좌번호 입력 변경값 동기화를 위한 로직
  useEffect(() => {
    const limitedValue = value.slice(0, 16);
    setLocalValue(limitedValue);
  }, [value]);

  // 일정 시간 입력 없으면 부모에게 전달(변경값)
  useEffect(() => {
    const timer = setTimeout(() => {
    if(localValue != value) {
      onChange(localValue);
    }
  }, 2000); // 2초 딜레이

  return () => clearTimeout(timer);
  }, [localValue, onChange, value]);


  // useEffect의 정리 이펙트(딜레이값 전달을 위해 return 형식 변형)
  return (
    // 전체 컨테이너 (중앙 정렬)
    <div className="AccountInput_container">

      {/* 라벨 (글씨 담당) */}
      <p className="AccountInput_label">
      {bankName ? 
      <>
      <span className="AccountInput_bankLogo BankIcon" data-bank={bankName}/>
      <span>{bankName}</span>
      </> : "보낼 계좌번호"}
      </p>

      {/* 입력창 영역 */}
      <div className="AccountInput_display">
        <input
          type="text"
          className="AccountInput_field"
          placeholder="계좌번호 입력"
          value={localValue}
          readOnly
        />
      </div>
    </div>
  );
};

export default AccountInput;