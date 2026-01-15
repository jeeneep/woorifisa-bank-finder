const BankButtonList = ({ banks = [], onSelect, selectedBankName }) => {

    if (!banks || banks.length === 0) return null;

    return (
        <div className="BankButtonList_container">
            <div className="BankButtonList_scroll">
                
                {banks.map((bank) => {
                    const isSelected = bank.bankName === selectedBankName;

                    return (
                        <button
                            key={bank.representativeCode || bank.bankName}
                            type="button"
                            className={`BankButtonList_item ${isSelected ? "is-selected" : ""}`}
                            onClick={() => {
                                if (typeof onSelect === "function") onSelect(bank);
                            }}
                        >
                            {/* 아이콘 */}
                            <div 
                                className="BankButtonList_icon BankIcon"
                                data-bank={bank.bankName}>
                            </div>

                            {/* 은행 이름 */}
                            <span className="BankButtonList_name">
                                {bank.bankName}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BankButtonList;