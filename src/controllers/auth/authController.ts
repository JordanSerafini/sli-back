import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import client from '../../database/client-pool/herokuBDD';
import * as jwt from 'jsonwebtoken';

const authController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            // Vérifier si un utilisateur avec cet email existe déjà
            const userExists = await client.query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
            
            if (userExists.rows.length > 0) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }

            // Hacher le mot de passe avec bcrypt
            const hashedPassword = await bcrypt.hash(password, 10); // Génère un salt avec une force de 10 rounds

            // Insérer l'utilisateur dans la base de données avec le mot de passe haché
            const result = await client.query('INSERT INTO utilisateurs (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
            
            res.status(201).json({ message: 'Utilisateur créé avec succès', newUser: result.rows[0] });
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const { id, ...newUserData } = req.body;
            const colonnesMisesAJour = Object.keys(newUserData).filter(key => newUserData[key] !== null && newUserData[key] !== undefined);
    
            if (colonnesMisesAJour.length === 0) {
                return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
            }
    
            const valeursMisesAJour = colonnesMisesAJour.map((key, index) => `${key} = $${index + 1}`).join(', ');
            const valeursMises = colonnesMisesAJour.map(key => newUserData[key]);
    
            valeursMises.push(id);
    
            const requeteMiseAJour = `UPDATE utilisateurs SET ${valeursMisesAJour} WHERE id = $${valeursMises.length} RETURNING *`;
    
            const result = await client.query(requeteMiseAJour, valeursMises);
    
            res.status(200).json({ message: 'Utilisateur mis à jour avec succès', updatedUser: result.rows[0] });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
        }
    },
    
    loginUser: async (req: Request, res: Response) => {
        const { email, password } = req.body;
    
        try {
            const user = await client.query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
    
            if (user.rows.length === 0) {
                return res.status(401).json({ message: 'Identifiants incorrects.' });
            }
    
            const userData = user.rows[0];
    
            const passwordMatch = await bcrypt.compare(password, userData.password);
    
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Identifiants incorrects.' });
            }
    
            if (!process.env.JWT_SECRET) {
                throw new Error('Secret JWT non défini.');
            }
    
            const token = jwt.sign({ email: userData.email, id: userData.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
            res.status(200).json({ message: 'Connexion réussie', token, userData });
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            res.status(500).json({ error: 'Erreur lors de la connexion' });
        }
    },

    logoutUser: async (req: Request, res: Response) => {
        const { email } = req.body;
        
    }
    

};

export default authController;
