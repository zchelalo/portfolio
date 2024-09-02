import { ProjectEntity } from '@/modules/project/domain/entity'

import { Button } from '@/components/Button'
import { ButtonTechnology } from '@/components/ButtonTechnology'

type ProjectCardProps = {
  project: ProjectEntity
}

function ProjectCard({
  project
}: ProjectCardProps) {
  return (
    <article key={project.id} className='w-full rounded bg flex justify-center p-4 mt-4'>
      <img
        src='https://porfolio.dev/projects/svgl.webp'
        alt=''
        className='w-1/2 rounded'
      />
      <div className='w-1/2 flex flex-col justify-between pl-4 text'>
        <div className='flex flex-col mb-2'>
          <h2 className='text-lg font-medium'>
            {project.title}
          </h2>
          <p>
            {project.description}
          </p>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex flex-wrap items-center'>
            {project.technologies.map(technology => (
              <ButtonTechnology key={technology.id} technology={technology.name} />
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
            {project.previewUrl ? (
              <Button
                type='button'
                className='mt-4 bg-hover-secondary'
                onClick={() => window.open(project.previewUrl)}
              >
                Preview
              </Button>
            ) : undefined}
          </div>
        </div>
      </div>
    </article>
  )
}

export { ProjectCard }