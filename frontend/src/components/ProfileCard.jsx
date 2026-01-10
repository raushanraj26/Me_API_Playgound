function ProfileCard() {
  return (
    <div className="card">
      <h2>Profile</h2>
      <p><strong>Name:</strong> Raushan Raj</p>
      <p><strong>Email:</strong> raushan@gmail.com</p>
      <p><strong>Education:</strong> B.Tech in Computer Science</p>

      <div className="links">
        <a href="#">GitHub</a>
        <a href="#">LinkedIn</a>
        <a href="#">Portfolio</a>
      </div>
    </div>
  );
}

export default ProfileCard;
