import type { User } from '@/types'

// PLATZHALTER: Rollennamen an die Gruppen/Rollen in Keycloak und im Backend anpassen.
export const ROLES = {
  PROFESSOR: 'professor',
  SEKRETARIAT: 'sekretariat',
  DEKAN: 'dekan',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_LABEL: Record<Role, string> = {
  professor: 'Professor',
  sekretariat: 'Sekretariat',
  dekan: 'Dekan',
}

export const roleLabel = (role: Role | null) => (role ? ROLE_LABEL[role] : 'Ohne Rolle')

export const isAdmin = (u: User) => u.role === ROLES.SEKRETARIAT || u.role === ROLES.DEKAN

/** Sekretariat trägt nur für andere ein, der Dekan zusätzlich für sich selbst. */
export const selectableUsers = (user: User, all: User[]) =>
  all.filter((u) => u.role === ROLES.PROFESSOR || (u.id === user.id && user.role !== ROLES.SEKRETARIAT))

export const initials = (name: string) =>
  name
    .split(' ')
    .filter((p) => p && !p.endsWith('.'))
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
