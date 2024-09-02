import { useTheme } from '@/hooks/useTheme'

import { Theme } from '@/constants'

import { Button } from '@/components/Button'
import { Header } from '@/components/Layout/components/Header'

import { HiOutlineMoon } from 'react-icons/hi2'
import { HiOutlineSun } from 'react-icons/hi2'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const { theme, changeTheme } = useTheme()

  return (
    <div className='bg-indigo-200 dark:bg-indigo-950 min-h-screen'>
      <div className='relative flex flex-col min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Header />
        <div className='flex-grow py-16'>
          {children}
        </div>
        <div className='sticky bottom-4'>
          <Button
            type='button'
            onClick={() => changeTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
          >
            {theme === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export { Layout }
