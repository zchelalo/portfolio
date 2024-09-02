import { SkillEntity } from '@/modules/skill/domain/entity'
import { MemoryRepository } from '@/modules/skill/infrastructure/repositories/memory'
import { SkillUseCase } from '@/modules/skill/application/use_cases/skill'

import { useEffect, useState } from 'react'

import { Section, SkillLevel } from '@/constants'

import { IconTechnology } from '@/components/IconTechnology'
import { SectionLayout } from '@/components/SectionLayout'

import { MdOutlineWeb } from 'react-icons/md'

const skillRepository = new MemoryRepository()
const skillUseCase = new SkillUseCase(skillRepository)

function Skill() {
  const [basicSkills, setBasicSkills] = useState<SkillEntity[]>()
  const [intermedieteSkills, setIntermedieteSkills] = useState<SkillEntity[]>()
  const [advancedSkills, setAdvancedSkills] = useState<SkillEntity[]>()

  useEffect(() => {
    const fetchSkills = async () => {
      const basicSkillsObtained = await skillUseCase.getSkills(0, 50, { level: SkillLevel.BASIC })
      setBasicSkills(basicSkillsObtained)

      const intermedieteSkillsObtained = await skillUseCase.getSkills(0, 50, { level: SkillLevel.INTERMEDIATE })
      setIntermedieteSkills(intermedieteSkillsObtained)

      const advancedSkillsObtained = await skillUseCase.getSkills(0, 50, { level: SkillLevel.ADVANCED })
      setAdvancedSkills(advancedSkillsObtained)
    }

    fetchSkills()
  }, [])

  return (
    <SectionLayout
      title='Skills'
      icon={MdOutlineWeb}
      id={Section.SKILLS}
    >
      <main className='flex flex-col items-center'>
        <section className='w-full flex flex-col mt-4'>
          <h2 className='text text-xl font-medium'>Basic</h2>
          <div className='w-full flex flex-wrap items-center'>
            {basicSkills?.map(skill => (
              <IconTechnology key={skill.id} technology={skill.name} />
            ))}
          </div>
        </section>
        <section className='w-full flex flex-col mt-4'>
          <h2 className='text text-xl font-medium'>Intermediete</h2>
          <div className='w-full flex flex-wrap items-center'>
            {intermedieteSkills?.map(skill => (
              <IconTechnology key={skill.id} technology={skill.name} />
            ))}
          </div>
        </section>
        <section className='w-full flex flex-col mt-4'>
          <h2 className='text text-xl font-medium'>Advanced</h2>
          <div className='w-full flex flex-wrap items-center'>
            {advancedSkills?.map(skill => (
              <IconTechnology key={skill.id} technology={skill.name} />
            ))}
          </div>
        </section>
      </main>
    </SectionLayout>
  )
}

export { Skill }