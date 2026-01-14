import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 1. 필수 레이아웃 (항상 켜둠)
import './layout.css' 

// 2. 테마 (시연할 때 주석 처리/해제 하며 테스트)
import './theme.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
