<script setup>
const route = useRoute();
const id = route.params.id;
const { data: game } = await useFetch(`/api/games/${id}`);

// Image de la bannière, avec un plan B si elle n'existe pas
const banniere = computed(
  () => game.value?.images?.banner || game.value?.images?.vertical || ""
);
</script>

<template>
  <div v-if="game" class="game-page">
    <!-- Bannière avec le titre -->
    <section
      class="hero"
      :style="{ backgroundImage: banniere ? `url(${banniere})` : 'none' }"
    >
      <div class="hero-overlay">
        <h1 class="hero-title">{{ game.title }}</h1>
      </div>
    </section>

    <!-- Barre d'actions -->
    <section class="action-bar">
      <button class="btn-play">▶ JOUER</button>
      <div class="action-info">
        <span class="action-label">PRIX À L'ACHAT</span>
        <Price :price="game.price" :sales="game.sales ?? 0" />
      </div>
    </section>

    <!-- Contenu -->
    <section class="content">
      <div class="content-main">
        <h2 class="block-title">À PROPOS DE CE JEU</h2>
        <p v-if="game.description" class="description">{{ game.description }}</p>
        <p v-else class="description muted">Aucune description disponible.</p>
      </div>

      <aside class="content-side">
        <h2 class="block-title">INFORMATIONS</h2>

        <div v-if="game.genres?.length" class="tags">
          <span v-for="genre in game.genres" :key="genre" class="tag">{{ genre }}</span>
        </div>

        <img
          v-if="game.images?.vertical"
          :src="game.images.vertical"
          :alt="game.title"
          class="side-cover"
        />
      </aside>
    </section>
  </div>

  <div v-else class="not-found">Jeu introuvable</div>
</template>

<style scoped>
.game-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #1b2838 0%, #171d25 100%);
  color: #c6d4df;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
}

/* ---------- Bannière ---------- */
.hero {
  height: 320px;
  background-color: #0e141b; /* couleur affichée s'il n'y a pas d'image */
  background-size: cover;
  background-position: center top;
}

.hero-overlay {
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 30px;
  /* dégradé : transparent en haut, couleur du fond en bas */
  background: linear-gradient(180deg, rgba(27, 40, 56, 0) 40%, #1b2838 100%);
}

.hero-title {
  margin: 0;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

/* ---------- Barre d'actions ---------- */
.action-bar {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 16px 30px;
  background: rgba(0, 0, 0, 0.25);
}

.btn-play {
  padding: 12px 44px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fff;
  background: linear-gradient(180deg, #75b022 0%, #588a1b 100%);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: filter 0.15s ease;
}

.btn-play:hover {
  filter: brightness(1.15);
}

.action-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.action-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #8f98a0;
}

.action-value {
  font-size: 16px;
  color: #fff;
}

/* ---------- Contenu ---------- */
.content {
  display: grid;
  grid-template-columns: 1fr 300px; /* colonne principale + colonne de droite */
  gap: 30px;
  padding: 30px;
}

.block-title {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #8f98a0;
}

.description {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #c6d4df;
}

.muted {
  color: #5c6b7a;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 4px 10px;
  font-size: 12px;
  color: #67c1f5;
  background: rgba(103, 193, 245, 0.2);
  border-radius: 2px;
}

.side-cover {
  display: block;
  width: 100%;
  margin-top: 16px;
  border-radius: 3px;
}

.not-found {
  padding: 40px;
  text-align: center;
  color: #8f98a0;
}

/* Sur petit écran : une seule colonne */
@media (max-width: 800px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
