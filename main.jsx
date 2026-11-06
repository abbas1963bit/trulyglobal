import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LangContext } from './LangContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangContext.Provider value={{}}>
      <App />
    </LangContext.Provider>
  </React.StrictMode>
)
