import { queryDb } from '@livestore/livestore'

import { tables } from './schema.ts'

export const sessions$ = queryDb(tables.sessions, { label: 'sessions' })
