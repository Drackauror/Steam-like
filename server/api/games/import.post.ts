/// Ne peut pas être testé car SDV bloque Steam.

export default defineEventHandler(async (event) => {
    const { appid } = await readBody(event)       // ex: { "appid": 620 }

    // On demande les infos du jeu à Steam
    const reponse: any = await $fetch('https://store.steampowered.com/api/appdetails', {
        query: { appids: appid, cc: 'fr', l: 'french' }
    })

    const resultat = reponse[appid]               // la réponse est rangée sous l'appid
    if (!resultat?.success) {                     // Steam dit que ça n'a pas marché
        throw createError({ statusCode: 404, statusMessage: 'Jeu introuvable sur Steam' })
    }
    const d = resultat.data                       // les vraies données du jeu

    const jeux = readJson('games')

    // Évite d'importer deux fois le même jeu
    if (jeux.some((j: any) => j.steamId === d.steam_appid)) {
        throw createError({ statusCode: 409, statusMessage: 'Jeu déjà importé' })
    }

    const jeu = {
        id: jeux.length + 1,
        steamId: d.steam_appid,
        title: d.name,
        price: d.is_free ? 0 : (d.price_overview?.final ?? 0) / 100,  // Steam donne le prix en centimes
        description: d.short_description,
        genres: d.genres?.map((g: any) => g.description) ?? [],
        images: { banner: d.header_image }          // lien direct vers l'image chez Steam
    }

    jeux.push(jeu)
    writeJson('games', jeux)
    return jeu
})