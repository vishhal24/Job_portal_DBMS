import main from '../utils/db.js';

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.id;

    if (!jobId) {
      return res.status(400).json({
        message: 'Job ID is required',
        success: false,
      });
    }

    const connection = await main();

    // Check if already applied
    const [existingApplication] = await connection.execute(
      'SELECT * FROM applications WHERE job_id = ? AND user_id = ?',
      [jobId, userId]
    );

    if (existingApplication.length > 0) {
      return res.status(409).json({
        message: 'Already applied for this job',
        success: false,
      });
    }

    await connection.execute(
      'INSERT INTO applications (job_id, user_id, status) VALUES (?, ?, ?)',
      [jobId, userId, 'pending']
    );

    return res.status(201).json({
      message: 'Job application submitted successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      error: error.message,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const connection = await main();
    const [jobs] = await connection.execute(
      `
      SELECT DISTINCT
        c.company_id,
        c.name AS company_name,
        j.job_id,
        j.title AS job_title,
        a.status,
        a.applied_at
      FROM
        applications a
        JOIN jobs j ON a.job_id = j.job_id
        JOIN company c ON j.company_id = c.company_id
      WHERE a.user_id = ?
      `, [userId]
    );

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No applied jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applied jobs fetched successfully",
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const connection = await main();
    const [jobs] = await connection.execute(
      `
      SELECT u.user_id, u.fullname, u.email, a.applied_at, a.status
      FROM applications a
      JOIN users u ON a.user_id = u.user_id
      WHERE a.job_id = ?
      `,
      [jobId]
    );
    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No applicants found",
        success: false
      });
    }
    return res.status(200).json({
      message: "Applicants fetched successfully",
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: 'Status is required',
        success: false,
      });
    }

    const connection = await main();

    await connection.execute('UPDATE applications SET status = ? WHERE application_id = ?', [
      status,
      applicationId,
    ]);

    return res.status(200).json({
      message: 'Application status updated successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      error: error.message,
    });
  }
};