import express from "express";

import itemController from "../controllers/herokuDB/itemController";
import AddressController from "../controllers/herokuDB/adressController";

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello, World!');
  });


  // Route pour les Items:
router.get('/getAllitem', itemController.getAllitem);

// Route pour les Adresses:
router.get('/getAllAdress', AddressController.getAllAddress);

  export default router