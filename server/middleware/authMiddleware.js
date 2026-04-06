// const token = req.cookies.token;


const jwt = require("jsonwebtoken")
const authMiddleware=(req,res)=>{
  console.log("Cookies:", req.cookies); // 👈 ADD THIS

  const token = req.cookies.token;

  const cookieParser = require("cookie-parser"); // ✅ ADD THIS

  const decoded = jwt.verify(token, "123456");

  req.user = decoded;
}

module.exports = authMiddleware