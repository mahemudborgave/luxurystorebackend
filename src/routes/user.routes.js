import express from 'express';
const router = express.Router();

import {
  addNewPost,
  getPost,
  searchData
} from "../controllers/user.controller.js"

// non secure routes (no login required)
router.route("/add-data").post(addNewPost);
router.route("/get-data").get(getPost);

// Route to handle search data with user queries
router.route("/search-data").get(searchData)


export default router;