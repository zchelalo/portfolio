import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'

import { firstLetterToUpperCase } from '@/utils/string'
import { NamespaceLanguage } from '@/constants'

import { useTranslation } from 'react-i18next'

import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { ProjectCard } from '@/components/ProjectCard'

import { HiOutlineXMark } from 'react-icons/hi2'

type ModalSkillsUsedProps = {
  skill: SkillEntity | null
  projects: ProjectEntity[]
  modalIsOpen: boolean
  setSelectedSkill: (skill: SkillEntity | null) => void
  setProjects: (projects: ProjectEntity[]) => void
  setModalIsOpen: (isOpen: boolean) => void
}

function ModalSkillsUsed({
  skill,
  projects,
  modalIsOpen,
  setSelectedSkill,
  setProjects,
  setModalIsOpen
}: ModalSkillsUsedProps) {
  const { t } = useTranslation(NamespaceLanguage.COMMON)

  return (
    <Modal
      className={`${modalIsOpen ? 'modal-open' : 'modal-closed'}`}
    >
      {modalIsOpen && skill && projects ? (
        <div className='sm:max-w-4xl w-10/12 sm:w-3/4 lg:w-2/4 max-h-[80dvh] rounded bg text flex flex-col p-4 overflow-y-auto'>
          <header className='w-full flex justify-between items-center'>
            <h3 className='text-lg font-medium'>
              {t('project_that_i_have_done_with')} {firstLetterToUpperCase(skill.name)}
            </h3>
            <Button
              type='button'
              className='bg-hover-secondary'
              onClick={() => {
                setModalIsOpen(false)
                setSelectedSkill(null)
                setProjects([])
              }}
            >
              <HiOutlineXMark />
            </Button>
          </header>
          <main className='flex flex-col justify-center items-center'>
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </main>
        </div>
      ) : undefined}
    </Modal>
  )
}

export { ModalSkillsUsed }