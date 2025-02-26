import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Threads from './components/Threads.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Threads
    amplitude={0.1}
    distance={0.1}
    enableMouseInteraction={true}
  />
</div>
  </StrictMode>,
)
