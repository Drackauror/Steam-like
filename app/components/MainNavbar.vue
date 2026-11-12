<template>
       <header class="navbar">
        <nav class="navbar__inner" aria-label="Navigation principale">
            <NuxtLink to="/" class="navbar__logo">Steam</NuxtLink>

            <ul class="navbar__links">
                <li v-for="link in links" :key="link.to">
                    <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
const links = [
  { label: 'Magasin', to: '/' },
  { label: 'Bibliothèque', to: '/library' },
  { label: 'À propos', to: '/about' },
  { label: 'Support', to: '/support' },
  { label: 'Ajouter un jeu', to: '/addGameForm' },
]
</script>

<style scoped>
/* =========================================
   Conteneur principal
   ========================================= */
.navbar {
    --nav-bg: #171a21;
    --nav-text: #b8b6b4;
    --nav-text-hover: #ffffff;
    --nav-accent: #1a9fff;
    --nav-border: rgba(255, 255, 255, 0.08);

    background: var(--nav-bg);
    color: var(--nav-text);
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    position: sticky;
    /* reste collée en haut au scroll */
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
}

.navbar__inner {
    max-width: 940px;
    /* largeur de contenu typique de Steam */
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

/* =========================================
   Logo
   ========================================= */
.navbar__logo {
    padding: 1.25rem 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--nav-text-hover);
    text-decoration: none;
}

/* =========================================
   Bouton burger (mobile)
   ========================================= */
.navbar__toggle {
    background: none;
    border: none;
    color: var(--nav-text);
    font-size: 1.75rem;
    cursor: pointer;
    transition: color 0.2s;
}

.navbar__toggle:hover {
    color: var(--nav-text-hover);
}

/* =========================================
   Liens (mobile : menu caché par défaut)
   ========================================= */
.navbar__links {
    display: none;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0 0 0.5rem;
    list-style: none;
    border-top: 1px solid var(--nav-border);
}

.navbar__links--open {
    display: flex;
}

.navbar__links a {
    display: block;
    padding: 0.75rem 0;
    font-size: 0.875rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--nav-text);
    text-decoration: none;
    transition: color 0.2s;
}

.navbar__links a:hover {
    color: var(--nav-text-hover);
}

/* Lien de la page courante (classe ajoutée par NuxtLink) */
.navbar__links a.router-link-exact-active {
    color: var(--nav-text-hover);
}

/* =========================================
   Desktop (≥ 768px)
   ========================================= */
@media (min-width: 768px) {
    .navbar__toggle {
        display: none;
    }

    .navbar__links {
        display: flex;
        flex-direction: row;
        width: auto;
        margin-left: 2rem;
        margin-right: auto;
        /* pousse tout le reste vers la droite */
        padding: 0;
        border-top: none;
    }

    .navbar__links a {
        padding: 1.5rem 1rem;
        border-bottom: 3px solid transparent;
    }

    .navbar__links a:hover,
    .navbar__links a.router-link-exact-active {
        border-bottom-color: var(--nav-accent);
    }
}

/* =========================================
   BONUS : boutons à droite (style Steam)
   ========================================= */
.navbar__actions {
    display: none;
    /* masqué sur mobile pour simplifier */
    align-items: center;
    gap: 1rem;
}

.navbar__btn {
    padding: 0.4rem 0.9rem;
    border-radius: 2px;
    font-size: 0.8125rem;
    color: #d2efa9;
    text-decoration: none;
    background: linear-gradient(to right, #75b022 5%, #588a1b 95%);
    transition: filter 0.2s;
}

.navbar__btn:hover {
    filter: brightness(1.15);
    color: #ffffff;
}

.navbar__login {
    font-size: 0.8125rem;
    color: var(--nav-text);
    text-decoration: none;
}

.navbar__login:hover {
    color: var(--nav-text-hover);
}

@media (min-width: 768px) {
    .navbar__actions {
        display: flex;
    }
}
</style>