# woorifisa-bank-finder

<br>

### "계좌번호만 입력하세요, 은행은 저희가 찾을게요."

- 번거롭게 목록에서 은행을 찾을 필요 없이, 계좌번호 입력 즉시 가장 적합한 은행을 제안하여 송금 및 등록 프로세스를 단축합니다.

<br>



<table align="center">
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/821ad113-3ada-44e7-aad4-9b4afab21eb5"
           height="600" alt="입력 전">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/2650eec8-bbda-4ebb-b247-1d6e5293ec35"
           height="600" alt="추천">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/a64f80e5-9355-4ff7-a6b0-80f0cead78c5"
           height="600" alt="선택 완료">
    </td>
  </tr>
   <tr align="center">
    <td>계좌 입력</td>
    <td>은행 추천</td>
    <td>은행 선택</td>
   </tr>
</table>

<br>

### 설치 방법

```bash
npm install korean-bank-finder
```

<br>

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

### 핵심 기능
- **계좌번호 입력 플로우 제공**

- **입력 제한/정리**: 계좌번호는 최대 14자리까지만 입력/표시되도록 제한

- **자동 은행 매칭**: 매칭된 은행 목록 자동 갱신

- **은행 선택 UI**: 매칭된 은행을 버튼 리스트로 보여주고, 클릭 시 선택 은행을 하이라이트

- **선택 은행 표시**: 선택된 은행명/아이콘이 라벨 영역에 표시

- **삭제/초기화 규칙**:
  - 한 글자 삭제(⌫) 시 계좌번호를 줄이고 선택 은행도 초기화
  - “전체 삭제” 시 계좌번호 + 선택 은행을 모두 초기화

<br>

### Detection Logic

금융결제원(KFTC) 표준안을 기반으로 한 Score-based Index Matching 알고리즘을 통해 계좌번호의 소속 은행을 판별

#### detectorClass.js

점수 기반 가중치 시스템 (Scoring System)
- 인덱스 매칭
  -  각 은행별로 상이한 과목코드 위치(subStart)와 길이(subLen)를 전수 조사하여 데이터화
- 자리수 일치
   - 입력된 번호의 길이가 은행별 계좌 체계와 일치할 경우 기본 점수(0.5pt) 부여
- 과목코드 일치
  - 특정 위치의 숫자가 해당 은행의 유효 과목코드일 경우, 코드 길이에 비례한 가중치(2자리: 10pt, 3자리: 15pt) 부여

<br>

#### bankData.js

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

### 버전 관리

#### v0.0.0: 초기 구현 단계

- 키패드 입력 및 삭제 기능 구현
- 계좌번호(`account`) 업데이트 흐름 구성

#### v0.0.1: 입력 로직 정리 및 추천 은행 UI 추가

- 입력/삭제 핸들러의 책임을 account 상태 변경 중심으로 단순화
- 입력값을 기반으로 추천 은행을 표시하는 UI(`BankButtonList`) 연동

#### v0.0.2: 삭제 동작 개선 및 은행 매칭 로직 분리

- 계좌번호 변경 시 은행 매칭을 `useEffect`에서 처리하도록 분리
- 삭제 시 선택된 은행명(`selectedBank`)을 초기화하여 UI 일관성 강화
