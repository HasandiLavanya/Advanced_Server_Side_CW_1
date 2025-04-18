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

// Routes
app.use("/auth", require("./src/routes/authRoutes"));
app.use("/countries", require("./src/routes/countryRoutes"));
app.use("/admin", require("./src/routes/adminRoutes"));


app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
