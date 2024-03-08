import express from "express";

import test from "../controllers/herokuDB/test";

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello, World!');
  });


  // Route pour les Items:
router.get('/getAllitem', test.getAllitem);

// Route pour les Adresses:
router.get('/getAllAdress', test.getAllAdress);

  export default router