import React from 'react'

/**
 * CustomKeypad
 * - 숫자(0~9) 입력: onInput(num) 호출
 * - 삭제(백스페이스): onDelete() 호출
 */
const CustomKeypad = ( props ) => {
    const { onInput, onDelete } = props;

    // 숫자 눌렀을 때 실행되는 함수
    const handleDigitClick = (digit) => {
        if (typeof onInput !== "function") return;
        onInput(String(digit));
    };

    // 삭제 버튼 눌렀을 때 실행되는 함수
    const handleDeleteClick = () => {
        if (typeof onDelete !== "function") return;
        onDelete();
    };

    return (
        <div role="group" aria-label="custom keypad">
        {[1,2,3,4,5,6,7,8,9,0].map(n => (
            <button 
                type="button" 
                key={n} 
                onClick={() => handleDigitClick(n)}>
            {n}
            </button>
        ))}
        <button 
            type="button" 
            onClick={handleDeleteClick}>⌫</button>
        </div>
    )
}

export default CustomKeypad