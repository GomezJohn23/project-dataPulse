import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Main from './components/Main/Main'

/**
 * App = componente raíz.
 * Por ahora ensambla el layout de la home.
 * Siguiente paso: rutas (/ y /about) con react-router-dom.
 */
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App
