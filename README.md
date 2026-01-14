# woorifisa-bank-finder

<br>

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

<br>

---

## BankButtonList.jsx

<br>

---

## CustomKeypad.jsx

<br>

---

## 개선할 요소 

<br>

**테스트**
- 단위 테스트 수행

**Atomic Design 패턴**
- 현재: `BankButtonList.jsx` 컴포넌트 속에서 `map`을 돌리면서 버튼 UI(`html`)를 직접 그림 <br>
	-> 버튼 하나만 그리는 컴포넌트를 만들고 `BankButtonList.jsx` 에서는 버튼 배치만 수행 <br>
	-> 컴포넌트를 잘게 쪼개서 재사용성 확장


