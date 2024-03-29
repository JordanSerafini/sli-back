import express from "express";

import itemController from "../controllers/herokuDB/itemController";
import AddressController from "../controllers/herokuDB/adressController";
import customerController from "../controllers/herokuDB/customerController";
import diversController from "../controllers/herokuDB/diversController";
import authController from "../controllers/auth/authController";
import stockController from "../controllers/herokuDB/stockController";
import synchroController from "../controllers/herokuDB/synchroController";
import coordinateController from "../controllers/herokuDB/coordinateController";

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
router.post('/updateItemStock', itemController.updateItemStock);

// Route pour les Adresses:
router.get('/getAllAdress', AddressController.getAllAddress);

// Route pour les Clients:
router.get('/getAllCustomer', customerController.getAllCustomer);
router.post('/insertCoordinate', customerController.insertCoordinate);

// Route pour les Stock:
router.get('/getAllStockDocs', stockController.getAllStockDocs);
router.get('/getStockDocDetails/:id', stockController.getStockDocDetailsById);
router.post('/addStockDoc', stockController.addStockDoc);

router.get('/getAllDocumentLines', stockController.getAllDocumentLines);

router.get('/StockAndLine', stockController.getStockDocAndLines);
router.post('/StockAndLine', stockController.getStockDocWithLines);
router.get('/getDocLineWithPrice', stockController.getDocLineWithPrice);

router.get('/getAllBE', stockController.getAllBE);
router.get('/getAllBS', stockController.getAllBS);

router.get('/getAllDepot', stockController.getAllDepot);


// Route pour la synchro:
router.get('/synchroStockResa', synchroController.synchroStockResa);
router.get('/coordinateService', coordinateController.getCoordinate);

  export default router