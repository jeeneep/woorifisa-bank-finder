# woorifisa-bank-finder


### 설치 방법

```bash
npm install korean-bank-finder
```

### 배포 정보
- **npm 패키지명**: `korean-bank-finder`
- **배포 링크**: [korean-bank-finder](https://www.npmjs.com/package/korean-bank-finder)


## 개요

### 주제 선정 이유

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
     └─ BankFinder.jsx (Container / Page)
         │  # 계좌번호 상태 관리, 은행 필터링 알고리즘 수행, 자식 컴포넌트 제어
         │
         ├─ AccountInput.jsx
         │   # 입력된 계좌번호를 표시
         │
         ├─ BankButtonList.jsx
         │   # 필터링된 추천 은행(최대 3개)을 보여주기
         │
         └─ CustomKeypad.jsx
             # 3x4 숫자 입력기
```

<br>

---

## 주요 UI 작업


```JS
// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 1. 필수 레이아웃
import './layout.css' 

// 2. 테마 (사용자에 맞게 커스텀 가능)
import './theme.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
<br>

### Headless 기반 UI

- 디자인과 기능을 분리하여 확장성 제공(CSS 커스터마이징)
	
- **Logic** (JS): 상태 관리, 유효성 검사, 데이터 매핑 담당.
- **Structure** (`layout.css`): 기능 동작에 필수적인 배치만 정의.
- **Skin** (`theme.css`): 색상, 폰트, 라운딩 등 커스텀 디자인 요소 분리.
	
-  단점
	- 러닝커브: 커스텀하기 위해 해당 프로젝트 내 CSS 가 적용되는 구조를 파악해야 함

<br>

---

## BankFinder.jsx

<br>

---

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

---

## BankButtonList.jsx

<br>

---

## CustomKeypad.jsx

<br>

---

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

---

## 개선할 요소 

<br>

**테스트**
- 단위 테스트 수행


**Atomic Design 패턴**
- 현재: `BankButtonList.jsx` 컴포넌트 속에서 `map`을 돌리면서 버튼 UI(`html`)를 직접 그림 <br>
	-> 버튼 하나만 그리는 컴포넌트를 만들고 `BankButtonList.jsx` 에서는 버튼 배치만 수행 <br>
	-> 컴포넌트를 잘게 쪼개서 재사용성 확장


