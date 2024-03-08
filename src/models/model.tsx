import { pool } from '../database/client/pool';

class Model {
  constructor() {}

  protected static async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const { rows } = await pool.query(sql, params);
      return rows;
    } catch (err: unknown) { 
      if (err instanceof Error) {
        console.error('Erreur lors de l\'exécution de la requête SQL:', err.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de l\'exécution de la requête SQL');
      }
      throw err;
    }
  }

  protected static async get(sql: string, params: any[] = []): Promise<any> {
    try {
      const { rows } = await pool.query(sql, params);
      return rows[0];
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erreur lors de l\'exécution de la requête SQL:', err.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de l\'exécution de la requête SQL');
      }
      throw err;
    }
  }

  protected static async all(sql: string, params: any[] = []): Promise<any[]> {
    return this.query(sql, params);
  }

  protected static async run(sql: string, params: any[] = []): Promise<void> {
    try {
      await pool.query(sql, params);
      console.log(`Commande SQL exécutée avec succès`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Erreur lors de l'exécution de la commande SQL:", err.message);
      } else {
        console.error("Une erreur inconnue est survenue lors de l'exécution de la commande SQL");
      }
      throw err;
    }
  }
}

export default Model;
