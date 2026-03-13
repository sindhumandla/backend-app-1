import jwt from "jsonwebtoken";
const SECRET = "mysecret";
const authenticateAdmin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.render("auth/login");
  }
};
const authenticateUser = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.json({ error: "Invalid User" });
  }
};
export { authenticateAdmin, authenticateUser };