import { useRef } from 'react'

import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { Language } from '@/interfaces/providers/i18n'

import { languages } from '@/config/appearance'

import { useScrollEdges } from '@/hooks/scroll/use-scroll-edges'

import { cn } from '@/lib/utils'

interface IToolbarLanguagesProps {
  value: Language
  onSelect: (language: Language) => void
}

export function ToolbarLanguages({ value, onSelect }: IToolbarLanguagesProps) {
  const ref = useRef<HTMLUListElement>(null)

  const { start, end } = useScrollEdges(ref)

  return (
    <div className='min-h-0 overflow-hidden'>
      <div className='pb-1.5'>
        <ul
          ref={ref}
          className={cn(
            'flex min-w-41 flex-col gap-1.5 overflow-y-auto overscroll-y-contain rounded-[10px]',
            'max-h-[min(10rem,calc(100dvh-8rem))]',
            start && 'mask-t-from-[calc(100%-1.5rem)] mask-t-to-100%',
            end && 'mask-b-from-[calc(100%-1.5rem)] mask-b-to-100%'
          )}
        >
          {languages.map(item => (
            <li key={item.code}>
              <Button
                variant='ghost'
                onClick={() => onSelect(item.code)}
                className={cn(
                  'h-9 w-full justify-between gap-2 rounded-[10px] px-2 font-nt-somic text-[14px]',
                  value === item.code && 'text-primary'
                )}
              >
                <span className='flex min-w-0 items-center gap-2'>
                  <span
                    className={cn(
                      "font-['Apple_Color_Emoji','Segoe_UI_Emoji','Noto_Color_Emoji']",
                      'shrink-0 text-[20px]'
                    )}
                  >
                    {item.flag}
                  </span>
  
                  <span className='truncate'>{item.label}</span>
                </span>
  
                <Check className={cn('size-3.5', value !== item.code && 'opacity-0')} />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
