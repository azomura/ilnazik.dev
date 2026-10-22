import { Image } from '@/components/ui/image'

export function AboutPortrait() {
  return (
    <div className='relative mx-auto size-64 shrink-0 sm:size-80 lg:size-91.75'>
      <Image
        src='https://avatars.githubusercontent.com/u/319029883?v=4'
        alt=''
        width={367}
        height={367}
        loading='lazy'
        containerClassName='absolute inset-0 size-full rounded-full opacity-50 blur-[20px]'
        className='size-full rounded-full object-cover'
      />
      <Image
        src='https://avatars.githubusercontent.com/u/319029883?v=4'
        alt=''
        width={367}
        height={367}
        loading='lazy'
        containerClassName='relative size-full rounded-full'
        className='size-full rounded-full object-cover opacity-80'
      />
    </div>
  )
}
