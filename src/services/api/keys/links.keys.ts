export const linksKeys = {
  all: ['links'] as const,
  preview: (url: string) => ['links', 'preview', url] as const
}
