import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import './Header.css'

/**
 * Encabezado global: marca + navegación.
 */
function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link className="header__logo" to="/">
          DataPulse
        </Link>
        <Navigation />
      </div>
    </header>
  )
}

export default Header