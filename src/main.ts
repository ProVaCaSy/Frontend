import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import keycloak from './auth/keycloak'

async function bootstrap() {
  try {
    await keycloak.init({
      onLoad: 'login-required',
      pkceMethod: 'S256',
    })

    const app = createApp(App)

    app.provide('keycloak', keycloak)
    app.use(router)
    await router.isReady()
    app.mount('#app')
  } catch (error) {
    console.error('Keycloak-Initialisierung fehlgeschlagen:', error)
  }
}

bootstrap()
