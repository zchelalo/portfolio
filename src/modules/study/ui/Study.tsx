import { Section } from '@/constants'

import { SectionLayout } from '@/components/SectionLayout'

import { HiOutlineAcademicCap } from 'react-icons/hi2'

function Study() {
  return (
    <SectionLayout
      icon={HiOutlineAcademicCap}
      title='Studies'
      id={Section.STUDIES}
    >
      <main>
        <div className='rounded bg text border-2 border-violet-900 flex flex-wrap justify-between items-center p-2 mt-4'>
          <div className='flex flex-col'>
            <h2 className='font-semibold'>CECyTES</h2>
            <span>Programming Technician</span>
          </div>
          <span>
            2018 - 2021
          </span>
        </div>
        <div className='rounded bg text border-2 border-violet-900 flex flex-wrap justify-between items-center p-2 mt-4'>
          <div className='flex flex-col'>
            <h2 className='font-semibold'>Universidad Tecnológica de Nogales</h2>
            <span>Higher University Technician in Information Technologies</span>
          </div>
          <span>
            2021 - 2023
          </span>
        </div>
        <div className='rounded bg text border-2 border-violet-900 flex flex-wrap justify-between items-center p-2 mt-4'>
          <div className='flex flex-col'>
            <h2 className='font-semibold'>Universidad Tecnológica de Nogales</h2>
            <span>Engineer in Multiplatform Software Development and Management</span>
          </div>
          <span>
            2023 - 2025
          </span>
        </div>
      </main>
    </SectionLayout>
  )
}

export { Study }