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
            const { id, lat, long } = req.body;
            const query = `UPDATE "Customer" SET lat = ${lat}, long = ${long} WHERE id = ${id};`;
            await client.query(query);
            res.send("Coordonnées insérées avec succès");
        } catch (err) {
            console.log(err);
            res.status(500).send("Erreur lors de l'insertion des coordonnées.");
        }
    }

    
};

export default customerController
;
