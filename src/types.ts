export const projectTypes = ['cra', 'gatsby', 'next'] as const

export type Stacks = typeof projectTypes[number]
