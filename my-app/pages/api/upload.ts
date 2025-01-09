import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log('Requête POST reçue !');
        res.status(200).json({ message: 'API upload fonctionne !' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}