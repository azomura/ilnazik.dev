import { ExternalLinkPreview } from '@/components/links/external-link-preview'
import { DeveloperCard } from '@/components/profile/developer-card'
import { PreviewCard } from '@/components/ui/preview-card'

import { useLinkPreview } from '@/hooks/preview/use-link-preview'

import type { IPreviewTarget } from '@/interfaces/ui/preview'

import { QueryProvider } from './query.provider'

interface IPreviewPopupProps {
  target: IPreviewTarget
  open: boolean
  setOpen: (open: boolean) => void
}

function PreviewContent({ target, open, setOpen }: IPreviewPopupProps) {
  const { data, loading } = useLinkPreview(target.url, open && !target.developer)

  return (
    <PreviewCard.Root open={open} onOpenChange={setOpen}>
      <PreviewCard.Content anchor={target.anchor}>
        <div data-preview-popup>
          {target.developer ? (
            <DeveloperCard />
          ) : (
            <ExternalLinkPreview key={target.url} url={target.url} data={data} loading={loading} />
          )}
        </div>
      </PreviewCard.Content>
    </PreviewCard.Root>
  )
}

export function PreviewPopup(props: IPreviewPopupProps) {
  return (
    <QueryProvider>
      <PreviewContent {...props} />
    </QueryProvider>
  )
}
