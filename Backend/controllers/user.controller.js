import main from "../utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const connection = await main();

    // check if user exists
    const [existingUser] = await connection.execute(
      "SELECT * FROM users WHERE email = ? OR phoneNumber = ?",
      [email, phoneNumber]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email or phone number already exists",
        success: false,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await connection.execute(
      `INSERT INTO users (fullname, email, phoneNumber, password, role)
       VALUES (?, ?, ?, ?, ?)`,
      [fullname, email, phoneNumber, hashedPassword, role]
    );

    res.status(200).json({
      message: `Account created successfully for ${fullname}`,
      success: true,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const login = async(req,res) =>{
    try{
         const { email, password, role} = req.body;

    if ( !email || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    const connection = await main();
    const [users] = await connection.execute(
        "select * from users where email = ?",
        [email]
    );
    if(users.length == 0){
        return res.status(404).json({
            message:"user not found",
            success:false,
        });
    }
    let user = users[0];

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({
            message:"Incorrect password",
            success:false,
        });
    }
    //Check role
    if(user.role !== role){
      return res.status(403).json({
        message:"You dont have the necessary role to access this resource",
        success:false,
      });
    }
    //generate token 
    const tokenData = {
      userId : user.user_id,
    }
    const token = await jwt.sign(tokenData,process.env.JWT_SECRET,{
      expiresIn : '1d',
    });
    user = {
      user_id : user.user_id,
      fullname : user.fullname,
      email : user.email,
      phoneNumber : user.phoneNumber,
      role : user.role,
      bio : user.bio,
      skill : user.skill,
      resume : user.resume,
      resumeOriginal : user.resumeOriginal,
    }
   return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly : true,sameSite:strict}).json({
        message:`Welcome back, ${user.fullname}`,
        user,
        success:true,
    });
    }catch(error){
        console.error("Error in login:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
    }
};

export const Logout = async(req,res) =>{
    try{
        return res.status(200).clearCookie("token",{
            httpOnly:true,
            sameSite:'strict',
        }).json({
            message:"Logged out successfully",
            success:true,
        });
    }catch(error){
        console.error("Error in logout:", error);
        res.status(500).json({
        message: "Server error",
        success: false,
    });
    } 
};

export const updateProfile = async(req,res) =>{
    try{
        const { fullname,email,phoneNumber,bio,skills} = req.body;
        const file = req.file;
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      }); 
      //cloudinary upload logic here

      const connection = await main();
      const userId = req.user.user_id; // Middleware should set req.user
      let [users] = await connection.execute(
        "SELECT * FROM users WHERE user_id = ?",
        [user_id]
      );

      if (users.length === 0) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
      let user = users[0];
      user.fullname = fullname;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.bio = bio;
      user.skill = skills // Convert array to comma-separated string
      connection.execute(
        `update users set fullname = ?, email = ?,phoneNumber = ?, bio = ?, skill = ? where user_id = ?`,
        [user.fullname, user.email, user.phoneNumber, user.bio, user.skill, userId]
      );

       user = {
      user_id : user.user_id,
      fullname : user.fullname,
      email : user.email,
      phoneNumber : user.phoneNumber,
      role : user.role,
      bio : user.bio,
      skill : user.skill,
      resume : user.resume,
      resumeOriginal : user.resumeOriginal,
    }

      return res.status(200).json({
        message:"Profile updated successfully",
        user,
        success:true,
      });

    }
    }catch(error){
        console.error("Error in updateProfile:", error);
        res.status(500).json({
        message: "Server error",
        success: false,
    });
  }
  };