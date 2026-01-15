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

        <div className="CustomKeypad_empty"></div>
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