import './Footer.css'

/**
 * Pie de página global.
 */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">DataPulse</p>
        <p className="footer__text">
          © {year} · Datos de{' '}
          <a
            className="footer__link"
            href="https://github.com/HackerNews/API"
            target="_blank"
            rel="noreferrer"
          >
            Hacker News API
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer