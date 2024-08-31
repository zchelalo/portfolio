import { ProjectEntity } from '@/modules/project/domain/entity'
import { MemoryRepository } from '@/modules/project/infrastructure/repositories/memory'
import { ProjectUseCase } from '@/modules/project/application/use_cases/project'

import { useEffect, useState } from 'react'

import { IconTechnology } from '@/modules/project/ui/components/IconTechnology'
import { Button } from '@/components/Button'

import { HiOutlineCodeBracket  } from 'react-icons/hi2'

const projectRepository = new MemoryRepository()
const projectUseCase = new ProjectUseCase(projectRepository)

function Project() {
  const [projects, setProjects] = useState<ProjectEntity[]>()

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsObtained = await projectUseCase.getProjects(0, 5)
      setProjects(projectsObtained)
    }

    fetchProjects()
  }, [])

  return (
    <section id='projects' className='w-full flex flex-col justify-center mt-24'>
      <header className='flex items-center'>
        <HiOutlineCodeBracket  className='text-2xl text mr-2' />
        <h1 className='text-2xl text font-medium'>Projects</h1>
      </header>
      <main className='w-full flex justify-center'>
        {projects?.map(project => (
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
                    <IconTechnology key={technology.id} technology={technology.name} />
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
        ))}
      </main>
    </section>
  )
}

export { Project }