import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SearchCard() {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    setLoading(true);

    fetch(`${BACKEND_URL}/projects/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="card">
      <h2>Search Projects</h2>

      <input
        type="text"
        placeholder="Search projects by title or description"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {loading && <p>Searching...</p>}

      {!loading && projects.length === 0 && (
        <p>No projects found</p>
      )}

      {projects.map((project, index) => (
        <div key={index} className="project">
          <h4>{project.title}</h4>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchCard;
