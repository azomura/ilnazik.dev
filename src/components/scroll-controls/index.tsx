import { usePageScroll } from '@/hooks/use-page-scroll'

import { ScrollTopButton } from './scroll-top-button'
import { Scrollbar } from './scrollbar'

export function ScrollControls() {
  const { rootRef, trackRef, scrolling, showTop, scrollable, stopScrolling } = usePageScroll()

  return (
    <div ref={rootRef} className='contents'>
      <Scrollbar
        trackRef={trackRef}
        visible={scrolling}
        enabled={scrollable}
        onRelease={stopScrolling}
      />
      <ScrollTopButton visible={showTop} />
    </div>
  )
}
