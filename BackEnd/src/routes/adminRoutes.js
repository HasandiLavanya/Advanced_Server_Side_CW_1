const express = require("express");
const {
    getUsers,
    revokeApiKey,
    getUnusedApiKeys,
    getApiKeyOwners
} = require("../controllers/adminController");

const { authMiddleware } = require("../middleware/authMiddleware");
const   adminMiddleware = require("../middleware/adminMiddleware");
const { logAdminAction } = require("../Utils/logger");

const router = express.Router();