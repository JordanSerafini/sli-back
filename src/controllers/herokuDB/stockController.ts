import client  from '../../database/client-pool/herokuBDD';
import { v4 as uuidv4 } from 'uuid';


const stockController = {
  
    async getAllStockDocs(req: any, res: any) {
        try {
    
            const query = "SELECT * FROM \"StockDocument\";";
            const tables = await client.query(query);
  
          res.send(tables);
  
        } catch (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la récupération des données.");
        }
    },

    async getAllDocumentLines(req: any, res: any) {
      try {
          const query = "SELECT * FROM \"StockDocumentLine\";";
          const tables = await client.query(query);
  
        res.send(tables.rows);
  
      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
      }
  },

  async getStockDocDetailsById(req: any, res: any) {
    const { id } = req.params; 
    //console.log(id);
    
    try {
        const query = "SELECT * FROM \"StockDocumentLine\" WHERE documentid = $1 ;";
        const result = await client.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send("Aucun élément trouvé avec cet ID.");
        }
        //console.log(result.rows.length);
        res.send(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
    }
},

async getAllDepot (req: any, res: any) {
  try {
      const query = "SELECT * FROM \"Storehouse\";";
      const tables = await client.query(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async addStockDoc(req: any, res: any) {
  const { storehouseid, documenttype, notesclear, reference, devisLine } = req.body;
  const date = new Date();

  let documentCode = "";
  switch (documenttype) {
    case "bon_sortie":
      documentCode = "BS";
      break;
    case "bon_livraison":
      documentCode = "BL";
      break;
    case "bon_commande":
      documentCode = "BC";
      break;
    case "bon_reception":
      documentCode = "BR";
      break;
    case "bon_transfert":
      documentCode = "BT";
      break;
    case "bon_retour":
      documentCode = "BRT";
      break;
    case "bon_entree":
      documentCode = "BE";
      break;
    default:
      documentCode = "Unknown";
  }

  const randomId: string = uuidv4();

  const query = "INSERT INTO \"StockDocument\" (id, storehouseid, documentdate, reference, numberprefix, notesclear) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";

  try {
    const result = await client.query(query, [randomId, storehouseid, date, reference, documentCode, notesclear]);
    console.log("Stock Document added successfully, ");

    // --------------------------------------------------------- Insérer les devislines ---------------------------------------------------------
    await Promise.all(devisLine.map(async (line: any) => {
      const { id, caption, quantity } = line;
      const query2 = "INSERT INTO \"StockDocumentLine\" (documentid, descriptionclear, itemid, quantity) VALUES ($1, $2, $3, $4) RETURNING *;";
      const result2 = await client.query(query2, [result.rows[0].id, caption, id, quantity]);
      console.log("Stock Document Line added successfully, ", result2.rows[0]);

      // --------------------------------------------------------- Mise à jour de la table Item pour le stock ---------------------------------------------------------
      if (documentCode === "BE" || documentCode === "BR" ) {
      const updateQuery = "UPDATE \"Item\" SET realstock = realstock + $1 WHERE id = $2";
      await client.query(updateQuery, [quantity, id]);
      console.log("Item updated successfully");
      } else if (documentCode === "BS" || documentCode === "BL" || documentCode === "BC" || documentCode === "BT" || documentCode === "BRT") {
        const updateQuery = "UPDATE \"Item\" SET realstock = realstock - $1 WHERE id = $2";
        await client.query(updateQuery, [quantity, id]);
        console.log("Item updated successfully");
      }

    }));
    res.send("Stock Document added successfully");
  } catch (error: any) {
    console.error("Error adding Stock Document: ", error.message);
    res.status(500).send("Internal Server Error");
  }
},

async getStockDocAndLines(req: any, res: any){ // ? GET
  try {
    const query = `SELECT sd.*, sdl.*
      FROM "StockDocument" sd
      LEFT JOIN "StockDocumentLine" sdl ON sd.id = sdl.documentid`;
    
    const tables = await client.query(query);

    res.send(tables.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getStockDocWithLines(req: any, res: any) { // ? POST
  try {
    const stockDocId = req.body.stockDocId; 

    console.log("ID du document de stock: ", stockDocId);

    const query = `
      SELECT sd.*, sdl.*
      FROM "StockDocument" sd
      LEFT JOIN "StockDocumentLine" sdl ON sd.id = sdl.documentid
      WHERE sd.id = $1`;

    const result = await client.query(query, [stockDocId]);

    if (result.rows.length > 0) {
      res.send(result.rows);
    } else {
      res.status(404).send("Aucun document de stock trouvé pour cet ID.");
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},








}
export default stockController

