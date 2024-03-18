import express from "express";

import itemController from "../controllers/herokuDB/itemController";
import AddressController from "../controllers/herokuDB/adressController";
import customerController from "../controllers/herokuDB/customerController";
import diversController from "../controllers/herokuDB/diversController";
import authController from "../controllers/auth/authController";

const router = express.Router();


// Route pour consulter tables, colonnes et détails des tables de la base de données Heroku Postgres:
router.get('/getTableDetails', diversController.getTableDetails);
router.get('/getColDetail', diversController.getColDetail);
router.get('/getAllTables', diversController.getAllTables);

// Route pour l'authentification:
router.post('/createUser', authController.createUser);
router.post('/login', authController.loginUser);

  // Route pour les Items:
router.get('/getAllitem', itemController.getAllitem);

// Route pour les Adresses:
router.get('/getAllAdress', AddressController.getAllAddress);

// Route pour les Clients:
router.get('/getAllCustomer', customerController.getAllCustomer);


  export default router