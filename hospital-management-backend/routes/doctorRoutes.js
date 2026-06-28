const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
router.use(auth);
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;