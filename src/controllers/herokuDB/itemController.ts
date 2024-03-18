import client  from '../../database/client-pool/herokuBDD';

const itemController = {
    async getAllitem(req: any, res: any) {
        try {
    
            const query = "SELECT * FROM \"Item\";";
            const tables = await client.query(query);
  
          res.send(tables);
  
        } catch (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la récupération des données.");
        }
    },

    async addItem(req: any, res: any) {
      try {
          const { nom, famille, fournisseur, prix, description, note } = req.body;
          const query = "INSERT INTO \"Item\" (Caption, FamilyId, SupplierId, SalePriceVatIncluded, DesComClear, NotesClear) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";
          const tables = await client.query(query, [nom, famille, fournisseur, prix, description, note]);
    
          res.send(tables);
    
      } catch (err) {
          console.log(err);
          res.status(500).send("Erreur lors de l'ajout des données.");
      }
  }

    
};

export default itemController
;
