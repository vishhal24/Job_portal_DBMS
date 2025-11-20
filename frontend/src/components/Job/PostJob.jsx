import React, { useState, useEffect } from "react";
import { postJob } from "../../services/api";
import "../styles/PostJob.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postJob(formData);
      if (response.data.success) {
        setMessage("✅ Job posted successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          salary: "",
          skills: "",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error posting job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-wrapper">
      <div className="post-job-card">
        <h2 className="title">Post a New Job</h2>

        {message && <div className="alert">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Full Stack Developer"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write a short description about the role..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Bangalore, India"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group half">
              <label>Salary (₹ per year)</label>
              <input
                type="number"
                name="salary"
                placeholder="e.g. 800000"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Skills Required</label>
            <input
              type="text"
              name="skills"
              placeholder="e.g. React, Node.js, MySQL"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
