import Routes from './components/Routes'
import { ThemeProvider } from './context/ThemeContext'


function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>  
  )
}

export default App
