import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'
import { WorkExperienceUseCase } from '@/modules/work_experience/application/use_cases/work_experience'
import { MemoryRepository } from '@/modules/work_experience/infrastructure/repositories/memory'

import { Section } from '@/constants'

import { useEffect, useState } from 'react'

import { SectionLayout } from '@/components/SectionLayout'
import { Work } from '@/modules/work_experience/ui/components/Work'

import { HiOutlineBriefcase } from 'react-icons/hi2'

const workExperienceRepository = new MemoryRepository()
const workRepositoryUseCase = new WorkExperienceUseCase(workExperienceRepository)

function WorkExperience() {
  const [workExperiences, setWorkExperiences] = useState<WorkExperienceEntity[]>([])

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const workExperiences = await workRepositoryUseCase.getWorkExperiences(0, 3)
        setWorkExperiences(workExperiences)
      } catch (error) {
        console.error(error)
      }
    }

    fetchWorkExperiences()
  }, [])

  return (
    <SectionLayout
      icon={HiOutlineBriefcase}
      title='Work experiences'
      id={Section.WORK_EXPERIENCES}
    >
      <main className='flex flex-col justify-center'>
        {workExperiences.map(workExperience => (
          <Work
            key={workExperience.id}
            company={workExperience.company}
            position={workExperience.position}
            description={workExperience.description}
            startDate={workExperience.startDate}
            endDate={workExperience.endDate || 'Present'}
          />
        ))}
      </main>
    </SectionLayout>
  )
}

export { WorkExperience }