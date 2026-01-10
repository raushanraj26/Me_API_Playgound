import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProjectsCard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card">
      <h2>Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((project, index) => (
          <div key={index} className="project">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectsCard;
