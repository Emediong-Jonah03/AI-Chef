import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './components/form.jsx'
import Header from './components/header.jsx'
import ThemeProvider, { useTheme } from './components/ThemeProvider.jsx'
import './index.css'

function App() {
  const { darkMode } = useTheme();
  
  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: darkMode ? '#1a202c' : 'white', 
      color: darkMode ? 'white' : 'black', 
      transition: 'background-color 0.3s, color 0.3s' 
    }}>
      <Header />
      <Form />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)