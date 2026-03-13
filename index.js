import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { authenticateAdmin, authenticateUser } from "./middleware/auth.js";
import dbConnect from "./config/db.js";

import productRouter from "./routes/productRoute.js";
import storeRouter from "./routes/storeRoute.js";
import homeRouter from "./routes/homeRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();

/* Fix for ES module directory path */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Middlewares */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Static files (images, css, etc) */
app.use(express.static(path.join(__dirname, "public")));

/* View engine */
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layout");

/* Session */
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

/* Make user available in views */
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

/* Routes */
app.use("/auth", authRouter);
app.use("/store", storeRouter);
app.use("/orders", authenticateUser, orderRouter);
app.use("/admin", authenticateAdmin, homeRouter);
app.use("/products", authenticateAdmin, productRouter);
app.use("/users", authenticateAdmin, userRouter);

/* Start server */
const startServer = async () => {
  await dbConnect();
  app.listen(5000, () => {
    console.log("Server Started");
  });
};

startServer();
