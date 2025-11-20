import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await api.get('/jobs/admin/get');
        if (response.data.success) {
          setJobs(response.data.data);
        } else {
          setMessage(response.data.message || 'No jobs found');
        }
      } catch (err) {
        setMessage('Error loading your jobs');
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="dashboard-container" style={{
      maxWidth: '600px', margin: '40px auto', background: '#fff', borderRadius: '14px', boxShadow: '0 2px 12px #0002', padding: '30px'
    }}>
      <h2 style={{ marginBottom: '22px', fontWeight: '700', color: '#232946' }}>Recruiter Dashboard</h2>
      {loading && <p>Loading...</p>}
      {message && <div style={{ color: 'crimson', margin: '12px 0' }}>{message}</div>}
      {jobs.length > 0 && (
        <ul style={{ paddingLeft: 0 }}>
          {jobs.map(job => (
            <li key={job.job_id} style={{
              marginBottom: '18px',
              listStyle: "none",
              background: "#f6f8fa",
              borderRadius: "10px",
              boxShadow: "0 1px 6px #0001",
              padding: "18px"
            }}>
              <strong style={{ fontSize: '1.13rem' }}>{job.title}</strong>
              {" — "}
              <span style={{ color: '#444' }}>{job.location}</span>
              <br />
              <span style={{ fontWeight: 500, color: "#0056d9" }}>Salary: ₹{job.salary}</span>
              <br />
              <Link
                to={`/recruiter/job/${job.job_id}/applicants`}
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#ffac41",
                  fontWeight: 600,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  fontSize: "1rem"
                }}
                className="btn-link"
              >
                View Applicants
              </Link>
            </li>
          ))}
        </ul>
      )}
      {(!loading && jobs.length === 0 && !message) && <p>No jobs found!</p>}
    </div>
  );
};

export default RecruiterDashboard;
