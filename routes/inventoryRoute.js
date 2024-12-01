const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createInventoryController, getInventoryController, getDonorController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require("../controllers/inventoryController");

const router = express.Router();

// Add inventory
router.post('/create-inventory',authMiddleware,createInventoryController);

// get inventory records
router.get('/get-inventory',authMiddleware,getInventoryController);

// get inventory records
router.get('/get-recent-inventory',authMiddleware,getRecentInventoryController);

// get hospital inventory records
router.post('/get-inventory-hospital',authMiddleware,getInventoryHospitalController);

// get donor records
router.get('/get-donors',authMiddleware,getDonorController);

// get hospital records
router.get('/get-hospitals',authMiddleware,getHospitalController);

// get organisation records
router.get('/get-organisations',authMiddleware,getOrganisationController);

// get organisation for hospital records
router.get('/get-organisations-for-hospital',authMiddleware,getOrganisationForHospitalController);

module.exports = router;