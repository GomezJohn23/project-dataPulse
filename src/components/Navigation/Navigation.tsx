import { NavLink } from 'react-router-dom'
import './Navigation.css'

/**
 * Menú principal.
 * NavLink marca el enlace de la ruta activa.
 */
function Navigation() {
  return (
    <nav className="navigation" aria-label="Navegación principal">
      <ul className="navigation__list">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'navigation__link navigation__link_active' : 'navigation__link'
            }
            to="/"
            end
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'navigation__link navigation__link_active' : 'navigation__link'
            }
            to="/about"
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation