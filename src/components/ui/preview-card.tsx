import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface IPreviewCardContentProps {
  children: ReactNode
  anchor?: HTMLElement | null
  keepMounted?: boolean
}

function PreviewCardContent({ children, anchor, keepMounted = false }: IPreviewCardContentProps) {
  return (
    <PreviewCardPrimitive.Portal keepMounted={keepMounted}>
      <PreviewCardPrimitive.Positioner anchor={anchor} sideOffset={10} side='top' align='start' className='z-100'>
        <PreviewCardPrimitive.Popup
          className={cn(
            'outline-none transition-opacity duration-100',
            'data-starting-style:opacity-0',
            'data-ending-style:opacity-0 motion-reduce:transition-none'
          )}
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export const PreviewCard = {
  createHandle: PreviewCardPrimitive.createHandle,
  Root: PreviewCardPrimitive.Root,
  Trigger: PreviewCardPrimitive.Trigger,
  Content: PreviewCardContent
}
