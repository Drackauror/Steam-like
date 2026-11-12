<template>
  <div class="login-page">
    <div class="login-box">
      <h1 class="login-title">SE CONNECTER</h1>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="field">
          <label for="firstName">Prénom</label>
          <input id="firstName" v-model="firstName" required autocomplete="given-name" />
        </div>

        <div class="field">
          <label for="lastName">Nom</label>
          <input id="lastName" v-model="lastName" required autocomplete="family-name" />
        </div>

        <div class="field">
          <label for="email">Adresse e-mail</label>
          <input id="email" v-model="email" type="email" required autocomplete="email" />
        </div>

        <button type="submit" class="btn-steam">
          <span>Se connecter</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')

function handleLogin() {
  // pas d'API donc on remplit directement connectedUser avec ce qui est saisi
  userStore.login({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  })
  navigateTo('/account')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #1b2838 0%, #171d25 100%);
  color: #c6d4df;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 3px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

.login-title {
  margin: 0 0 24px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #8f98a0;
}

/* ---------- Formulaire ---------- */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

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
  box-sizing: border-box;
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

.field input:focus {
  background: rgba(60, 75, 95, 0.8);
  border-color: #66c0f4;
}

</style>