const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


const Signup = async (req, res) => {
  console.log(req.body);

  const { name, email, password, role } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const response = await authModel.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    res.status(200).json({ message: "Signup successfully" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "email or password is empty" });
    }

    const existingUser = await authModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ message: "User Not found" });
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password);

    // if (!checkPassword) {
    //   return res.status(400).json({ message: "Wrong password" });
    // }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      "123456",
      { expiresIn: "15m" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: "lax",
    });

    res.status(200).json({
      message: `User Successfully Logged In`,
      token: token,
      User: {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {

    return res.status(500).json({message:`Something is wrong ${error}`})
    
  }



  
};

const ShowUserData = async (req, res) => {
  const response = await authModel.find();

  res.send(response);
};


const ShowUserDataById=async(req,res)=>{

  const {id} = req.params;

   const response = await authModel.findById(id);

   res.send(response);

}


module.exports = {
  Signup,
  Login,
  ShowUserData,
  ShowUserDataById,
};
