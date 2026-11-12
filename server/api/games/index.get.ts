import { readJson } from "../../utils/db"

export default defineEventHandler(() => {
    return readJson('games')   // lit le fichier et renvoie la liste au front
})