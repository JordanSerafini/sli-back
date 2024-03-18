import client  from '../../database/client-pool/herokuBDD';


const diversController = {

async getTableDetails(req: any, res: any) {
    try {
        const query = `SELECT column_name, data_type, character_maximum_length, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'Item'`;
        const tables = await client.query(query);
        res.send(tables);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
    }
},

async getColDetail(req: any, res: any) {
  try {
    const query = `SELECT realstock FROM \"Item\"`;
    const tables = await client.query(query);
    res.send(tables);
} catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
}
},

async getAllTables(req: any, res: any) {
    try {
        const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
        const tables = await client.query(query);
        res.send(tables);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
    }
},

};

export default diversController