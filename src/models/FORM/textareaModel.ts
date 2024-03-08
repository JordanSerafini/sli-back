import formModel from './formModel';

class TextareaModel extends formModel {
  constructor() {
    super();
  }

  static async insertTextarea(title: string, response: string, formulaire_id: number): Promise<void> {
    const sql = `
      INSERT INTO Textarea (title, response, formulaire_id)
      VALUES ($1, $2, $3);
    `;
    const params = [title, response, formulaire_id];
    try {
    await this.run(sql, params);
    console.log('Textarea insérée avec succès:', { title, response, formulaire_id });
    } catch (error) {
    console.error('Erreur lors de l\'insertion de la textarea:', {title}, error);
    throw error;
    }
    
  }
}

export default TextareaModel;
