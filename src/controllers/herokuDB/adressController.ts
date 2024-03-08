import client  from '../../database/client-pool/herokuBDD';

const AddressController = {
    async getAllAddress(req: any, res: any) {
        try {
            const query = "SELECT * FROM \"Address\";";
            const tables = await client.query(query);
  
          res.send(tables);
  
        } catch (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la récupération des données.");
        }
    },
};

export default AddressController
;
