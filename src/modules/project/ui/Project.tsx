import { ProjectEntity } from '@/modules/project/domain/entity'
import { MemoryRepository } from '@/modules/project/infrastructure/repositories/memory'
import { ProjectUseCase } from '@/modules/project/application/use_cases/project'

import { NamespaceLanguage, Section } from '@/constants'

import { i18next } from '@/config/i18n'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SectionLayout } from '@/components/SectionLayout'
import { ProjectCard } from '@/components/ProjectCard'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'

import {
  HiOutlineArrowSmallLeft,
  HiOutlineArrowSmallRight,
  HiOutlineXMark,
  HiOutlineCodeBracket
} from 'react-icons/hi2'

const projectRepository = new MemoryRepository()
const projectUseCase = new ProjectUseCase(projectRepository)

function Project() {
  const { t } = useTranslation(NamespaceLanguage.HEADER)
  const [projects, setProjects] = useState<ProjectEntity[]>()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [project, setProject] = useState<ProjectEntity>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [actualImage, setActualImage] = useState<string>()
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsObtained = await projectUseCase.getProjects(0, 5)
      setProjects(projectsObtained)
    }

    fetchProjects()
  }, [i18next.language])

  const nextImage = () => {
    if (!project) return

    const urls = project.imageUrls
    if (!urls) return

    setIsFading(true)
    const nextIndex = currentIndex < urls.length - 1 ? currentIndex + 1 : 0
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setActualImage(urls[nextIndex]);
    }, 150)
  }

  const prevImage = () => {
    if (!project) return

    const urls = project.imageUrls
    if (!urls) return

    setIsFading(true)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : urls.length - 1
    setTimeout(() => {
      setCurrentIndex(prevIndex);
      setActualImage(urls[prevIndex]);
    }, 150)
  }

  return (
    <SectionLayout
      icon={HiOutlineCodeBracket}
      title={t('ui.projects')}
      id={Section.PROJECTS}
    >
      <main className='w-full flex flex-col justify-center items-center'>
        {projects?.map(cardProject => (
          <div className='mt-4' key={cardProject.id}>
            <ProjectCard
              project={cardProject}
              setProject={setProject}
              setModalIsOpen={setModalIsOpen}
              setActualImage={setActualImage}
            />
          </div>
        ))}
      </main>

      <Modal className={`${modalIsOpen ? 'modal-open' : 'modal-closed'}`}>
        {project && project.imageUrls && (
          <main className='w-11/12 max-h-full rounded bg text relative flex flex-col items-center justify-center p-4 overflow-y-auto'>
            <img
              src={actualImage}
              alt={project.title}
              className={`w-full h-auto rounded select-none object-cover ${isFading ? 'opacity-80' : 'opacity-100'}`}
              onLoad={() => setIsFading(false)}
            />
            <Button
              type='button'
              className='absolute top-6 right-6 bg-hover-secondary'
              onClick={() => {
                setModalIsOpen(false)
                setIsFading(false)
                setCurrentIndex(0)
                setActualImage('')
                setProject(undefined)
              }}
            >
              <HiOutlineXMark />
            </Button>
            <Button
              type='button'
              className='absolute left-6 bg-hover-secondary'
              onClick={prevImage}
            >
              <HiOutlineArrowSmallLeft />
            </Button>
            <Button
              type='button'
              className='absolute right-6 bg-hover-secondary'
              onClick={nextImage}
            >
              <HiOutlineArrowSmallRight />
            </Button>
          </main>
        )}
      </Modal>
    </SectionLayout>
  )
}

export { Project }