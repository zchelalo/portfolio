import { StudyEntity } from '@/modules/study/domain/entity'
import { MemoryRepository } from '@/modules/study/infrastructure/repositories/memory'
import { StudyUseCase } from '@/modules/study/application/use_cases/study'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import moment from 'moment'

import { i18next } from '@/config/i18n'

import { NamespaceLanguage, Section } from '@/constants'

import { SectionLayout } from '@/components/SectionLayout'

import { HiOutlineAcademicCap } from 'react-icons/hi2'

const studyRepository = new MemoryRepository()
const studyUseCase = new StudyUseCase(studyRepository)

function Study() {
  const { t } = useTranslation(NamespaceLanguage.HEADER)
  const [studies, setStudies] = useState<StudyEntity[]>([])

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const studiesObtained = await studyUseCase.getStudies(0, 5)
        setStudies(studiesObtained)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStudies()
  }, [i18next.language])

  return (
    <SectionLayout
      icon={HiOutlineAcademicCap}
      title={t('ui.studies')}
      id={Section.STUDIES}
    >
      <main>
        {studies.map(study => (
          <div key={study.id} className='rounded bg text border-2 border-blue-900 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center p-2 mt-4'>
            <div className='flex flex-col'>
              <h2 className='font-semibold'>{study.institution}</h2>
              <span>{study.career}</span>
            </div>
            <span>
              {moment(study.startDate).utc(true).format('YYYY')} - {moment(study.endDate).utc(true).format('YYYY')}
            </span>
          </div>
        ))}
      </main>
    </SectionLayout>
  )
}

export { Study }