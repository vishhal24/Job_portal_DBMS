import main from '../utils/db.js';
import cloudinary from '../utils/cloudinary.js';

async function uploadToCloudinary(fileBuffer, fileName, folder) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        public_id: fileName,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
}

export const registerCompany = async (req, res) => {
  try {
    const { companyName, description } = req.body;
    const userId = req.id;

    if (!companyName || !description) {
      return res.status(400).json({
        message: 'Company name and description are required',
        success: false,
      });
    }

    const connection = await main();

    const [companies] = await connection.execute(
      'SELECT * FROM company WHERE name = ?',
      [companyName]
    );

    if (companies.length > 0) {
      return res.status(400).json({
        message: 'Company already registered',
        success: false,
      });
    }

    const [result] = await connection.execute(
      'INSERT INTO company (description, name, user_id) VALUES (?, ?, ?)',
      [description, companyName, userId]
    );

    return res.status(201).json({
      message: 'Company registered successfully',
      companyId: result.insertId,
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

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id;
    const connection = await main();

    const [companies] = await connection.execute(
      'SELECT * FROM company WHERE user_id = ?',
      [userId]
    );

    if (companies.length === 0) {
      return res.status(404).json({
        message: 'No companies found',
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const connection = await main();

    const [company] = await connection.execute(
      'SELECT * FROM company WHERE company_id = ?',
      [companyId]
    );

    if (company.length === 0) {
      return res.status(404).json({
        message: 'Company not found',
        success: false,
      });
    }

    return res.status(200).json({
      company: company[0],
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const companyId = req.params.id;

    const fields = [];
    const values = [];

    if (name) {
      fields.push('name = ?');
      values.push(name);
    }

    if (description) {
      fields.push('description = ?');
      values.push(description);
    }

    if (website) {
      fields.push('website = ?');
      values.push(website);
    }

    if (location) {
      fields.push('location = ?');
      values.push(location);
    }

    // Upload logo to cloudinary if provided
    if (file) {
      const logoUrl = await uploadToCloudinary(
        file.buffer,
        `logo-${companyId}-${Date.now()}`,
        'job-portal/logos'
      );
      fields.push('logo = ?');
      values.push(logoUrl);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        message: 'No fields provided to update',
        success: false,
      });
    }

    const connection = await main();
    const query = `UPDATE company SET ${fields.join(', ')} WHERE company_id = ?`;
    values.push(companyId);

    await connection.execute(query, values);

    return res.status(200).json({
      message: 'Company updated successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};