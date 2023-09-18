import express from "express";
import userController from "../controller/userController.js";
import axios from "axios";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
// Route untuk mendapatkan data pekerjaan dengan paginasi dan pencarian
const API_URL = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";

// Route untuk mendapatkan data pekerjaan dengan paginasi
router.get("/api/job-list", verifyToken, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    const searchTerm = req.query.searchTerm || "";

    const response = await axios.get(API_URL);
    const jobList = response.data;
    const filteredJobList = jobList.filter((job) => {
      const jobTitle = job.title.toLowerCase();
      const jobLocation = job.location.toLowerCase();
      const search = searchTerm.toLowerCase();

      return jobTitle.includes(search) || jobLocation.includes(search);
    });

    // Hitung berapa item yang akan dilewati dan diambil
    const offset = (page - 1) * perPage;
    const paginatedJobList = filteredJobList.slice(offset, offset + perPage);

    res.json(paginatedJobList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/api/job-detail/:id", verifyToken, async (req, res) => {
  try {
    const jobID = req.params.id;
    const apiUrl = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${jobID}`;

    const response = await axios.get(apiUrl);
    const jobDetail = response.data;

    res.json(jobDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
