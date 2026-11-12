// utilisateur connecté

//- variable connectedUser
//- fonction de connexion (on vient remplir la variable connectedUser)
//- fonction de déconnexion (on supprime la variable connectedUser)
//- afficher nom + prénom de l'utilisateur connecté dans la navbar
//- afficher le profile de l'utilisateur connecté dans la page profil

export interface User {
    firstName: string
    lastName: string
    email: string
}

export const useUserStore = defineStore('user', () => {

    const connectedUser = ref<User | null>(null)

    const isConnected = computed(() => connectedUser.value !== null)

    function login(user: User) {
        connectedUser.value = user
    }

    function logout() {
        connectedUser.value = null
    }

    return {
        connectedUser,
        isConnected,
        login,
        logout
    }

})