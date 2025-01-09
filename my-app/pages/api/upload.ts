import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import path from 'path';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false, // Désactive le bodyParser pour gérer les fichiers via formidable
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { files } = await parseForm(req);

            // Vérifie si le fichier a été correctement uploadé
            const file = Array.isArray(files.icon) ? files.icon[0] : files.icon;

            if (!file) {
                return res.status(400).json({ error: "Aucun fichier n'a été uploadé." });
            }

            // Construire l'URL publique pour le fichier
            const publicUrl = `/uploads/${path.basename(file.filepath)}`;
            console.log('Fichier uploadé avec succès :', publicUrl);

            res.status(200).json({
                message: 'Fichier uploadé avec succès !',
                url: publicUrl,
            });
        } catch (err) {
            console.error('Erreur lors de l\'upload :', err);
            res.status(500).json({ error: 'Erreur lors de l\'upload.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}

/**
 * Utilitaire pour parser la requête avec formidable
 */
function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Assure-toi que le dossier existe
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
        uploadDir, // Chemin absolu pour enregistrer les fichiers
        keepExtensions: true, // Conserver l'extension des fichiers
        maxFileSize: 5 * 1024 * 1024, // Taille max du fichier (5MB ici)
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({ fields, files });
        });
    });
}