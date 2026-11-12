<template>
    <div class="game-card">
    <NuxtImg class="game-card__image" :src="image" :alt="title" />

    <div class="game-card__info">
      <h3 class="game-card__title">{{ title }}</h3>
      <p class="game-card__tags">{{ tags.join(', ') }}</p>
      <p v-if="releaseDate" class="game-card__date">
        Date de parution : {{ releaseDate }}
      </p>
    </div>

    <Price class="game-card__price" :price="price" :sales="sales" />
  </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Default Title'
    },
    tags: {
        type: Array,
        default: () => []
    },
    image: {
        type: String,
    },
    releaseDate: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 99999
    },
    sales: {
        type: Number,
        default: 0
    }
})
</script>

<style scoped>
.game-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 6px 16px 6px 6px;
  background: linear-gradient(90deg, #1b2838 0%, #16202d 100%);
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s;
}

.game-card:hover {
  background: linear-gradient(90deg, #2a3f5a 0%, #1f3249 100%);
}

.game-card__image {
  width: 184px;
  height: 69px;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
}

.game-card__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.game-card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  color: #c7d5e0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-card__tags {
  margin: 0;
  font-size: 12px;
  color: #c7d5e0;
}

.game-card__date {
  margin: 0;
  font-size: 12px;
  color: #56707f;
}

.game-card__price {
  margin-left: auto;
  flex-shrink: 0;
}
</style>