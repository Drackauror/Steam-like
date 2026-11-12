import { readJson, writeJson } from "../../utils/db"
import fs from 'node:fs'

const IMAGE_FIELDS = ['banner', 'icon', 'vertical']
const GENRES = [
    'Action', 'Aventure', 'RPG', 'Stratégie', 'Simulation', 'Sport',
    'Course', 'Puzzle', 'Plateformer', 'Horreur', 'Occasionnel',
    'Indépendant', 'Multijoueur', 'Coop', 'Monde ouvert', 'Fantasy'
]

function slugify(texte: string) {
    return texte
        .toLowerCase()                                // tout en minuscules
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // retire les accents
        .replace(/[^a-z0-9]+/g, '-')                  // tout ce qui n'est pas lettre/chiffre devient "-"
        .replace(/^-+|-+$/g, '')                      // retire les "-" au début et à la fin
}

export default defineEventHandler(async (event) => {

    const parts = await readMultipartFormData(event)
    if (!parts) {
        throw createError({ statusCode: 400, statusMessage: 'Formulaire vide' })
    }

    const fields: any = {}
    const files: any = {}
    for (const part of parts) {
        if (part.filename) {
            files[part.name as string] = part     // ex: files.banner = ...
        } else {
            fields[part.name as string] = part.data.toString()
        }
    }

    const slug = slugify(fields.title || '')
    if (!slug) {
        throw createError({ statusCode: 400, statusMessage: 'Titre invalide' })
    }

    const games = readJson('games')

    if (games.some((j: any) => slugify(j.title) === slug)) {
        throw createError({ statusCode: 409, statusMessage: 'Un jeu avec ce nom existe déjà' })
    }

    // genres : tableau JSON, filtré sur la liste autorisée
    let genres: string[] = []
    try {
        const parsed = JSON.parse(fields.genres || '[]')
        if (Array.isArray(parsed)) {
            genres = parsed.filter((g: string) => GENRES.includes(g))
        }
    } catch {
        throw createError({ statusCode: 400, statusMessage: 'Genres invalides' })
    }

    // promo : facultative, entre 0 et 100
    let sales: number | null = null
    if (fields.sales !== undefined && fields.sales !== '') {
        sales = Number(fields.sales)
        if (Number.isNaN(sales) || sales < 0 || sales > 100) {
            throw createError({ statusCode: 400, statusMessage: 'Promotion invalide (0 à 100)' })
        }
    }

    // on enregistre chaque image, en boucle
    const dossier = `public/images/games/${slug}`
    fs.mkdirSync(dossier, { recursive: true })

    const images: any = {}
    for (const name of IMAGE_FIELDS) {
        const file = files[name]
        if (!file) continue
        const extension = file.filename.split('.').pop()
        const filename = `${slug}-${name}.${extension}`        // ex: hollow-knight-banner.jpg
        fs.writeFileSync(`${dossier}/${filename}`, file.data)
        images[name] = `/images/games/${slug}/${filename}`     // chemin utilisable par le navigateur
    }

    const game = {
        id: games.length + 1,
        title: fields.title,
        description: fields.description || '',
        price: Number(fields.price),
        sales: sales,            // null si pas de promo
        genres: genres,          // ex: ['Action', 'RPG']
        images: images
    }
    games.push(game)
    writeJson('games', games)

    return game

})
