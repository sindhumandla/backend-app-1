import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const SECRET = "mysecret"
const login = async (req, res) => {
  res.render("auth/login");
};
const validateUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, role: "admin" });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.user = user;
      res.redirect("/");
    } else {
      res.redirect("/auth/login");
    }
  } else {
    res.redirect("/auth/login");
  }
};
const register = async (req, res) => {
  res.render("auth/register");
};

const registerUser = async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  await userModel.create(body);
  res.redirect("/auth/login");
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // password = hashedPassword;
  const response = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  res.json(response);
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const userObj = {
        name:user.name,
        email:user.email,
        role:user.role,
      };
      const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });
      res.json({ ...userObj, token });
    } else {
      res.json({ error: "Invalid Password" });
    }
  } else {
    res.json({ error: "Invalid User" });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.locals.user = null;
  res.render("auth/login");
};

export { login, validateUser, register, registerUser, logout, signup, signin };
