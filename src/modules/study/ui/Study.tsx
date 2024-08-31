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
        <h1>Study</h1>
      </main>
    </SectionLayout>
  )
}

export { Study }