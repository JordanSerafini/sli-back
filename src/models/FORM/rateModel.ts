import formModel from './formModel';

class RateModel extends formModel {
  constructor() {
    super();
  }

  static async insertRate(title: string, note: number, formulaire_id: number): Promise<void> {
    const sql = `
      INSERT INTO Rate (title, note, formulaire_id)
      VALUES ($1, $2, $3);
    `;
    const params = [title, note, formulaire_id];
    try {
    await this.run(sql, params);
    console.log('Rate insérée avec succès:', { title, note, formulaire_id });
    } catch (error) {
    console.error('Erreur lors de l\'insertion de la rate:', {title}, error);
    throw error;
    }
  }
}

export default RateModel;
