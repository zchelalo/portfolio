import { Section } from '@/constants'

import { SectionLayout } from '@/components/SectionLayout'

import { MdOutlineWeb } from 'react-icons/md'

function Skill() {
  return (
    <SectionLayout
      title='Skills'
      icon={MdOutlineWeb}
      id={Section.SKILLS}
    >
      <main>
        Skills
      </main>
    </SectionLayout>
  )
}

export { Skill }