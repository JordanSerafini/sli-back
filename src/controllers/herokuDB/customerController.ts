import client  from '../../database/client-pool/herokuBDD';

const customerController
 = {
    async getAllCustomer(req: any, res: any) {
        try {
    
            const query = "SELECT * FROM \"Customer\" ORDER BY name ASC;";
            const tables = await client.query(query);
  
          res.send(tables);
  
        } catch (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la récupération des données.");
        }
    },

    async insertCoordinate(req: any, res: any) {

      try {
        const { id, lon, lat } = req.body;
        
        const query = `UPDATE "Customer" SET lon = $1, lat = $2 WHERE id = $3;`;
        const values = [lon, lat, id];
        await client.query(query, values);
        res.send("Coordonnées insérées avec succès");
      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'insertion des coordonnées.");
      }
    }
    
};

export default customerController;
