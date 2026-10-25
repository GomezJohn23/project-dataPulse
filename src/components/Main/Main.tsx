import SearchForm from '../SearchForm/SearchForm'
import StoryList from '../StoryList/StoryList'
import './Main.css'

/**
 * Esqueleto: contenido principal de la home (/).
 * Aquí vive la funcionalidad central de DataPulse.
 */
function Main() {
  return (
    <main className="main">
      <h1>DataPulse</h1>
      <SearchForm />
      <StoryList />
    </main>
  )
}

export default Main
