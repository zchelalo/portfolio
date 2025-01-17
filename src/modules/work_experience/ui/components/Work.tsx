import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'

import moment from 'moment'

import { Button } from '@/components/Button'

type WorkProps = {
  onClick?: () => void
  workExperience: WorkExperienceEntity
}

function Work({
  onClick,
  workExperience
}: WorkProps) {
  return (
    <>
      <hr className='mt-4 border-violet-900' />
      <article className='w-full sm:flex rounded text mt-4'>
        <header className='w-full sm:w-2/6 flex flex-col justify-between text-pretty'>
          <div>
            <h2 className='text-lg font-medium'>{workExperience.company}</h2>
            <span>{moment(workExperience.startDate).utc(true).format('MM/YYYY')} - {workExperience.endDate ? moment(workExperience.endDate).utc(true).format('MM/YYYY') : 'Present'}</span>
          </div>
          <span className='font-medium'>
            {workExperience.position}
          </span>
        </header>
        <main className='flex flex-col w-full text-pretty sm:w-4/6 sm:pl-2 mt-4 sm:mt-0'>
          <p>
            {workExperience.description}
          </p>
          <div>
            <Button
              type='button'
              onClick={onClick}
              className='mt-2'
            >
              More info
            </Button>
          </div>
        </main>
      </article>
    </>
  )
}

export { Work }