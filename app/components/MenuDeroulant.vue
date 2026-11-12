<template>
  <div class="field" ref="dropdown">
    <label>{{ labelText }}</label>
    <button type="button" class="dropdown-toggle" @click="menuOuvert = !menuOuvert">
      <span>{{ selection.length ? selection.join(", ") : listText }}</span>
      <span class="arrow">{{ menuOuvert ? "▲" : "▼" }}</span>
    </button>

    <div v-if="menuOuvert" class="dropdown-menu">
      <label v-for="g in MENULIST" :key="g" class="dropdown-option">
        <input type="checkbox" :value="g" v-model="selection" />
        {{ g }}
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  labelText: { type: String, default: "label" },
  listText: { type: String, default: "" },
  MENULIST: { type: Array, default: () => [] }, // () => [] : obligatoire pour un tableau par défaut
});

// La liste des éléments cochés, partagée avec le parent grâce à v-model
const selection = defineModel({ type: Array, default: () => [] });

const menuOuvert = ref(false);
const dropdown = ref(null);

function fermerSiExterieur(e) {
  if (dropdown.value && !dropdown.value.contains(e.target)) {
    menuOuvert.value = false;
  }
}
onMounted(() => document.addEventListener("click", fermerSiExterieur));
onBeforeUnmount(() => document.removeEventListener("click", fermerSiExterieur));
</script>

<style scoped>
.field label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #66c0f4;
}

/* ---------- Textarea ---------- */
.field textarea {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  color: #fff;
  background: rgba(50, 60, 75, 0.7);
  border: 1px solid #000;
  border-radius: 3px;
  box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.6);
  outline: none;
  resize: vertical;
  box-sizing: border-box;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.field textarea::placeholder {
  color: #5c6b7a;
}
.field textarea:focus {
  background: rgba(60, 75, 95, 0.8);
  border-color: #66c0f4;
}

/* ---------- Menu déroulant des genres ---------- */
.field {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  text-align: left;
  color: #fff;
  background: rgba(50, 60, 75, 0.7);
  border: 1px solid #000;
  border-radius: 3px;
  box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}
.dropdown-toggle .arrow {
  font-size: 10px;
  color: #8f98a0;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
  margin-top: 4px;
  background: #1b2838;
  border: 1px solid #000;
  border-radius: 3px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.7);
}

.field .dropdown-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 400;
  color: #c6d4df;
  cursor: pointer;
}
.field .dropdown-option:hover {
  background: rgba(103, 193, 245, 0.2);
}

.field .dropdown-option input[type="checkbox"] {
  width: auto;
  padding: 0;
  box-shadow: none;
  accent-color: #66c0f4;
}
</style>
>
