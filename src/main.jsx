import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Home from './home.jsx'
import ProblemSelector from './ProblemSelector.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProblemSelector />
  </StrictMode>,
)
