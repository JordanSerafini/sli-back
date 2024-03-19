import client  from '../../database/client-pool/herokuBDD';

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
  
        res.send(tables);
  
      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
      }
  },

  async getStockDocDetailsById(req: any, res: any) {
    const { id } = req.params; 
    console.log(id);
    
    try {
        const query = "SELECT * FROM \"StockDocumentLine\" WHERE documentid = $1 ;";
        const result = await client.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send("Aucun élément trouvé avec cet ID.");
        }
        console.log(result.rows.length);
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



  
    
};

export default stockController
;
