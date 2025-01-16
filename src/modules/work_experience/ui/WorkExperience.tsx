import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'
import { WorkExperienceUseCase } from '@/modules/work_experience/application/use_cases/work_experience'
import { MemoryRepository } from '@/modules/work_experience/infrastructure/repositories/memory'

import { NamespaceLanguage, Section } from '@/constants'

import { i18next } from '@/config/i18n'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SectionLayout } from '@/components/SectionLayout'
import { ModalFullWorkExperience } from '@/modules/work_experience/ui/components/ModalFullWorkExperience'
import { Work } from '@/modules/work_experience/ui/components/Work'

import { HiOutlineBriefcase } from 'react-icons/hi2'

const workExperienceRepository = new MemoryRepository()
const workRepositoryUseCase = new WorkExperienceUseCase(workExperienceRepository)

function WorkExperience() {
  const { t } = useTranslation(NamespaceLanguage.HEADER)

  const [modalIsOpen, setModalIsOpen] = useState(false)
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
  }, [i18next.language])

  return (
    <SectionLayout
      icon={HiOutlineBriefcase}
      title={t('ui.work_experieces')}
      id={Section.WORK_EXPERIENCES}
    >
      <main className='flex flex-col justify-center'>
        {workExperiences.map(workExperience => (
          <div
            key={workExperience.id}
            className='flex flex-col justify-center'
          >
            <ModalFullWorkExperience
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              workExperience={workExperience}
            />
            <Work
              workExperience={workExperience}
              onClick={() => setModalIsOpen(true)}
            />
          </div>
        ))}
      </main>
    </SectionLayout>
  )
}

export { WorkExperience }