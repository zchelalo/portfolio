import { SkillEntity } from '@/modules/skill/domain/entity'
import { MemoryRepository } from '@/modules/skill/infrastructure/repositories/memory'
import { SkillUseCase } from '@/modules/skill/application/use_cases/skill'

import { useEffect, useState } from 'react'

import { Section, SkillLevel } from '@/constants'

import { SkillsLayout } from '@/modules/skill/ui/components/SkillsLayout'
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
        {basicSkills ? (
          <SkillsLayout
            level={SkillLevel.BASIC}
            skills={basicSkills}
          />
        ) : undefined}
        {intermedieteSkills ? (
          <SkillsLayout
            level={SkillLevel.INTERMEDIATE}
            skills={intermedieteSkills}
          />
        ) : undefined}
        {advancedSkills ? (
          <SkillsLayout
            level={SkillLevel.ADVANCED}
            skills={advancedSkills}
          />
        ) : undefined}
      </main>
    </SectionLayout>
  )
}

export { Skill }