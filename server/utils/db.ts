import fs from 'node:fs'   // fs = outil de Node pour lire/écrire des fichiers

// Lit un fichier JSON et le transforme en vraie liste utilisable
export function readJson(nom: string) {
    const texte = fs.readFileSync(`app/datas/${nom}.json`, 'utf-8') // récupère le texte du fichier
    return JSON.parse(texte)                                   // transforme le texte en liste
}

// Prend une liste et l'enregistre dans le fichier JSON
export function writeJson(nom: string, donnees: any) {
    fs.writeFileSync(`app/datas/${nom}.json`, JSON.stringify(donnees, null, 2))
    // JSON.stringify = l'inverse de JSON.parse : liste -> texte
    // le "null, 2" sert juste à avoir un fichier bien indenté et lisible
}