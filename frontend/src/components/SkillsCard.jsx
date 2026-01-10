import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SkillsCard() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/skills`)
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card">
      <h2>Skills</h2>

      {skills.length === 0 ? (
        <p>No skills found</p>
      ) : (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SkillsCard;
