import formModel from './formModel';

class FormulaireModel extends formModel {
  constructor() {
    super();
  }

  static async insertFormulaire(nom_formulaire: string, nom_client: string, commercial_id: number): Promise<any> {
    const sql = `
      INSERT INTO Formulaires (nom_formulaire, nom_client, commercial_id)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const params = [nom_formulaire, nom_client, commercial_id];
    const result = await this.get(sql, params);
    return result;
  }
}

export default FormulaireModel;
