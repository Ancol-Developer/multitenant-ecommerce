import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: () => false,
    update: () => false
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true
    }
  ]
}