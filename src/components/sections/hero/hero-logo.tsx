import { useId } from 'react'

import { Logo } from '@/components/icons/logo'

export function HeroLogo() {
  const logoId = useId()

  return (
    <div className='pointer-events-none mx-auto hidden w-full select-none md:block'>
      <svg viewBox='0 0 375 393' className='h-auto w-full opacity-50' focusable='false'>
        <defs>
          <mask
            id={`${logoId}-mask`}
            maskUnits='userSpaceOnUse'
            x={0}
            y={0}
            width={375}
            height={393}
          >
            <Logo size='100%' fill='white' fillOpacity={1} className='h-full w-full' />
          </mask>
          <radialGradient
            id={`${logoId}-gradient`}
            cx={0}
            cy={0}
            r={1}
            gradientTransform='matrix(0.484 -0.056 0.063 0.614 0.605 0.502)'
          >
            <stop offset='0%' stopColor='#e83d40' stopOpacity={0.56} />
            <stop offset='100%' stopColor='#e83d40' stopOpacity={0.07} />
          </radialGradient>
        </defs>
        <rect
          width={375}
          height={393}
          fill={`url(#${logoId}-gradient)`}
          mask={`url(#${logoId}-mask)`}
        />
      </svg>
    </div>
  )
}
