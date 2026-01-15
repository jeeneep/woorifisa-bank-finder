import React from 'react'

/**
 * CustomKeypad
 * - 숫자(0~9) 입력: onInput(num) 호출
 * - 삭제(백스페이스): onDelete() 호출
 */
const CustomKeypad = ( { onInput, onDelete } ) => {

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
        <div className="CustomKeypad_grid">
        {[1,2,3,4,5,6,7,8,9].map(n => (
            <button 
                type="button" 
                key={n} 
                className="CustomKeypad_button"
                onClick={() => handleDigitClick(n)}>
            {n}
            </button>
        ))}

        {/* 왼쪽 하단: 빈 공간 (디자인 균형 맞추기용) */}
        <div className="CustomKeypad_empty"></div>

        {/* 중앙 하단: 숫자 0 */}
        <button
            type="button"
            className="CustomKeypad_button"
            onClick={() => handleDigitClick(0)}
        >
            0
        </button>

        <button 
            type="button" 
            className="CustomKeypad_button"
            onClick={handleDeleteClick}>⌫</button>
        </div>
    )
}

export default CustomKeypad