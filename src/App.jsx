import React from 'react';
import BankFinder from './components/BankFinder';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>우리 FISA 은행 찾기</h1>
        <p>계좌번호를 입력하면 자동으로 은행을 찾아드려요!</p>
      </header>

      <main>
        {/* 메인 컴포넌트 호출 */}
        <BankFinder />
      </main>

      <footer>
        <p>© 2026 Woorifisa Team Project</p>
      </footer>
    </div>
  );
}

export default App;