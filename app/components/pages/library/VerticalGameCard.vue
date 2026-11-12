<template>
  <NuxtLink :to="`/game/${id}`" class="game-card" :title="title">
    <NuxtImg :src="image" :alt="title" class="game-card-img" />
    <span class="game-card-title">{{ title }}</span>
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
  image: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.game-card {
  position: relative;
  display: block;
  aspect-ratio: 2 / 3; /* capsule verticale 600x900 */
  border-radius: 3px;
  overflow: hidden;
  background: #0e141b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.game-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Reflet léger comme dans Steam */
.game-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0) 45%
  );
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
}

/* Titre qui apparaît en bas au survol */
.game-card-title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px 8px 8px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.game-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 0 2px #66c0f4, 0 8px 24px rgba(0, 0, 0, 0.7);
  z-index: 2;
}

.game-card:hover::after {
  opacity: 1;
}

.game-card:hover .game-card-title {
  opacity: 1;
  transform: translateY(0);
}
</style>
