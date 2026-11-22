import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'hse',
  clientId: 'provacasy-frontend',
})

export default keycloak