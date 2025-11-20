// src/components/MyApplications.jsx
import React, { useEffect, useState } from 'react';
import { getAppliedJobs } from '../services/api';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await getAppliedJobs();
        if (response.data.success) {
          setApplications(response.data.data);
        } else {
          setMessage(response.data.message || 'No applications found');
        }
      } catch (err) {
        setMessage('Error fetching applications');
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  return (
    <div className="applications-container">
      <h2>My Applications</h2>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {applications.length > 0 &&
        <ul>
          {applications.map(app => (
            <li key={app.job_id}>
              <strong>{app.job_title}</strong> at <em>{app.company_name}</em> | Status: {app.status} | Applied: {app.applied_at}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default MyApplications;
