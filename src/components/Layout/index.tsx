import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'

import { Language, Theme } from '@/constants'

import { Toaster } from 'sonner'
import { Button } from '@/components/Button'
import { Header } from '@/components/Layout/components/Header'
import { PhoneMenu } from '@/components/Layout/components/PhoneMenu'

import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineLanguage
} from 'react-icons/hi2'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const { theme, changeTheme } = useTheme()
  const { language, changeLanguage } = useLanguage()

  return (
    <div className='bg-blue-200 dark:bg-blue-950 min-h-screen'>
      <div className='relative flex flex-col min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>

        <div className='hidden sm:flex'>
          <Header />
        </div>
        <div className='flex sm:hidden'>
          <PhoneMenu />
        </div>

        <div className='flex-grow pb-16 sm:py-16'>
          {children}
        </div>
        <div className='sticky bottom-4'>
          <Button
            type='button'
            onClick={() => changeTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
            className='shadow-lg'
          >
            {theme === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
          </Button>
          <Button
            type='button'
            onClick={() => changeLanguage(language === Language.EN ? Language.ES : Language.EN)}
            className='ml-2 shadow-lg'
          >
            <HiOutlineLanguage />
          </Button>
        </div>
        <Toaster
          closeButton={true}
          richColors={true}
          expand={true}
          theme={theme}
        />
      </div>
    </div>
  )
}

export { Layout }
