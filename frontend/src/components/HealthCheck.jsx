import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function HealthCheck() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const checkHealth = () => {
    setLoading(true);
    setStatus("");

    fetch(`${BACKEND_URL}/health`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Server not healthy");
      })
      .then((data) => {
        setStatus(`✅ Backend is healthy (${data.status})`);
        setLoading(false);
      })
      .catch(() => {
        setStatus("❌ Backend health check failed");
        setLoading(false);
      });
  };

  return (
    <div className="card">
      <h2>Health Check</h2>

      <button onClick={checkHealth}>
        Check Backend Health
      </button>

      {loading && <p>Checking...</p>}
      {status && <p>{status}</p>}
    </div>
  );
}

export default HealthCheck;
