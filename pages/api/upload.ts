import { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, Files } from "formidable";
import path from "path";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false, // Désactive le bodyParser pour permettre à formidable de gérer les fichiers
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: "Méthode non autorisée. Utilisez POST." });
    }

    try {
        const { files } = await parseForm(req);

        // Récupère le fichier uploadé
        const file = Array.isArray(files.icon) ? files.icon[0] : files.icon;

        if (!file) {
            return res.status(400).json({ error: "Aucun fichier n'a été uploadé." });
        }

        // Valide le type MIME
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
        if (!allowedMimeTypes.includes(file.mimetype || "")) {
            // Supprime immédiatement le fichier non valide
            deleteFile(file.filepath);
            return res.status(400).json({ error: "Type de fichier non supporté." });
        }

        // Génère une URL publique pour l'icône
        const publicUrl = `/uploads/${path.basename(file.filepath)}`;
        console.log("Icône uploadée avec succès :", publicUrl);

        // Envoie la réponse au client
        res.status(200).json({
            message: "Icône uploadée et traitée avec succès !",
            url: publicUrl,
        });

        // Retarde la suppression pour laisser au client le temps de charger l'image
        setTimeout(() => {
            deleteFile(file.filepath);
        }, 10000); // 10 secondes
    } catch (err) {
        console.error("Erreur lors de l'upload :", err);
        res.status(500).json({ error: "Erreur interne lors de l'upload." });
    }
}

/**
 * Utilitaire pour parser la requête avec formidable.
 * @param req - Requête Next.js
 * @returns Promise contenant les champs et fichiers parsés
 */
function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Crée le dossier uploads s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
        uploadDir, // Enregistre les fichiers dans le dossier "public/uploads"
        keepExtensions: true, // Conserver l'extension du fichier
        maxFileSize: 5 * 1024 * 1024, // Taille max : 5MB
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

/**
 * Supprime un fichier donné.
 * @param filepath - Chemin absolu du fichier à supprimer
 */
function deleteFile(filepath: string): void {
    fs.unlink(filepath, (err) => {
        if (err) {
            console.error("Erreur lors de la suppression du fichier :", err);
        } else {
            console.log("Fichier supprimé :", filepath);
        }
    });
}