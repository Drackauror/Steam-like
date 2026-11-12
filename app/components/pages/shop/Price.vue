<template>
  <div class="price">
    <span v-if="sales > 0" class="price__badge">-{{ sales }}%</span>

    <div class="price__box">
      <span v-if="sales > 0" class="price__original">${{ price.toFixed(2) }}</span>
      <span class="price__current">
        {{ props.price === 0 ? "Gratuit" : currentPrice + " €" }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  price: { type: Number, default: 0 },
  sales: { type: Number, default: 0 }, // pourcentage de réduction
});

const currentPrice = computed(() => {
  return (props.price * (1 - props.sales / 100)).toFixed(2);
});
</script>

<style scoped>
.price {
  display: inline-flex;
  align-items: stretch;
  height: 32px;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
}

.price__badge {
  display: flex;
  align-items: center;
  padding: 0 7px;
  background: #4c6b22;
  color: #a4d007;
  font-size: 18px;
  font-weight: 700;
}

.price__box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  background: rgba(0, 0, 0, 0.35);
}

.price__original {
  font-size: 12px;
  color: #738895;
  text-decoration: line-through;
}

.price__current {
  font-size: 14px;
  color: #c7d5e0;
}
</style>
