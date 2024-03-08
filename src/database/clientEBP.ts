
// ########################################################################## Ceci est le fichier client vers la DB local/pro EBP ######################################################

import { ConnectionPool, Request } from "mssql";

const config = {
  user: "sa",
  password: "@ebp78EBP",
  server: "localhost\\EBP",
  database: "Solution Logique_0895452f-b7c1-4c00-a316-c6a6d0ea4bf4",
    options: {
    trustServerCertificate: true,
  },
};

// Créer un pool de connexions
const pool = new ConnectionPool(config);

const client = {
  // Fonction pour se connecter à la base de données
  async connectDatabase() {
    try {
      if (!pool.connected) {
        await pool.connect();
      }
      console.log("Connexion à la base de données établie avec succès !");
    } catch (error) {
      console.error("Erreur lors de la connexion à la base de données :", error);
    }
  },
  

  // Fonction pour exécuter une requête SQL
  async executeQuery(query: string) {
    try {
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      console.error("Erreur lors de l'exécution de la requête :", error);
      throw error;
    }
  }
};

export default client;
