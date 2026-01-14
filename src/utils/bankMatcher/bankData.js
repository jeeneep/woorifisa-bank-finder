export const BANK_PLUGINS_DATA = [
  {
    name: "우리은행",
    codes: ["020", "084"],
    subjects: ["006", "05", "01", "007", "15", "10", "002", "004", "08", "18", "92", "09"],
    rules: [
      { length: 13, subStart: 1, subLen: 3 }, // 단축코드(1)-과목(3)
      { length: 14, subStart: 9, subLen: 2 }, // 점(3)-고객(6)-과목(2)
      { length: 11, subStart: 3, subLen: 2 }, // 점(3)-과목(2)
      { length: 12, subStart: 3, subLen: 2 }  // 점(3)-고객(2)-과목(2)
    ]
  },
  {
    name: "신한은행",
    codes: ["088", "021", "026"],
    subjects: ["100", "110", "150", "140", "01", "04", "05", "81", "901", "99"],
    rules: [
      { length: 12, subStart: 0, subLen: 3 }, // 과목(3)-일련(8)-검증(1)
      { length: 11, subStart: 3, subLen: 2 }, // 점(3)-과목(2)
      { length: 13, subStart: 3, subLen: 3 }, // 가상
      { length: 14, subStart: 0, subLen: 3 }  // 가상
    ]
  },
  {
    name: "국민은행",
    codes: ["004", "006"],
    subjects: ["01", "21", "24", "05", "04", "25", "26", "92"],
    rules: [
      { length: 12, subStart: 4, subLen: 2 }, // 점(4)-과목(2)
      { length: 14, subStart: 4, subLen: 2 }  // 차세대/가상
    ]
  },
  {
    name: "기업은행",
    codes: ["003", "043"],
    subjects: ["01", "02", "03", "13", "07", "06", "04", "003"],
    rules: [
      { length: 14, subStart: 9, subLen: 2 }, // 점(3)-고객(6)-과목(2) 
      { length: 11, subStart: 0, subLen: 3 }, // 11자리 (대표코드 003으로 시작하는 경우)
      { length: 10, subStart: 0, subLen: 2 }
    ]
  },
  {
    name: "농협은행",
    codes: ["011", "012"],
    subjects: ["301", "302", "312", "306", "305", "01", "02", "12", "51", "52", "56", "790", "791", "792"],
    rules: [
      { length: 11, subStart: 3, subLen: 2 }, // 점(3)-과목(2) 
      { length: 13, subStart: 0, subLen: 3 }, // 과목(3)-일련(8) 
      { length: 14, subStart: 3, subLen: 2 }  // 점(3)-과목(2) 
    ]
  },
  {
    name: "하나은행",
    codes: ["005", "081"],
    subjects: ["611", "620", "600", "601", "630", "13", "33", "18", "05", "07", "08", "02", "01", "04"],
    rules: [
      { length: 12, subStart: 0, subLen: 3 }, // 차세대: 과목(3) 
      { length: 11, subStart: 3, subLen: 2 }, // 구: 점(3)-과목(2) 
      { length: 14, subStart: 13, subLen: 1 } // 외환: 마지막 과목 
    ]
  }
];