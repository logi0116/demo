import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { ToastProvider } from "./contexts/ToastContext"
import HomePage from "./pages/HomePage"
import "./index.css"

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
