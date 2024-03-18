import express from "express";

import itemController from "../controllers/herokuDB/itemController";
import AddressController from "../controllers/herokuDB/adressController";
import customerController from "../controllers/herokuDB/customerController";
import diversController from "../controllers/herokuDB/diversController";
import authController from "../controllers/auth/authController";
import stockController from "../controllers/herokuDB/stockController";

const router = express.Router();


// Route pour consulter tables, colonnes et détails des tables de la base de données Heroku Postgres:
router.get('/getTableDetails', diversController.getTableDetails);
router.get('/getColDetail', diversController.getColDetail);
router.get('/getAllTables', diversController.getAllTables);

// Route pour l'authentification:
router.post('/createUser', authController.createUser);
router.post('/updateUser', authController.updateUser);

router.post('/login', authController.loginUser);

  // Route pour les Items:
router.get('/getAllitem', itemController.getAllitem);
router.post('/addItem', itemController.addItem);
router.post('/updateItem', itemController.updateItem);

// Route pour les Adresses:
router.get('/getAllAdress', AddressController.getAllAddress);

// Route pour les Clients:
router.get('/getAllCustomer', customerController.getAllCustomer);

// Route pour les Stock:
router.get('/getAllStockDocs', stockController.getAllStockDocs);


  export default router