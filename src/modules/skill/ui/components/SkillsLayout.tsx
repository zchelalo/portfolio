import { SkillEntity } from '@/modules/skill/domain/entity'

import { SkillLevel } from '@/constants'

import { ButtonTechnology } from '@/components/ButtonTechnology'

type SkillsLayoutProps = {
  level: SkillLevel
  skills: SkillEntity[]
}

function SkillsLayout({
  level,
  skills
}: SkillsLayoutProps) {
  return (
    <section className='w-full flex flex-col mt-4'>
      <h2 className='text text-xl font-medium'>{level}</h2>
      <div className='w-full flex flex-wrap items-center'>
        {skills?.map(skill => (
          <ButtonTechnology key={skill.id} technology={skill.name} />
        ))}
      </div>
    </section>
  )
}

export { SkillsLayout }