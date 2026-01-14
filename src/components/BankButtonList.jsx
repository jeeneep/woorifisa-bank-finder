import React from 'react'

const BankButtonList = ( props ) => {
    const { banks = [], onSelect } = props;

    // 추천 은행이 없을 경우
    if (!banks || banks.length === 0) return null;

    return (
        <div>
        {banks.map((bank) => (
            <button
                key={bank.representativeCode || bank.bankName}
                type="button"
                onClick={() => {
                    if (typeof onSelect === "function") onSelect(bank);
                }}
            >
            {bank.bankName}
            </button>
        ))}
        </div>
    )
}

export default BankButtonList