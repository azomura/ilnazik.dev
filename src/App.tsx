import { Logo } from '@/components/icons/logo'
import { Header } from '@/components/layout/header'

export function App() {
  return (
    <>
      <Header />
      <main className='items-center justify-center flex min-h-svh'>
        <Logo title='Логотип портфолио' className='mb-10 size-80 from-red-500 to-orange-400' />
      </main>
    </>
  )
}
