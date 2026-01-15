# woorifisa-bank-finder

keypad

### 설치 방법

```bash
npm install korean-bank-finder
```

### 배포 정보
- **npm 패키지명**: `korean-bank-finder`
- **배포 링크**: [korean-bank-finder](https://www.npmjs.com/package/korean-bank-finder)


<br>

### 컴포넌트 구조

```YAML

main.jsx (Entry Point & Style Injection)
 │  # 앱의 시작점
 │  # 핵심 역할: layout.css(구조)와 theme.css(디자인)를 이곳에서 import하여 주입
 │
 └─ App.jsx (Root Component)
     │  # BankFinder 컴포넌트를 마운트(Mount)하는 역할
     │
     ├─ BankFinder.jsx (Container / Page)
     │   │  # 계좌번호 상태 관리, 자식 컴포넌트 제어
     │   │  # 핵심 역할: 유틸 로직(detectAccountNumber)을 호출하여 실시간 은행 필터링 수행
     │   │
     │   ├─ AccountInput.jsx
     │   │   # 입력된 계좌번호를 시각화
     │   │
     │   ├─ BankButtonList.jsx
     │   │   # 탐지된 상위 3개 추천 은행을 버튼 형태로 렌더링
     │   │
     │   └─ CustomKeypad.jsx
     │       # 3x4 커스텀 숫자 입력기 및 입력 로직 제어
     │
     └─ utils/bankMatcher/ (Detection Logic) 
         │  # UI와 분리된 순수 비즈니스 로직
         │
         ├─ detectorClass.js
         │   # 금융결제원 표준 기반 은행 판별 알고리즘 
         │
         ├─ bankData.js
         │   # 6대 시중은행의 실계좌/가상계좌 과목코드 데이터
         │
         └─ index.js
             # 로직과 데이터를 통합하여 외부로 연결하는 인터페이스

```

<br>


## BankFinder.jsx

#### 중앙 집중형 상태 관리
- 앱의 핵심 데이터를 BankFinder 한 곳에서 통합 관리
- 하위 UI 컴포넌트는 스스로 상태를 갖지 않고, 부모로부터 props를 통해 데이터와 수정 함수 전달 받기

```javascript
// 상태(State)는 컨테이너가 소유
const [account, setAccount] = useState('');
const [matchedBanks, setMatchedBanks] = useState([]);

return (
  	// UI 컴포넌트에는 데이터(props)와 로직(handler)만 주입
    <BankButtonList banks={matchedBanks} onSelect={handleSelectBank} />
    <CustomKeypad onInput={handleKeyPress} onDelete={handleDelete} />
);

```

#### 비즈니스 로직 통합 및 제어
- `useEffect`를 통해 `account` 상태 변경을 감지하고, `detectAccountNumber` 유틸리티를 호출하여 실시간 은행 매칭 수행
- 입력값 길이 제한(16자) 및 삭제 시 선택된 은행 초기화 등의 로직을 수행하여 잘못된 데이터가 UI로 전파되는 것을 차단

```javascript
// 로직 1. 계좌번호 변경 시 은행 매칭 수행
useEffect(() => {
  const results = detectAccountNumber(account);
  setMatchedBanks(results);
}, [account]);

// 로직 2. 입력값 유효성 검사 및 상태 방어
const handleKeyPress = (num) => {
  setAccount((prev) => {
    if ((prev + num).length > 16) return prev; // 길이 제한
    return prev + num;
  });
};

```

<br>

## AccountInput.jsx
#### 계좌번호 입력 변경값 동기화
- 상위 컴포넌트에서 전달된 `value`가 변경될 때마다 로컬 상태(`localValue`)를 동기화
- 외부 입력(키패드, 초기값 변경 등)과 내부 입력 상태 간 불일치 방지
```javascript
  useEffect(() => {
      const limitedValue = value.slice(0, 16);
      setLocalValue(limitedValue);
    }, [value]);
```

#### 입력 변경 지연 처리
- `localValue`가 변경될 때마다 `useEffect`가 실행되어 타이머를 설정
- 일정 시간(2초) 동안 추가 입력이 없을 경우에만 콜백 로직을 수행하도록 구성
- `localValue`와 외부에서 전달된 `value`가 다를 때만 `onChange(localValue)`를 호출하여 불필요한 상태 업데이트를 방지
- 새로운 입력이 발생하면 이전 타이머를 `clearTimeout`으로 제거하여 마지막 입력만 반영되도록 처리

```javascript
useEffect(() => {
	const timer = setTimeout(() => {
	if(localValue != value) {
		onChange(localValue);
		}
	}, 2000); // 2초 딜레이

	return () => clearTimeout(timer);
}, [localValue, onChange, value]);

```

<br>

## BankButtonList.jsx

#### 은행 선택 이벤트 위임
- 은행 버튼 클릭 시 선택된 은행 객체를 부모로 전달(`onSelect(bank)`)

```javascript
onClick={() => {
  if (typeof onSelect === "function") onSelect(bank);
}}
```

#### 리스트 렌더링 방식
- `banks.map()`으로 버튼 리스트 생성

```javascript
{banks.map((bank) => (
  <button key={bank.representativeCode || bank.bankName}>
    {bank.bankName}
  </button>
))}
```

<br>

## Detection Logic

금융결제원(KFTC) 표준안을 기반으로 한 Score-based Index Matching 알고리즘을 통해 계좌번호의 소속 은행을 판별


## detectorClass.js

### 점수 기반 가중치 시스템 (Scoring System)
- 인덱스 매칭
  -  각 은행별로 상이한 과목코드 위치(subStart)와 길이(subLen)를 전수 조사하여 데이터화
- 자리수 일치
   - 입력된 번호의 길이가 은행별 계좌 체계와 일치할 경우 기본 점수(0.5pt) 부여
- 과목코드 일치
  - 특정 위치의 숫자가 해당 은행의 유효 과목코드일 경우, 코드 길이에 비례한 가중치(2자리: 10pt, 3자리: 15pt) 부여

```javascript

// 핵심 스코어링 로직
evaluate(accountNumber) {
  let score = 0;
  const cleanNumber = accountNumber.replace(/-/g, "");
  const accountLen = cleanNumber.length;

  const matchedRules = (this.accountRules || []).filter(rule => rule.length === accountLen);

  if (matchedRules.length > 0) {
    score += 0.5; // 자릿수 일치 기본 점수

    matchedRules.forEach(rule => {
      // 1. 문서에 명시된 위치(subStart)에서 과목코드 추출
      const extractedCode = cleanNumber.substring(rule.subStart, rule.subStart + rule.subLen);

      // 2. 해당 은행의 유효 과목코드 목록(subjects)과 대조
      if (rule.subjects && rule.subjects.includes(extractedCode)) {
        // 3. 코드 길이에 비례한 가중치 부여 (2자리면 10점, 3자리면 15점)
        score += (rule.subLen * 5); 
      }
    });
  }
  return { bankName: this.bankName, score: score };
}

```


## bankData.js

- 우리, 신한, 국민, 하나, 농협, 기업은행 등 6대 시중은행의 실계좌 및 가상계좌 규칙을 선언적 데이터로 관리
- 각 규칙은 계좌의 전체 길이, 과목코드의 시작점(`subStart`), 길이(`subLen`), 그리고 유효한 과목 코드 목록(`subjects`)을 포함
- bankData.js 내의 규칙 배열을 추가하는 것만으로 새로운 은행이나 특수 계좌 체계를 즉시 추가할 수 있는 플러그인 구조

```javascript
// 국민은행 데이터 예시
{
  name: "국민은행",
  rules: [
    { length: 12, subStart: 4, subLen: 2, subjects: ["01", "05", "04", "21"] }, // 표준 체계
    { length: 12, subStart: 3, subLen: 2, subjects: ["06", "18"] },             // 구 주택 체계
    { length: 14, subStart: 4, subLen: 2, subjects: ["92", "90"] },             // 가상계좌 체계
  ]
}
```

<br>

## 버전 관리

### v0.0.0: 초기 구현 단계

#### 중점 사항
- 키패드 입력 및 삭제 기능 구현
- 계좌번호(`account`) 업데이트 흐름 구성

### v0.0.1: 입력 로직 정리 및 추천 은행 UI 추가

#### 중점 사항
- 입력/삭제 핸들러의 책임을 account 상태 변경 중심으로 단순화
- 입력값을 기반으로 추천 은행을 표시하는 UI(`BankButtonList`) 연동

### v0.0.2: 삭제 동작 개선 및 은행 매칭 로직 분리

#### 중점 사항
- 계좌번호 변경 시 은행 매칭을 `useEffect`에서 처리하도록 분리
- 삭제 시 선택된 은행명(`selectedBank`)을 초기화하여 UI 일관성 강화

<br>

## 개선할 요소 

**테스트**
- 단위 테스트 수행

**Atomic Design 패턴 도입**
- **현황**
  - `BankButtonList.jsx` 내부에서 리스트 순회(`map`)와 개별 버튼 UI 렌더링을 동시에 처리하여 결합도가 높음
- **개선**
  - **Atom 분리**: 개별 버튼의 UI만 담당하는 `BankItem.jsx` 컴포넌트 생성
  - **역할 분리**: `BankButtonList.jsx`는 아이템의 배치(Layout)와 데이터 전달 역할에만 집중
- **기대 효과**
  - 컴포넌트 단위를 세분화하여 다른 기능(예: 즐겨찾기, 최근 송금 계좌)에서의 재사용성 확보


