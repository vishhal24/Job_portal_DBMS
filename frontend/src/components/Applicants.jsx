import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const response = await api.get(`/applications/${jobId}/applicants`);
        if (response.data.success) {
          setApplicants(response.data.data);
        } else {
          setMessage(response.data.message || 'No applicants found');
        }
      } catch (err) {
        setMessage('Error loading applicants');
      } finally {
        setLoading(false);
      }
    }
    fetchApplicants();
  }, [jobId]);

  return (
    <div className="container" style={{
      maxWidth: "520px",
      margin: "36px auto",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 12px #0002",
      padding: "32px"
    }}>
      <h2 style={{ marginBottom: '24px', fontWeight: '700', color: '#232946' }}>Applicants for Job #{jobId}</h2>
      {loading && <p>Loading...</p>}
      {message && <div style={{ color: 'crimson', margin: '10px 0' }}>{message}</div>}
      {applicants.length > 0 && (
        <ul style={{ paddingLeft: 0 }}>
          {applicants.map(a => (
            <li key={a.user_id}
              style={{
                marginBottom: '15px',
                listStyle: 'none',
                background: '#f6f8fa',
                borderRadius: '9px',
                boxShadow: '0 1px 4px #0001',
                padding: '15px'
              }}>
              <strong style={{ fontSize: "1.09rem" }}>{a.fullname}</strong>
              {"  |  "}<span style={{ color: "#1a73e8", fontWeight: 500 }}>{a.email}</span>
              <br />
              <span style={{ fontSize: "0.99rem" }}>
                Applied: {new Date(a.applied_at).toLocaleString()}<br />
                Status: <span style={{ color: "#7c3aed", fontWeight: 600 }}>{a.status}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
      {(!loading && applicants.length === 0 && !message) && <p>No applicants found for this job.</p>}
    </div>
  );
};

export default Applicants;
