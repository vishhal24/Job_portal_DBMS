import React from "react";
import "../styles/global.css";
import "../styles/form.css";

const Profile = () => {
  const user = {
    name: "Vishal Singh",
    email: "vishal@example.com",
    appliedJobs: 5,
  };

  return (
    <div className="form-container" style={{ textAlign: "center" }}>
      <img
        src={`https://ui-avatars.com/api/?name=${user.name}&background=4f46e5&color=fff`}
        alt="avatar"
        style={{
          borderRadius: "50%",
          width: "90px",
          height: "90px",
          marginBottom: "1rem",
        }}
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
        Total Jobs Applied: <b>{user.appliedJobs}</b>
      </p>
      <button style={{ marginTop: "1.5rem" }}>Edit Profile</button>
    </div>
  );
};

export default Profile;
