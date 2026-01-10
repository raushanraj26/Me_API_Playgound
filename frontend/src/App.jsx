import ProfileCard from "./components/ProfileCard";
import SkillsCard from "./components/SkillsCard";
import ProjectsCard from "./components/ProjectsCard";
import SearchCard from "./components/SearchCard";
import HealthCheck from "./components/HealthCheck";

import "./index.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">Profile Dashboard</h1>
<HealthCheck />

      <ProfileCard />
      <SkillsCard />
      <ProjectsCard />
      <SearchCard />
    </div>
  );
}

export default App;
