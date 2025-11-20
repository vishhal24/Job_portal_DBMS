import React from "react";
import "../styles/global.css";
import "../styles/card.css";

const JobList = () => {
  const jobs = [
    {
      title: "Full Stack Developer",
      company: "TechNova Labs",
      location: "Remote",
      salary: "₹12–18 LPA",
      skills: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Data Engineer",
      company: "InnoData",
      location: "Bengaluru",
      salary: "₹15–22 LPA",
      skills: ["Python", "AWS", "SQL"],
    },
  ];

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        💼 Available Job Openings
      </h1>
      <div className="card-grid">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-company">{job.company}</p>
            <p className="job-location">{job.location}</p>
            <p className="job-salary">{job.salary}</p>
            <div>
              {job.skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
