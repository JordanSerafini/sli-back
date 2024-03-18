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
  },

  async updateItem(req: any, res: any) {
    try {
        const { nom, famille, fournisseur, prix, description, note, stock } = req.body;

        let query = "UPDATE \"Item\" SET ";
        const values = [];
        let index = 1;

        // Vérifiez les champs que vous souhaitez mettre à jour et ajoutez-les à la requête SQL
        if (nom !== undefined) {
            query += "Caption=$" + index++ + ",";
            values.push(nom);
        }
        if (famille !== undefined) {
            query += "FamilyId=$" + index++ + ",";
            values.push(famille);
        }
        if (fournisseur !== undefined) {
            query += "SupplierId=$" + index++ + ",";
            values.push(fournisseur);
        }
        if (prix !== undefined) {
            query += "SalePriceVatIncluded=$" + index++ + ",";
            values.push(prix);
        }
        if (description !== undefined) {
            query += "DesComClear=$" + index++ + ",";
            values.push(description);
        }
        if (note !== undefined) {
            query += "NotesClear=$" + index++ + ",";
            values.push(note);
        }
        if (stock !== undefined) {
            query += "RealStock=$" + index++ + ",";
            values.push(stock);
        }

        // Supprimez la virgule supplémentaire à la fin de la chaîne de requête
        query = query.slice(0, -1);

        // Ajoutez la condition WHERE pour l'ID
        query += " WHERE Caption=$" + index + " RETURNING *;";
        values.push(nom);

        const tables = await client.query(query, values);
  
        res.send(tables);
  
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la mise à jour des données.");
    }
},


    
};

export default itemController
;
