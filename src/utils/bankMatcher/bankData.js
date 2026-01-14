export const BANK_PLUGINS_DATA = [
  {
    name: "우리은행",
    codes: ["020", "022", "024", "083", "084"],
    rules: [
      { length: 13, subStart: 1, subLen: 3, subjects: ["006", "007", "002", "004", "003", "005"] }, // 통합우리 
      { length: 14, subStart: 9, subLen: 2, subjects: ["18", "92", "01", "15", "02", "12", "04", "03", "13"] }, // 연계/한일 
      { length: 11, subStart: 3, subLen: 2, subjects: ["05", "06", "07", "08", "02", "01", "04"] }, // 구 상업 
      { length: 12, subStart: 3, subLen: 2, subjects: ["01", "21", "24", "05", "04", "25", "09"] }  // 구 평화 
    ]
  },
  {
    name: "신한은행",
    codes: ["088", "021", "026", "028"],
    rules: [
      { 
        length: 12, 
        subStart: 0, 
        subLen: 3, 
        // 100~109, 110~139, 140~149, 150~154, 155~159, 160, 161, 298, 268, 269 확장 
        subjects: [
          ...range(100, 161), 
          "298", "268", "269"
        ] 
      },
      { length: 11, subStart: 3, subLen: 2, subjects: ["01", "09", "61", "04", "05", "06", "08", "02", "07", "03", "11", "12", "13", "99"] },
      { length: 13, subStart: 3, subLen: 2, subjects: ["81", "82"] },
      { length: 14, subStart: 0, subLen: 3, subjects: ["560", "561", "562"] },
      { length: 14, subStart: 3, subLen: 3, subjects: ["901"] }
    ]
  },
  {
    name: "국민은행",
    codes: ["004", "006", "019", "029", "079", "078"],
    rules: [
      { length: 12, subStart: 3, subLen: 2, subjects: ["01", "05", "04", "21", "24", "25", "26"] }, // 국민 표준 
      { length: 12, subStart: 4, subLen: 2, subjects: ["06", "18"] }, // 구 주택 
      { length: 14, subStart: 4, subLen: 2, subjects: ["92", "01", "02", "25", "37", "90"] }, // 가상계좌, 구 주택
      { length: 10, subStart: 0, subLen: 0, subjects: [] }, // 고객지정번호 체계 (과목코드 추출 불가) 
      { length: 11, subStart: 0, subLen: 0, subjects: [] }  // 고객지정번호 체계 (과목코드 추출 불가) 
    ]
  },
  {
    name: "기업은행",
    codes: ["003", "043"],
    rules: [
      { length: 14, subStart: 9, subLen: 2, subjects: ["01", "02", "03", "13", "07", "06", "04"] }, // 표준 
      { length: 12, subStart: 3, subLen: 2, subjects: ["01", "02", "03", "13", "07", "06", "04"] }, // 구형 
      { length: 10, subStart: 0, subLen: 0, subjects: [] }, // 고객번호-일련번호 체계 (과목코드 없음) 
      { length: 11, subStart: 0, subLen: 0, subjects: [] }  // 고객구분-고객번호 체계 (과목코드 없음) 
    ]
  },
  {
    name: "농협은행",
    codes: ["011", "012", "010", "016"],
    rules: [
      { length: 11, subStart: 3, subLen: 2, subjects: ["01", "02", "12", "06", "05", "17", "04", "10", "14", "21", "24", "34", "45", "47", "49", "59", "80", "28", "31", "43", "46","79", "81", "86", "87", "88" ] }, // 점(3)-과목(2) 
      { length: 12, subStart: 4, subLen: 2, subjects: ["01", "02", "12", "06", "05", "17", "04", "10", "14", "21", "24", "34", "45", "47", "49", "59", "80", "28", "31", "43", "46","79", "81", "86", "87", "88"] }, // 점(3)-과목(2) 
      { length: 13, subStart: 0, subLen: 3, subjects: ["301", "302", "312", "306", "305", "317", "304", "310", "314", "321", "324", "334", "345", "347", "349", "359", "380", "028", "031","043", "046","079","081","086","087","088"] }, // 상품기반
      { length: 14, subStart: 6, subLen: 2, subjects: ["64", "65"] }, 
      { length: 14, subStart: 0, subLen: 3, subjects: ["790", "791", "792"] } // 신가상계좌 
    ]
  },
  {
    name: "하나은행",
    codes: ["005", "081", "025", "033", "080", "082"],
    rules: [
      { length: 12, subStart: 0, subLen: 3, subjects: ["611", "620", "600", "601", "630", "610", "621", "631"] }, // 차세대 
      { length: 11, subStart: 3, subLen: 2, subjects: ["13", "33", "18", "19", "26", "11", "22", "38", "39"] }, // 구 하나
      { length: 14, subStart: 12, subLen: 2, subjects: ["05", "07", "08", "02", "01", "04", "94"] } // 구 외환 
    ]
  }
];