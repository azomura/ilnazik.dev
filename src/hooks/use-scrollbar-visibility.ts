import { useState, type TransitionEvent } from 'react'

type ScrollbarPhase = 'scroll' | 'edge-open' | 'edge-closing' | 'edge-hidden'

export function useScrollbarVisibility(scrolling: boolean) {
  const [state, setState] = useState({ phase: 'scroll' as ScrollbarPhase, scrolling })
  const phase = scrolling && !state.scrolling ? 'scroll' : state.phase

  if (scrolling !== state.scrolling) setState({ phase, scrolling })

  const setPhase = (next: ScrollbarPhase) => setState(previous => ({ ...previous, phase: next }))

  const close = () => setPhase('edge-closing')
  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'translate') return
    if (phase === 'edge-closing') setPhase('edge-hidden')
  }

  return {
    phase,
    close,
    onTransitionEnd,
    edgeProps: {
      onPointerEnter: () => setPhase('edge-open'),
      onPointerLeave: () =>
        setPhase(phase === 'edge-open' ? 'edge-closing' : phase)
    }
  }
}
