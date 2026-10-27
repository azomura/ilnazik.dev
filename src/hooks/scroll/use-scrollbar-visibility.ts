import { useState, type TransitionEvent } from 'react'

type ScrollbarPhase = 'scroll' | 'edge-open' | 'edge-closing' | 'edge-hidden'

export function useScrollbarVisibility(scrolling: boolean) {
  const [state, setState] = useState({
    phase: 'scroll' as ScrollbarPhase,
    scrolling,
    hovered: false
  })

  const phase = scrolling && !state.scrolling && !state.hovered ? 'scroll' : state.phase

  if (scrolling !== state.scrolling) setState({ ...state, phase, scrolling })

  const setPhase = (next: ScrollbarPhase) => setState(previous => ({ ...previous, phase: next }))

  const show = () => setState(previous => ({ ...previous, phase: 'edge-open', hovered: true }))
  const close = () => setState(previous => ({ ...previous, phase: 'edge-closing', hovered: false }))

  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'translate') return
    if (phase === 'edge-closing') setPhase('edge-hidden')
  }

  return {
    phase,
    show,
    close,
    onTransitionEnd,
    edgeProps: {
      onPointerEnter: show,
      onPointerLeave: close
    }
  }
}
