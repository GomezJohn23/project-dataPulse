import './SearchForm.css'

type SearchFormProps = {
  query: string
  onQueryChange: (value: string) => void
  onSubmit: () => void
}

/**
 * Formulario de búsqueda controlado.
 */
function SearchForm({ query, onQueryChange, onSubmit }: SearchFormProps) {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <label className="search-form__label" htmlFor="search-query">
        Buscar
      </label>
      <input
        id="search-query"
        className="search-form__input"
        type="search"
        name="query"
        placeholder="Título o autor"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        autoComplete="off"
      />
      <button className="search-form__button" type="submit">
        Buscar
      </button>
    </form>
  )
}

export default SearchForm