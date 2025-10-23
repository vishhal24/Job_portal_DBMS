import main from "../utils/db.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    const user_id = req.id; // from auth middleware

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    const connection = await main();

    // Check if company already exists
    const [companies] = await connection.execute(
      "SELECT * FROM company WHERE name = ?",
      [companyName]
    );

    if (companies.length > 0) {
      return res.status(400).json({
        message: "Company already registered",
        success: false,
      });
    }

    // Insert new company
    const [result] = await connection.execute(
      "INSERT INTO company (name, user_id) VALUES (?, ?)",
      [companyName, user_id]
    );

    return res.status(201).json({
      message: "Company registered successfully",
      companyId: result.insertId,
      success: true,
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

export const getAllCompanies = async(req,res)=>{
  try{
      const userId = req.id; //Logged in user id
      const connection = main();
      const [companies] = await connection.execute(
        'select * from company where user_id = ?',
        [userId]
      );
      if(companies.length === 0){
        return res.status(404).json({
          message : "No companies found",
          success : false
        });
      }
  }catch(error){
    console.log(error);
  }
};

// Get company by id;
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const connection = await main();
    const [company] = await connection.execute(
      "SELECT * FROM company WHERE company_id = ?",
      [companyId]
    );

    if (company.length === 0) {
      return res.status(404).json({
        message: "Company not found",
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
      message: "Server error",
      success: false,
    });
  }
};

// update company details

export const updateCompany = async (req,res)=>{
  try{

  }catch(error){
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};