<template>
    <footer class="footer">
    <div class="footer__inner">
      <!-- Bloc de gauche -->
      <div class="footer__brand">
        <NuxtLink to="/" class="footer__logo">Steam</NuxtLink>

        <p class="footer__legal">
          © 2026 Steam. Tous droits réservés.
          Toutes les marques commerciales sont la propriété de leurs titulaires respectifs.
        </p>

        <ul class="footer__socials">
          <li v-for="social in socials" :key="social.name">
            <a
              :href="social.href"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon :name="social.icon" />
            </a>
          </li>
        </ul>
      </div>

      <!-- Colonnes de liens -->
      <div class="footer__columns">
        <div v-for="column in columns" :key="column.title" class="footer__column">
          <h3 class="footer__title">{{ column.title }}</h3>
          <ul class="footer__list">
            <li v-for="link in column.links" :key="link.to">
              <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const columns = [
  {
    title: 'Le site',
    links: [
      { label: 'À propos', to: '/about' },
      { label: 'Fonctionnalités', to: '/features' },
      { label: 'Tarifs', to: '/pricing' },
      { label: 'Blog', to: '/blog' },
      { label: 'Ajouter un jeu', to: '/addGameForm' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'Qui sommes-nous', to: '/company' },
      { label: 'Carrières', to: '/careers' },
      { label: 'Presse', to: '/press' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Confidentialité', to: '/privacy' },
      { label: 'Accessibilité', to: '/accessibility' },
      { label: 'Mentions légales', to: '/legal' },
      { label: 'Cookies', to: '/cookies' },
      { label: 'Remboursements', to: '/refunds' },
    ],
  },
  {
    title: 'Plus',
    links: [
      { label: "Centre d'aide", to: '/help' },
      { label: 'Contact', to: '/contact' },
      { label: 'Mon compte', to: '/account' },
    ],
  },
]

const socials = [
  { name: 'YouTube', icon: 'simple-icons:youtube', href: 'https://youtube.com/' },
  { name: 'Bluesky', icon: 'simple-icons:bluesky', href: 'https://bsky.app/' },
  { name: 'Facebook', icon: 'simple-icons:facebook', href: 'https://facebook.com/' },
  { name: 'X', icon: 'simple-icons:x', href: 'https://x.com/' },
]
</script>

<style scoped>
.footer {
  /* Variables locales (même principe que pour la navbar) */
  --footer-bg: #0e141b;
  --footer-text: #8f98a0;
  --footer-title: #b8b6b4;
  --footer-hover: #ffffff;

  background: var(--footer-bg);
  color: var(--footer-text);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.875rem;
  padding: 3rem 0;
}

.footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr;       /* mobile : tout empilé */
  gap: 2.5rem;
}

/* ---------- Bloc de gauche ---------- */
.footer__logo {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--footer-title);
  text-decoration: none;
}

.footer__legal {
  max-width: 280px;
  margin: 1.5rem 0;
  font-size: 0.75rem;
  line-height: 1.5;
}

.footer__socials {
  display: flex;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__socials a {
  font-size: 1.5rem;
  color: var(--footer-text);
  transition: color 0.2s;
}
.footer__socials a:hover {
  color: var(--footer-hover);
}

/* ---------- Colonnes ---------- */
.footer__columns {
  display: grid;
  /* autant de colonnes que la place le permet, 140px minimum chacune */
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 2rem;
}

.footer__title {
  margin: 0 0 1rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--footer-title);
}

.footer__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__list a {
  display: block;
  padding: 0.4rem 0;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.2s;
}
.footer__list a:hover {
  color: var(--footer-hover);
}

/* ---------- Desktop ---------- */
@media (min-width: 900px) {
  .footer__inner {
    grid-template-columns: 1fr 2fr;  /* bloc gauche | colonnes */
    gap: 4rem;
  }
}
</style>