const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./src/config/database"); 
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001", 
    credentials: true               
  }));
app.use(cookieParser());