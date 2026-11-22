import keycloak from './keycloak'

export function logout() {
  return keycloak.logout({
    redirectUri: window.location.origin,
  })
}