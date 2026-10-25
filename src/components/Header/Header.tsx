import Navigation from '../Navigation/Navigation'
import './Header.css'

/**
 * Esqueleto: encabezado de todas las páginas.
 * Incluye la marca y la navegación.
 */
function Header() {
  return (
    <header className="header">
      <p className="header__logo">DataPulse</p>
      <Navigation />
    </header>
  )
}

export default Header
