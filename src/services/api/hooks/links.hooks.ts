import { useQuery } from '@tanstack/react-query'

import { linksKeys } from '@/services/api/keys/links.keys'
import { linksModule } from '@/services/api/modules/links.module'

export function useGetLinkPreview(url: string, enabled: boolean) {
  return useQuery({
    queryKey: linksKeys.preview(url),
    queryFn: ({ signal }) => linksModule.getPreview(url, signal),
    select: response => response.data,
    enabled: enabled && Boolean(url),
    staleTime: 30 * 60_000,
    gcTime: 30 * 60_000,
    retry: false,
    refetchOnWindowFocus: false
  })
}
