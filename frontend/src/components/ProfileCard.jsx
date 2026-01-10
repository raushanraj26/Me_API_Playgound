import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProfileCard() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    education: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // READ profile
  useEffect(() => {
    fetch(`${BACKEND_URL}/profile`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // CREATE / UPDATE profile
  const handleSubmit = () => {
    const method = profile._id ? "PUT" : "POST";

    fetch(`${BACKEND_URL}/profile`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile || data);
        setMessage("Profile saved successfully");
      })
      .catch(() => setMessage("Error saving profile"));
  };

  if (loading) {
    return (
      <div className="card">
        <h2>Profile</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Profile</h2>

      <input
        placeholder="Name"
        value={profile.name}
        onChange={(e) =>
          setProfile({ ...profile, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={profile.email}
        onChange={(e) =>
          setProfile({ ...profile, email: e.target.value })
        }
      />

      <input
        placeholder="Education"
        value={profile.education || ""}
        onChange={(e) =>
          setProfile({ ...profile, education: e.target.value })
        }
      />

      <button onClick={handleSubmit}>
        Save Profile
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ProfileCard;
