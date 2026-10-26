import './About.css'

/**
 * Página /about: presentación del autor y del proyecto.
 */
function About() {
  return (
    <main className="about">
      <h1 className="about__title">Sobre el autor</h1>

      <section className="about__author" aria-labelledby="about-author-heading">
        <h2 id="about-author-heading" className="about__subtitle">
          John Gomez
        </h2>
        <p className="about__text">
          Ingeniero de sistemas y desarrollador web realizando proyectos con
          React y TypeScript gracias a TripleTen.
        </p>
        <ul className="about__links">
          <li>
            <a
              className="about__link"
              href="https://github.com/GomezJohn23"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="about__link"
              href="https://www.linkedin.com/in/john-jairo-gomez-munevar-9674bb314"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </section>

      <section className="about__project" aria-labelledby="about-project-heading">
        <h2 id="about-project-heading" className="about__subtitle">
          Sobre DataPulse
        </h2>
        <p className="about__text">
          DataPulse es una app que muestra el “pulso” de la actualidad tech
          usando la API pública de Hacker News: historias top, búsqueda local
          y navegación entre inicio y esta página.
        </p>
      </section>
    </main>
  )
}

export default About
