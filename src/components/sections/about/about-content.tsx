import { developerProfile } from '@/config/profile'

import { HeroSpecializations } from '../hero/hero-specializations'
import { SectionHeading } from '../section-heading'

import { AboutStatistics } from './about-statistics'

export function AboutContent() {
  return (
    <div className='min-w-0'>
      <SectionHeading label='обо мне' showDot={false}>
        <span data-preview='developer' tabIndex={0} className='cursor-pointer'>
          {developerProfile.name}
        </span>
      </SectionHeading>
      <p className='mt-4 max-w-145 font-artegra text-[16px] font-normal leading-6 text-muted-foreground'>
        Привет! Я Ильназ — fullstack-разработчик с более чем 5-летним опытом. Здесь делюсь своими
        проектами, рассказываю о стеке и помогаю воплощать идеи в удобные сайты, приложения и
        сервисы.
      </p>
      <HeroSpecializations />
      <AboutStatistics />
    </div>
  )
}
