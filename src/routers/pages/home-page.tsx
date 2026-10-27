import {
  About,
  Hero,
  ProjectRequest,
  Projects,
  Reviews,
  Services,
  Stack
} from '@/components/sections'

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Services />
      <Projects />
      <ProjectRequest />
      <Reviews />
    </>
  )
}
