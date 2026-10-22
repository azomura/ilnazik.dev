import { Outlet } from 'react-router-dom'

export function SimpleLayout() {
  return (
    <div className='relative min-h-screen h-screen overflow-hidden'>
      <Outlet />
    </div>
  )
}
