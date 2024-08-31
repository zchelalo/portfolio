import { Section } from '@/constants'

import { useEffect, useState } from 'react'

import { HashLink as Link } from 'react-router-hash-link'

function Header() {
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
      <ul className={`p-2 my-1 flex justify-center items-center ${scrolled ? 'rounded bg' : ''}`}>
        <li className='mx-3'>
          <Link
            smooth
            to={`#${Section.ABOUT_ME}`}
            className='text-hover font-semibold'
          >
            About me
          </Link>
        </li>
        <li className='mx-3'>
          <Link
            smooth
            to={`#${Section.WORK_EXPERIENCES}`}
            className='text-hover font-semibold'
          >
            Work Experience
          </Link>
        </li>
        <li className='mx-3'>
          <Link
            smooth
            to={`#${Section.PROJECTS}`}
            className='text-hover font-semibold'
          >
            Projects
          </Link>
        </li>
        <li className='mx-3'>
          <Link
            smooth
            to={`#${Section.STUDIES}`}
            className='text-hover font-semibold'
          >
            Studies
          </Link>
        </li>
        <li className='mx-3'>
          <Link
            smooth
            to={`#${Section.SKILLS}`}
            className='text-hover font-semibold'
          >
            Skills
          </Link>
        </li>
      </ul>
    </header>
  )
}

export { Header }