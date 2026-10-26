import { useI18n } from '@/hooks/providers/use-i18n'

import { ExternalLink, Globe } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

import type { LinkPreviewV1Dto } from '@/services/api/models'

interface IExternalLinkPreviewProps {
  url: string
  data: LinkPreviewV1Dto | null
  loading: boolean
}

export function ExternalLinkPreview({ url, data, loading }: IExternalLinkPreviewProps) {
  const { t } = useI18n()

  const address = new URL(url)

  const hostname = address.hostname
  const image = data?.image

  return (
    <div
      className={cn(
        'w-76 max-w-[calc(100vw-2rem)] overflow-hidden rounded-[20px]',
        'border border-border/50 bg-card text-card-foreground shadow-lg'
      )}
    >
      {image && (
        <img
          src={image}
          alt=''
          loading='lazy'
          referrerPolicy='no-referrer'
          className='block h-auto w-full data-[image-state=loading]:min-h-40'
        />
      )}

      <div className='p-3'>
        <div className='mb-2 flex items-center gap-2 text-muted-foreground'>
          <Globe className='size-3.5 shrink-0' />
          {loading ? (
            <Skeleton className='h-4 w-24 rounded' />
          ) : (
            <span className='truncate font-nt-somic text-xs'>{data?.siteName || hostname}</span>
          )}
          <ExternalLink className='ml-auto size-3.5 shrink-0' />
        </div>
        {loading ? (
          <>
            <div className='flex flex-col gap-1.5'>
              <Skeleton className='h-5 w-full rounded' />
              <Skeleton className='h-5 w-2/3 rounded' />
            </div>
            <div className='mt-2 flex flex-col gap-2'>
              <Skeleton className='h-3 w-full rounded' />
              <Skeleton className='h-3 w-full rounded' />
              <Skeleton className='h-3 w-4/5 rounded' />
            </div>
          </>
        ) : (
          <p className='line-clamp-2 font-artegra text-sm font-semibold'>
            {data?.title || hostname}
          </p>
        )}

        {!loading && data?.description && (
          <p className='mt-2 line-clamp-3 font-nt-somic text-xs leading-5 text-muted-foreground'>
            {data.description}
          </p>
        )}

        {!loading && !data && (
          <p className='mt-2 font-nt-somic text-xs text-muted-foreground'>
            {t('preview.external')}
          </p>
        )}

        {loading ? (
          <Skeleton className='mt-3 h-4 w-3/5 rounded' />
        ) : (
          <p className='mt-3 truncate font-nt-somic text-[11px] text-muted-foreground'>
            {hostname}
            {address.pathname === '/' ? '' : address.pathname}
          </p>
        )}
      </div>
    </div>
  )
}
