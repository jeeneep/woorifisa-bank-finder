import React from 'react';

const BankButtonList = ({ banks = [], onSelect, selectedBankName }) => {

    // 추천 은행이 없을 경우 아예 안 보여줌 (빈 화면)
    if (!banks || banks.length === 0) return null;

    return (
        // 1. 전체 컨테이너
        <div className="BankButtonList_container">
            
            {/* 라벨("보낼 은행 선택") 삭제함 */}

            {/* 2. 스크롤 영역 (가로 스크롤은 유지) */}
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