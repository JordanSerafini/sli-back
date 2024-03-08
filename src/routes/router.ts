import express from "express";

import itemController from "../controllers/herokuDB/itemController";
import AddressController from "../controllers/herokuDB/adressController";
import customerController from "../controllers/herokuDB/customerController";

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello, World!');
  });


  // Route pour les Items:
router.get('/getAllitem', itemController.getAllitem);

// Route pour les Adresses:
router.get('/getAllAdress', AddressController.getAllAddress);

// Route pour les Clients:
router.get('/getAllCustomer', customerController.getAllCustomer);

  export default router