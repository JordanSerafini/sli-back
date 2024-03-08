import express from "express";

import test from "../controllers/herokuDB/test";

const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello, World!');
  });


router.get('/getAllitem', test.getAllitem);

  export default router