import * as jwt from 'jsonwebtoken';
import sgMail from "@sendgrid/mail";
import { Request, Response } from 'express';

import FormulaireModel from '../models/FORM/FormulaireModel';
import QuestionModel from '../models/FORM/questionModel';
import TextareaModel from '../models/FORM/textareaModel';
import RateModel from '../models/FORM/rateModel';

const SECRET_KEY = process.env.SECRET_KEY;


const formController = {
    createFormulaire: async (req: Request, res: Response) => {
       // console.log(req.body);
        try {
            const {  nom_client, commercial_id, data } = req.body;
            const nom_formulaire = `Formulaire de satisfaction de ${nom_client}`;

            if (!data || !Array.isArray(data) || data.length === 0) {
                throw new Error('Aucune donnée valide fournie');
            }

            const { questions, textareas, rates } = data[0];

            const nouveauFormulaire = await FormulaireModel.insertFormulaire(nom_formulaire, nom_client, commercial_id);

            // Insérer les questions de manière séquentielle
            for (const question of questions) {
                await QuestionModel.insertQuestion(question.title, question.response, nouveauFormulaire.id);
            }

            // Insérer les textareas de manière séquentielle
            for (const textarea of textareas) {
                await TextareaModel.insertTextarea(textarea.title, textarea.response, nouveauFormulaire.id);
            }

            // Insérer les rates de manière séquentielle
            for (const rate of rates) {
                await RateModel.insertRate(rate.title, rate.note, nouveauFormulaire.id);
            }

            res.status(201).json({ message: 'Formulaire créé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la création du formulaire :', error);
            res.status(500).json({ error: 'Erreur lors de la création du formulaire' });
        }
    },


  sendForm: async (req: any, res: any, next: any) => {
    try {
    const { email } = req.body;

    // Générer un token JWT avec une durée de validité de 7 jours
    const token = jwt.sign({ email }, process.env.SECRET_KEY!, { expiresIn: '7d' });

    console.log(token);

    // Construire le lien d'accès à la page de formulaire avec le token inclus
    const formLink = `${process.env.FORM_PAGE}/form-satisfaction?token=${token}`;
    //const formLink = `http://localhost:5173/form-satisfaction?token=${token}`;

    // Envoyer l'e-mail contenant le lien d'accès à la page de formulaire
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
      const msg = {
        to: email,
        from: "immoprosoclock@gmail.com",
        subject: "Formulaire de satisfaction",
        text: `Bonjour, voici le lien vers notre formulaire de satisfaction, valable 7 jours : ${formLink}`,
      };
      sgMail
        .send(msg)
        .then(() => {
            console.log("Email envoyé");
            res.status(200).json({ message: "Email envoyé avec succès" }); 
          
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail" }); 
        });
    } catch (error) {
      console.log(error);
      res.status(500).json("Erreur interne du serveur");
    }
  },

  validateTokenHeader: (req: Request, res: Response) => {
    console.log(req.headers);
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(400).json({ isValid: false, error: 'Token manquant ou mal formé dans le header Authorization' });
    }

    const token = authorizationHeader.split(' ')[1]; // Extraction du token du header
    
    // Vérifier si le token commence par 'Bearer '
    if (!/^Bearer /.test(authorizationHeader)) {
        return res.status(400).json({ isValid: false, error: 'Format du token invalide' });
    }


    if (!SECRET_KEY) {
        return res.status(500).json({ isValid: false, error: 'Clé secrète manquante' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ isValid: false, error: 'Token invalide ou expiré' });
        }
        return res.json({ isValid: true, data: decoded });
    });
},


};

export default formController;
