import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SkillsCard() {
  const [skills, setSkills] = useState([]);
  const [topN, setTopN] = useState("");

  // fetch all skills on load
  useEffect(() => {
    fetch(`${BACKEND_URL}/skills`)
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.log(err));
  }, []);

  const fetchTopSkills = () => {
    if (!topN) return;

    fetch(`${BACKEND_URL}/skills/top?n=${topN}`)
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="card">
      <h2>Skills</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Top N skills"
          value={topN}
          onChange={(e) => setTopN(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={fetchTopSkills}>Get Top Skills</button>
      </div>

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
