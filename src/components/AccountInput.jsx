import { useEffect, useState } from 'react';

const AccountInput = ({value, onChange, bankName, onClear}) => {
  const [localValue, setLocalValue] = useState(value); 

  // 계좌번호 입력 변경값 동기화를 위한 로직
  useEffect(() => {
      const limitedValue = value.slice(0, 14);
      setLocalValue(limitedValue);
    }, [value]);

  // 일정 시간 입력 없으면 부모에게 전달
  useEffect(() => {
      const timer = setTimeout(() => {
      if(localValue != value) {
        onChange(localValue);
      }
    }, 2000);

    return () => clearTimeout(timer);
    }, [localValue, onChange, value]);

  const handleClear = () => {
    setLocalValue(''); // 화면 지우기

    if(onClear){
      onClear();
    } else{
      onChange(''); // 부모 상태(BankFinder)도 즉시 지우기  
    }
  };

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

      <div className="AccountInput_actions">
        {localValue.length > 0 && (
          <button 
            type="button"
            className="AccountInput_clearBtn" 
            onClick={handleClear}
          >
            전체 삭제
          </button>
        )}
      </div>  
    </div>
  );
};

export default AccountInput;