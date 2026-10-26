import type { PropsWithChildren } from 'react'

import { ExternalLinkPreview } from '@/components/links/external-link-preview'
import { DeveloperCard } from '@/components/profile/developer-card'
import { PreviewCard } from '@/components/ui/preview-card'

import { usePreview } from '@/hooks/preview/use-preview'

export function PreviewProvider({ children }: PropsWithChildren) {
  const { target, open, setOpen, data, loading } = usePreview()

  return (
    <>
      {children}
      <PreviewCard.Root open={open} onOpenChange={setOpen}>
        {target && (
          <PreviewCard.Content anchor={target.anchor}>
            <div data-preview-popup>
              {target.developer ? (
                <DeveloperCard />
              ) : (
                <ExternalLinkPreview
                  key={target.url}
                  url={target.url}
                  data={data}
                  loading={loading}
                />
              )}
            </div>
          </PreviewCard.Content>
        )}
      </PreviewCard.Root>
    </>
  )
}
