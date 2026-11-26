// Domänentypen des Frontends. Sobald der generierte Client vorliegt (services/generated),
// sollten die Typen für Anfragen und Antworten von dort kommen.
import type { Role } from '@/utils/access'

export type Status = 'genehmigt' | 'beantragt' | 'abgelehnt'
export type Kind = 'Urlaub' | 'Konferenz'

export interface User {
  id: string
  name: string
  email: string
  role: Role | null // null = keine Rolle zugewiesen
  color: string
  annualDays: number
}

export interface Vacation {
  id: string
  userId: string
  kind: Kind
  start: string // YYYY-MM-DD
  end: string // YYYY-MM-DD, inklusive
  note: string
  status: Status
}

/** Eingabe im Formular: noch ohne ID und Status. */
export type Draft = Omit<Vacation, 'id' | 'status'>
export type Range = { start: string; end: string }

export type CalendarViewMode = 'month' | 'week' | 'day'
