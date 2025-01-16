import { AboutMeEntity } from '@/modules/about_me/domain/entity'
import { AboutMeUseCase } from '@/modules/about_me/application/use_cases/work_experience'
import { MemoryRepository } from '@/modules/about_me/infrastructure/repositories/memory'

import { NamespaceLanguage, Section } from '@/constants'

import { i18next } from '@/config/i18n'

import { useEffect, useState } from 'react'
import { useSocialMedia } from '@/modules/about_me/ui/hooks/useSocialMedia'
import { useTranslation } from 'react-i18next'

import { SocialMedia } from '@/modules/about_me/ui/components/SocialMedia'
import { Typewriter } from 'react-simple-typewriter'

import '@/modules/about_me/ui/css/AboutMe.css'

const aboutMeRepository = new MemoryRepository()
const aboutMeUseCase = new AboutMeUseCase(aboutMeRepository)

function AboutMe() {
  const { t } = useTranslation(NamespaceLanguage.ABOUT_ME)
  const { socialMediaFuncs } = useSocialMedia()

  const [aboutMe, setAboutMe] = useState<AboutMeEntity>()

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        const aboutMe = await aboutMeUseCase.getAboutMe()
        setAboutMe(aboutMe)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAboutMe()
  }, [i18next.language])

  return (
    <section id={Section.ABOUT_ME} className='w-full flex flex-col justify-center mt-24'>
      {aboutMe ?
        <>
          <section className='flex items-center'>
            <img
              src={aboutMe.pfpUrl}
              alt='Profile picture'
              className='rounded-full w-28 h-28 sm:w-32 sm:h-32 shadow-md'
            />
            <h1 className='ml-4 text text-2xl sm:text-4xl presentation-h1'>
              <Typewriter
                words={[t('ui.presentation_one'), t('ui.presentation_two')]}
                loop={true}
                cursor
                cursorStyle='_'
                typeSpeed={90}
                deleteSpeed={45}
                delaySpeed={1000}
              />
            </h1>
          </section>
          <section className='text-base sm:text-lg text-secondary mt-3'>
            <p className='text text-pretty'>
              {aboutMe.personalStatement}
            </p>
            <div className='flex flex-wrap justify-start items-center mt-1'>
              {aboutMe.socialMedia.map(sm => (
                <SocialMedia
                  key={sm.id}
                  onClick={socialMediaFuncs[sm.type].onClick}
                  icon={socialMediaFuncs[sm.type].icon}
                  socialMedia={sm.url}
                  fileToUpload={sm.fileToUpload}
                />
              ))}
            </div>
          </section>
        </>
      : <p>Loading...</p>}
    </section>
  )
}

export { AboutMe }