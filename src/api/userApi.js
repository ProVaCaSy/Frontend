import keycloak from '../auth/keycloak'

export async function getCurrentUser() {
  await keycloak.updateToken(30)

  const response = await fetch('http://localhost:8081/api/users/me', {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Benutzer konnte nicht geladen werden: ${response.status}`)
  }

  return response.json()
}