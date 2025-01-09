import { NextApiRequest, NextApiResponse } from 'next';
import { formidable, IncomingForm, Fields, Files } from 'formidable';

export const config = {
    api: {
        bodyParser: false, // Désactive le bodyParser pour traiter les fichiers
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const form = formidable({
            uploadDir: './public/uploads', // Chemin pour enregistrer les fichiers
            keepExtensions: true, // Conserve les extensions de fichier
        });

        form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
            if (err) {
                console.error('Erreur lors du parsing des fichiers :', err);
                return res.status(500).json({ error: 'Erreur lors de l\'upload.' });
            }

            console.log('Champs reçus :', fields);
            console.log('Fichiers reçus :', files);
            res.status(200).json({ message: 'Fichier uploadé avec succès !', files });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}