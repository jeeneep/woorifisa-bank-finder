import React, { useEffect, useState } from 'react';

const AccountInput = ({value, onChange}) => {
  const [localValue, setLocalValue] = useState(value); // 입력값 반응

  // 계좌번호 입력 변경값 동기화를 위한 로직
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // 일정 시간 입력 없으면 부모에게 전달(변경값)
  useEffect(() => {
    const timer = setTimeout(() => {
    if(localValue != value) {
      onchange(localValue);
    }
  }, 2000); // 2초 딜레이

  return () => clearTimeout(timer);
  }, [localValue, onChange, value]);


  // 숫자 이외의 -값과 같은 문자 자동 제거
  const handleChange = (e) => {
    const rawValue = e.target.value;
    // 숫자 필터링 변수
    const organizedValue = rawValue.replace(/[^0-9]/g, '');

    setLocalValue(organizedValue);
  }

  // useEffect의 정리 이펙트(딜레이값 전달을 위해 return 형식 변형)
  return (
    // 전체 컨테이너 (중앙 정렬)
    <div className="AccountInput_container">

      {/* 라벨 (글씨 담당) */}
      <p className="AccountInput_label">보낼 계좌번호</p>

      {/* 입력창 영역 */}
      <div className="AccountInput_display">
        <input
          type="text"
          className="AccountInput_field"
          placeholder="계좌번호 입력"
          value={localValue}
          onChange={handleChange}
          inputMode="numeric"
        />
      </div>
    </div>
  );
};

export default AccountInput;