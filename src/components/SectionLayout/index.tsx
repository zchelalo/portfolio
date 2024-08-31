import { Section } from '@/constants'
import { IconType } from 'react-icons'

type SectionLayoutProps = {
  children: React.ReactNode
  icon: IconType
  title: string
  id: Section
}

function SectionLayout({
  children,
  icon,
  title,
  id
}: SectionLayoutProps) {
  return (
    <section id={id} className='w-full flex flex-col justify-center mt-24'>

      <header className='flex items-center'>
        <span className='text-2xl text mr-2'>
          {icon({ title })}
        </span>
        <h1 className='text-2xl text font-medium'>{title}</h1>
      </header>

      {children}

    </section>
  )
}

export { SectionLayout }