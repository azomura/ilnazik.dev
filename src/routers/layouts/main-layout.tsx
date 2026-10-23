import { Footer, Header } from '@/components/layout'

import { Outlet } from 'react-router-dom'

export function MainLayout() {
  return (
    <div className='flex min-h-svh flex-col'>
      <Header />
      <main className='flex min-w-0 flex-1 flex-col overflow-x-clip pt-28 pb-12 lg:pt-36 lg:pb-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
