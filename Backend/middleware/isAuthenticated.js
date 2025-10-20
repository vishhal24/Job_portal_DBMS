import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Access Denied. No token provided",
        success: false,
      });
    }

    // jwt.verify is synchronous — no await
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in authenticateToken:", error.message);
    res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default authenticateToken;
