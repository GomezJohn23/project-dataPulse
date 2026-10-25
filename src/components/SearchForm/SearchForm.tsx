import './SearchForm.css'

/**
 * Esqueleto: formulario de búsqueda.
 * Más adelante: estado controlado + filtrado / petición.
 */
function SearchForm() {
  return (
    <form className="search-form" role="search">
      <label htmlFor="search-query">Buscar</label>
      <input
        id="search-query"
        type="search"
        name="query"
        placeholder="Buscar historias"
        required
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default SearchForm
