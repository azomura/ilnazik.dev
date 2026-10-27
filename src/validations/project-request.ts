import { z } from 'zod'

import { contactMethods } from '@/data/contact-methods'

export const projectRequestSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    contact: z.string().trim().min(3).max(190),
    contactMethod: z.enum(contactMethods),
    description: z.string().trim().min(10).max(2500),
    budget: z.string().refine(value => {
      if (!value.trim()) return true

      const amount = Number(value)
      return Number.isFinite(amount) && amount >= 0 && amount <= 1000000000
    }),
    hasDesign: z.boolean()
  })
  .superRefine((values, context) => {
    if (values.contactMethod !== 'email' || z.email().safeParse(values.contact).success) return

    context.addIssue({ code: 'custom', path: ['contact'], message: 'email' })
  })

export type ProjectRequestValues = z.infer<typeof projectRequestSchema>
