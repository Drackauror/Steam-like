<template>
  <div class="library">
    <!-- Sidebar -->
    <aside class="library-sidebar">
      <div class="sidebar-search">
        <input v-model="search" type="text" placeholder="Rechercher" />
      </div>

      <div class="sidebar-section-title">
        JEUX <span class="count">({{ filteredGames.length }})</span>
      </div>

      <ul class="sidebar-list">
        <li v-for="game in filteredGames" :key="game.id" class="sidebar-item">
          <SidebarList
            :key="game.id"
            :id="game.id"
            :title="game.title"
            :icon="game.icon"
          />
        </li>
      </ul>
    </aside>

    <!-- Contenu principal -->
    <main class="library-main">
      <h2 class="section-title">TOUS LES JEUX ({{ filteredGames.length }})</h2>

      <div class="game-grid">
        <VerticalGameCard
          v-for="game in filteredGames"
          :key="game.id"
          :id="game.id"
          :title="game.title"
          :image="game.vertical"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
const search = ref("");
const { data: jeux } = await useFetch("/api/games");

const games = computed(() => {
  if (!jeux.value) return [];
  return jeux.value.map((game) => ({
    id: game.id, // sert de clé unique
    title: game.title,
    icon: game.images?.icon || game.images?.vertical || game.image, // image de la sidebar
    vertical: game.images?.vertical || game.images?.banner || game.image, // image des cartes
  }));
});

const filteredGames = computed(() =>
  games.value.filter((g) => g.title.toLowerCase().includes(search.value.toLowerCase()))
);
</script>

<style scoped>
.library {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(180deg, #1b2838 0%, #171d25 100%);
  color: #c6d4df;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
}

/* ---------- Sidebar ---------- */
.library-sidebar {
  width: 260px;
  flex-shrink: 0;
  background: #171d25;
  border-right: 1px solid #0e141b;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-search {
  padding: 10px;
}

.sidebar-search input {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  color: #c6d4df;
  font-size: 13px;
  outline: none;
}

.sidebar-search input:focus {
  border-color: #66c0f4;
}

.sidebar-section-title {
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #8f98a0;
}

.sidebar-section-title .count {
  font-weight: 400;
}

.sidebar-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #8f98a0;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}

.sidebar-icon {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  object-fit: cover;
}

.sidebar-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* ---------- Main ---------- */
.library-main {
  flex: 1;
  padding: 20px 30px;
}

.section-title {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #8f98a0;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}
</style>
