import { NamespaceLanguage, Section } from '@/constants'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { HashLink as Link } from 'react-router-hash-link'

function Header() {
  const { t } = useTranslation(NamespaceLanguage.HEADER)

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className='w-full p-2 fixed top-0 left-0 flex flex-col justify-center items-center'
    >
      <ul className={`p-2 my-1 flex justify-center items-center ${scrolled ? 'rounded bg' : ''} transition duration-300`}>
        <li className='mx-3'>
          <Link
            smooth
            to={`/#${Section.ABOUT_ME}`}
            className='text-hover font-semibold'
          >
            {t('ui.about_me')}
          </Link>
        </li>
        <li className='mx-3'>
          <Link
            smooth
            to={`/#${Section.WORK_EXPERIENCES}`}
            className='text-hover font-semibold'
          >
            {t('ui.work_experieces')}
          </Link>
        </li>
        <li className='mx-3'>
          <Link
            smooth
            to={`/#${Section.PROJECTS}`}
            className='text-hover font-semibold'
          >
            {t('ui.projects')}
          </Link>
        </li>
        <li className='mx-3'>
          <Link
            smooth
            to={`/#${Section.STUDIES}`}
            className='text-hover font-semibold'
          >
            {t('ui.studies')}
          </Link>
        </li>
        <li className='mx-3'>
          <Link
            smooth
            to={`/#${Section.SKILLS}`}
            className='text-hover font-semibold'
          >
            {t('ui.skills')}
          </Link>
        </li>
      </ul>
    </header>
  )
}

export { Header }