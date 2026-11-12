import { readJson } from "../../utils/db"

export default defineEventHandler((event) => {
    const id = Number(getRouterParam(event, 'id'))  // récupère le numéro dans l'URL (/api/games/2 -> 2)
    const games = readJson('games')                      // lit tous les jeux
    const game = games.find((j: any) => j.id === id)  // cherche celui dont l'id correspond

    if (!game) {                                     // si on n'a rien trouvé...
        throw createError({ statusCode: 404, statusMessage: 'Jeu introuvable' })
    }

    return game                                      // sinon on renvoie le jeu
})