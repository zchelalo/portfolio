import { ProjectEntity } from '@/modules/project/domain/entity'

import { useState } from 'react'

import { Button } from '@/components/Button'
import { ButtonTechnology } from '@/components/ButtonTechnology'
import { Modal } from '@/components/Modal'

import {
  HiOutlineArrowSmallLeft,
  HiOutlineArrowSmallRight
} from 'react-icons/hi2'

type ProjectCardProps = {
  project: ProjectEntity
}

function ProjectCard({
  project
}: ProjectCardProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [actualImage, setActualImage] = useState(project.imageUrls?.[0])
  const [isFading, setIsFading] = useState(false)

  const nextImage = () => {
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
    <article className='w-full rounded bg flex flex-col sm:flex-row justify-center p-4'>
      <img
        src={project.previewUrl || ''}
        alt={project.title}
        className='w-full sm:w-1/2 rounded object-cover'
      />
      <section className='w-full sm:w-1/2 flex flex-col justify-between sm:pl-4 mt-2 sm:mt-0 text'>
        <div className='flex flex-col mb-2'>
          <h2 className='text-lg font-medium'>
            {project.title}
          </h2>
          <p className='text-pretty'>
            {project.description}
          </p>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex flex-wrap items-center'>
            {project.technologies.map(technology => (
              <ButtonTechnology
                key={technology.id}
                technology={technology.name}
              />
            ))}
          </div>
          <div className=''>
            {project.sourceCodeUrl ? (
              <Button
                type='button'
                className='mt-4 mr-1 bg-hover-secondary'
                onClick={() => window.open(project.sourceCodeUrl)}
              >
                Source code
              </Button>
            ): undefined}
            {project.imageUrls ? (
              <Button
                type='button'
                className='mt-4 bg-hover-secondary'
                onClick={() => setModalIsOpen(true)}
              >
                Preview
              </Button>
            ) : undefined}
          </div>
        </div>
      </section>

      <Modal className={`${modalIsOpen ? 'modal-open' : 'modal-closed'}`}>
        {project.imageUrls && (
          <div className='w-11/12 max-h-[80dvh] rounded bg text relative flex flex-col items-center justify-center p-4'>
            <img
              src={actualImage}
              alt={project.title}
              className={`w-full h-auto rounded select-none ${isFading ? 'opacity-80' : 'opacity-100'}`}
              onLoad={() => setIsFading(false)}
            />
            <HiOutlineArrowSmallLeft onClick={prevImage} className='absolute left-6 bg text text-2xl rounded cursor-pointer' />
            <HiOutlineArrowSmallRight onClick={nextImage} className='absolute right-6 bg text text-2xl rounded cursor-pointer' />
          </div>
        )}
      </Modal>
    </article>
  )
}

export { ProjectCard }