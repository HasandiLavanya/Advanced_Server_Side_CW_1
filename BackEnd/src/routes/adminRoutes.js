const express = require("express");
const {
    getUsers,
    revokeApiKey,
    getUnusedApiKeys,
    getApiKeyOwners
} = require("../controllers/adminController");