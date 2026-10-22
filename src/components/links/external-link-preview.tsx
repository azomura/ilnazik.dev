import { useState } from 'react'

import { ExternalLink, Globe, LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { LinkPreviewV1Dto } from '@/services/api/models'

interface IExternalLinkPreviewProps {
  url: string
  data: LinkPreviewV1Dto | null
  loading: boolean
}

export function ExternalLinkPreview({ url, data, loading }: IExternalLinkPreviewProps) {
  const [failedImage, setFailedImage] = useState<string | null>(null)

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
      {image && image !== failedImage && (
        <img
          src={image}
          alt=''
          loading='lazy'
          referrerPolicy='no-referrer'
          onError={() => setFailedImage(image)}
          className='aspect-[1.91/1] w-full object-cover'
        />
      )}

      <div className='p-3'>
        <div className='mb-2 flex items-center gap-2 text-muted-foreground'>
          <Globe className='size-3.5 shrink-0' />
          <span className='truncate font-nt-somic text-xs'>{data?.siteName || hostname}</span>
          <ExternalLink className='ml-auto size-3.5 shrink-0' />
        </div>
        <p className='line-clamp-2 font-artegra text-sm font-semibold'>{data?.title || hostname}</p>

        {data?.description && (
          <p className='mt-2 line-clamp-3 font-nt-somic text-xs leading-5 text-muted-foreground'>
            {data.description}
          </p>
        )}

        {loading && (
          <p className='mt-3 flex items-center gap-2 font-nt-somic text-xs text-muted-foreground'>
            <LoaderCircle className='size-3 animate-spin motion-reduce:animate-none' />
            Загружаем информацию…
          </p>
        )}

        {!loading && !data && (
          <p className='mt-2 font-nt-somic text-xs text-muted-foreground'>
            Перейти на внешний сайт
          </p>
        )}

        <p className='mt-3 truncate font-nt-somic text-[11px] text-muted-foreground'>
          {hostname}
          {address.pathname === '/' ? '' : address.pathname}
        </p>
      </div>
    </div>
  )
}
