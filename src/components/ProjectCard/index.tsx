import { ProjectEntity } from '@/modules/project/domain/entity'

import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/Button'
import { ButtonTechnology } from '@/components/ButtonTechnology'

type ProjectCardProps = {
  project: ProjectEntity
  setProject: Dispatch<SetStateAction<ProjectEntity | undefined>>
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  setActualImage: Dispatch<SetStateAction<string | undefined>>
}

function ProjectCard({
  project,
  setProject,
  setModalIsOpen,
  setActualImage,
}: ProjectCardProps) {
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
                onClick={() => {
                  setModalIsOpen(true)
                  setProject(project)
                  if (project.imageUrls) {
                    setActualImage(project.imageUrls[0])
                  }
                }}
              >
                Preview
              </Button>
            ) : undefined}
          </div>
        </div>
      </section>
    </article>
  )
}

export { ProjectCard }