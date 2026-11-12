<script setup>
const GENRES = [
  "Action",
  "Aventure",
  "RPG",
  "Stratégie",
  "Simulation",
  "Sport",
  "Course",
  "Puzzle",
  "Plateformer",
  "Horreur",
  "Occasionnel",
  "Indépendant",
  "Multijoueur",
  "Coop",
  "Monde ouvert",
  "Fantasy",
];

const title = ref("");
const description = ref("");
const price = ref(0);
const sales = ref(""); // vide = pas de promotion
const genres = ref([]); // genres cochés
const fichiers = ref({});
const message = ref("");

function choisirFichier(event, nom) {
  fichiers.value[nom] = event.target.files[0];
}

async function envoyer() {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("price", price.value);
  formData.append("genres", JSON.stringify(genres.value)); // tableau -> texte JSON

  // promo facultative on n'envoie que si elle est remplie
  if (sales.value !== "" && sales.value !== null) {
    formData.append("sales", sales.value);
  }

  for (const nom in fichiers.value) {
    if (fichiers.value[nom]) {
      formData.append(nom, fichiers.value[nom]);
    }
  }

  try {
    await $fetch("/api/games", { method: "POST", body: formData });
    await navigateTo("/");
  } catch (e) {
    message.value = e?.data?.statusMessage || "Erreur lors de l'ajout du jeu";
  }
}
</script>

<template>
  <div class="form-page">
    <form class="game-form" @submit.prevent="envoyer">
      <h1 class="form-title">AJOUTER UN JEU</h1>

      <div class="field">
        <label for="title">Titre</label>
        <input
          id="title"
          v-model="title"
          placeholder="Titre"
          required
          autocomplete="off"
        />
      </div>

      <div class="field">
        <label for="price">Prix (€)</label>
        <input
          id="price"
          v-model.number="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="Prix"
          required
        />
      </div>

      <div class="field">
        <label for="sales">Promotion (%) <small>– facultatif</small></label>
        <input
          id="sales"
          v-model.number="sales"
          type="number"
          min="0"
          max="100"
          step="1"
          placeholder="ex : 25"
        />
      </div>

      <div class="field">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          rows="4"
          placeholder="Description"
        ></textarea>
      </div>

      <MenuDeroulant
        v-model="genres"
        labelText="Genres"
        listText="Choisir des genres"
        :MENULIST="GENRES"
      />

      <div class="field">
        <label
          >Bannière
          <input
            type="file"
            accept="image/*"
            @change="choisirFichier($event, 'banner')"
          />
        </label>

        <label
          >Icône
          <input type="file" accept="image/*" @change="choisirFichier($event, 'icon')" />
        </label>

        <label
          >Image verticale
          <input
            type="file"
            accept="image/*"
            @change="choisirFichier($event, 'vertical')"
          />
        </label>
      </div>

      <p v-if="message" class="form-error">{{ message }}</p>

      <button type="submit" class="btn-steam">
        <span>Ajouter</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
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

.form-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(180deg, #1b2838 0%, #171d25 100%);
}

.game-form {
  width: 100%;
  max-width: 440px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 3px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

.form-title {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #8f98a0;
}

/* ---------- Champs ---------- */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #66c0f4;
}

.field input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: #fff;
  background: rgba(50, 60, 75, 0.7);
  border: 1px solid #000;
  border-radius: 3px;
  box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.6);
  outline: none;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.field input::placeholder {
  color: #5c6b7a;
}

.field input:focus {
  background: rgba(60, 75, 95, 0.8);
  border-color: #66c0f4;
}

/* ---------- Champ fichier ---------- */
.field input[type="file"] {
  padding: 6px;
  font-size: 13px;
  color: #8f98a0;
  cursor: pointer;
}

.field input[type="file"]::file-selector-button {
  margin-right: 12px;
  padding: 6px 14px;
  font-size: 13px;
  color: #c6d4df;
  background: rgba(103, 193, 245, 0.2);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.field input[type="file"]::file-selector-button:hover {
  background: rgba(103, 193, 245, 0.4);
  color: #fff;
}

/* ---------- Message d'erreur ---------- */
.form-error {
  margin: 0;
  padding: 10px 12px;
  font-size: 13px;
  color: #ff8a80;
  background: rgba(200, 50, 50, 0.15);
  border-left: 3px solid #d9534f;
  border-radius: 2px;
}
</style>
