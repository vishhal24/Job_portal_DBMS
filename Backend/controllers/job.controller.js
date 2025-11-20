import main from '../utils/db.js';

export const postJob = async (req, res) => {
  try {
    const { title, description, location, salary, skills, company_id } = req.body;
    const userId = req.id;

    if (!title || !description || !location || !company_id || !skills || !salary) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    const connection = await main();

    await connection.execute(
      'INSERT INTO jobs (company_id, title, description, location, salary, created_by, skills) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [company_id, title, description, location, salary, userId, skills]
    );

    return res.status(201).json({
      message: 'Job posted successfully',
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

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const connection = await main();

    const [jobs] = await connection.execute(
      'SELECT * FROM jobs WHERE title LIKE ? OR description LIKE ?',
      [`%${keyword}%`, `%${keyword}%`]
    );

    if (jobs.length === 0) {
      return res.status(404).json({
        message: 'No jobs found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Jobs fetched successfully',
      success: true,
      data: jobs,
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

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const connection = await main();

    const [jobs] = await connection.execute('SELECT * FROM jobs WHERE job_id = ?', [jobId]);

    if (jobs.length === 0) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Job fetched successfully',
      success: true,
      data: jobs[0],
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

// Fetch jobs created by recruiter
export const getAdminJob = async (req,res)=>{
  try{
    const userId = req.id;
    const connection = await main();
    const [jobs] = await connection.execute(
      `SELECT * FROM jobs WHERE created_by = ?`, [userId]
    );
    if(jobs.length === 0){
      return res.status(404).json({
        message : "No jobs found",
        success : false
      });
    }
    return res.status(200).json({
      message : "Jobs fetched successfully",
      success : true,
      data : jobs
    });
  }catch(error){
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success : false,
      error: error.message,
    });
  }
};
