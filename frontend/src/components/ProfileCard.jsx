import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProfileCard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/profile`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
  }, []);

  if (!profile) {
    return (
      <div className="card">
        <h2>Profile</h2>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Profile</h2>

      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Education:</strong> {profile.education}</p>

      <div className="links">
        {profile.links?.github && (
          <a href={profile.links.github} target="_blank">GitHub</a>
        )}
        {profile.links?.linkedin && (
          <a href={profile.links.linkedin} target="_blank">LinkedIn</a>
        )}
        {profile.links?.portfolio && (
          <a href={profile.links.portfolio} target="_blank">Portfolio</a>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
