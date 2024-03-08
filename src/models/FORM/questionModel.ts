import formModel from './formModel';

class QuestionModel extends formModel {
  constructor() {
    super();
  }

  static async insertQuestion(title: string, response: string, formulaire_id: number): Promise<void> {
    const sql = `
      INSERT INTO Questions (title, response, formulaire_id)
      VALUES ($1, $2, $3);
    `;
    const params = [title, response, formulaire_id];
    
    try {
      await this.run(sql, params);
      console.log('Question insérée avec succès:', { title, response, formulaire_id });
    } catch (error) {
      console.error('Erreur lors de l\'insertion de la question:', {title}, error);
      throw error;
    }
  }
}

export default QuestionModel;
