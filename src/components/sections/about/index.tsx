import { Section } from '../section'

import { AboutContent } from './about-content'
import { AboutPortrait } from './about-portrait'

export function About() {
  return (
    <Section
      id='about'
      className='grid items-center gap-8 lg:grid-cols-[367px_minmax(0,1fr)] lg:gap-5'
    >
      <AboutPortrait />
      <AboutContent />
    </Section>
  )
}
