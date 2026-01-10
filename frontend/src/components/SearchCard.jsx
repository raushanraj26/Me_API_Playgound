function SearchCard() {
  return (
    <div className="card">
      <h2>Search</h2>

      <input
        type="text"
        placeholder="Search skills or projects"
      />
      <button>Search</button>

      <p className="hint">Search results will appear here</p>
    </div>
  );
}

export default SearchCard;
