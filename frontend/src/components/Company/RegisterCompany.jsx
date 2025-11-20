import React, { useState, useContext } from 'react';
import { registerCompany } from '../../services/api';
import { AuthContext } from '../Auth/AuthContext';
import '../styles/Company.css';

const RegisterCompany = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerCompany(formData);
      if (response.data.success) {
        setMessage('Company registered successfully!');
        setFormData({ companyName: '', description: '' });
      }
    } catch (error) {
      setMessage('Error registering company');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-container">
      <h2>Register Company</h2>
      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Registering...' : 'Register Company'}
        </button>
      </form>
    </div>
  );
};

export default RegisterCompany;