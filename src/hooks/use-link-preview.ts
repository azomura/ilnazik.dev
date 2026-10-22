import { useGetLinkPreview } from '@/services/api/hooks/links.hooks'

export function useLinkPreview(url: string, open: boolean) {
  const query = useGetLinkPreview(url, open)

  return { data: query.data ?? null, loading: query.isPending && !query.isError }
}
