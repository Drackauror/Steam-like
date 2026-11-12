<template>
  <NuxtLink :to="`/game/${id}`" :title="title" class="sidebar-item">
    <img :src="icon" :alt="title" class="sidebar-icon" />
    <span class="sidebar-name">{{ title }}</span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* ---------- Ligne de la sidebar (le lien) ---------- */
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  font-size: 14px;
  color: #8f98a0;
  text-decoration: none; /* retire le soulignement du lien */
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
  min-width: 0; /* permet aux "..." de s'afficher dans un conteneur flex */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
