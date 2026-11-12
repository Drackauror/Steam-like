<script setup lang="ts">
// Si personne n'est connecté, on renvoie vers la page de connexion
definePageMeta({
  middleware: () => {
    const userStore = useUserStore()
    if (!userStore.isConnected) {
      return navigateTo('/login')
    }
  },
})

const userStore = useUserStore()
const { connectedUser } = storeToRefs(userStore)

const initials = computed(() => {
  const first = connectedUser.value?.firstName?.[0] ?? ''
  const last = connectedUser.value?.lastName?.[0] ?? ''
  return (first + last).toUpperCase()
})

function handleLogout() {
  userStore.logout()
  navigateTo('/login')
}
</script>

<template>
  <div v-if="connectedUser" class="account-page">
    <div class="account-container">
      <!-- En-tête du profil -->
      <header class="profile-header">
        <div class="avatar">{{ initials }}</div>
        <div class="profile-info">
          <h1 class="profile-name">
            {{ connectedUser.firstName }} {{ connectedUser.lastName }}
          </h1>
          <span class="profile-email">{{ connectedUser.email }}</span>
        </div>
      </header>

      <!-- Détails du compte -->
      <section class="panel">
        <h2 class="panel-title">DÉTAILS DU COMPTE</h2>

        <dl class="details">
          <div class="details-row">
            <dt>Prénom</dt>
            <dd>{{ connectedUser.firstName }}</dd>
          </div>
          <div class="details-row">
            <dt>Nom</dt>
            <dd>{{ connectedUser.lastName }}</dd>
          </div>
          <div class="details-row">
            <dt>Adresse e-mail</dt>
            <dd>{{ connectedUser.email }}</dd>
          </div>
        </dl>
      </section>

      <!-- Actions -->
      <div class="actions">
        <button class="btn-steam" @click="handleLogout">
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #1b2838 0%, #171d25 100%);
  color: #c6d4df;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  padding: 40px 20px;
  box-sizing: border-box;
}

.account-container {
  max-width: 760px;
  margin: 0 auto;
}

/* ---------- En-tête profil ---------- */
.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
}

.avatar {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #2a475e 0%, #1b2838 100%);
  border: 2px solid #66c0f4;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(102, 192, 244, 0.35);
}

.profile-name {
  margin: 0 0 4px;
  font-size: 26px;
  font-weight: 400;
  color: #fff;
}

.profile-email {
  font-size: 14px;
  color: #8f98a0;
}

/* ---------- Panneau ---------- */
.panel {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 20px 24px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
}

.panel-title {
  margin: 0 0 16px;
  padding-bottom: 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #8f98a0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.details {
  margin: 0;
}

.details-row {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.details-row:last-child {
  border-bottom: none;
}

.details-row dt {
  width: 180px;
  flex-shrink: 0;
  font-size: 13px;
  color: #8f98a0;
}

.details-row dd {
  margin: 0;
  font-size: 14px;
  color: #c6d4df;
}

/* ---------- Boutons ---------- */
.actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

</style>