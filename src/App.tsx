import { Route, Routes } from 'react-router-dom'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Main from './components/Main/Main'

/**
 * App = layout + mapa de rutas.
 * Header y Footer son fijos; Routes decide qué va en el medio.
 */
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App