import { NamespaceLanguage, Section } from '@/constants'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { HashLink as Link } from 'react-router-hash-link'

import { HiOutlineBars3 } from 'react-icons/hi2'

function PhoneMenu() {
  const { t } = useTranslation(NamespaceLanguage.HEADER)

  const [btnMenuHeight, setBtnMenuHeight] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const btnMenuRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (btnMenuRef.current) {
      setBtnMenuHeight(btnMenuRef.current.offsetHeight)
    }
  }, [btnMenuRef])

  return (
    <section className='bottom-0 right-0 fixed z-10 mr-4 mb-4'>
      <div
        className={`w-[50vw] bg-secondary text-secondary absolute bottom-0 right-0 rounded-lg p-2 -z-10 transition-transform duration-300 ease-in-out ${showMenu ? 'translate-y-0' : `translate-y-[120%]`}`}
        style={{
          borderBottomRightRadius: `${btnMenuHeight / 2}px`,
          paddingBottom: `${btnMenuHeight}px`
        }}
      >
        <ul className='mb-2'>
          <li className='text-base font-medium p-1 underline underline-offset-2'>
            <Link
              smooth
              to={`/#${Section.ABOUT_ME}`}
              className='text-hover font-semibold'
            >
              {t('ui.about_me')}
            </Link>
          </li>
          <li className='text-base font-medium p-1 underline underline-offset-2'>
            <Link
              smooth
              to={`/#${Section.WORK_EXPERIENCES}`}
              className='text-hover font-semibold'
            >
              {t('ui.work_experieces')}
            </Link>
          </li>
          <li className='text-base font-medium p-1 underline underline-offset-2'>
            <Link
              smooth
              to={`/#${Section.PROJECTS}`}
              className='text-hover font-semibold'
            >
              {t('ui.projects')}
            </Link>
          </li>
          <li className='text-base font-medium p-1 underline underline-offset-2'>
            <Link
              smooth
              to={`/#${Section.STUDIES}`}
              className='text-hover font-semibold'
            >
              {t('ui.studies')}
            </Link>
          </li>
          <li className='text-base font-medium p-1 underline underline-offset-2'>
            <Link
              smooth
              to={`/#${Section.SKILLS}`}
              className='text-hover font-semibold'
            >
              {t('ui.skills')}
            </Link>
          </li>
        </ul>
      </div>

      <Button
        type='button'
        ref={btnMenuRef}
        className='rounded-full p-3 shadow-lg'
        onClick={() => setShowMenu(prev => !prev)}
      >
        <HiOutlineBars3 className='text-4xl' />
      </Button>
    </section>
  )
}

export { PhoneMenu }