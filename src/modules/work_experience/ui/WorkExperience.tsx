import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'
import { WorkExperienceUseCase } from '@/modules/work_experience/application/use_cases/work_experience'
import { MemoryRepository } from '@/modules/work_experience/infrastructure/repositories/memory'

import { useEffect, useState } from 'react'

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
    <section id='work_experiences' className='w-full flex flex-col justify-center mt-24'>

      <header className='flex items-center'>
        <HiOutlineBriefcase className='text-2xl text mr-2' />
        <h1 className='text-2xl text font-medium'>Work experiences</h1>
      </header>

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

    </section>
  )
}

export { WorkExperience }