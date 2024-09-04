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
      <article className='w-full flex rounded text mt-4'>
        <header className='w-2/6 flex flex-col justify-between text-pretty'>
          <div>
            <h2 className='text-lg font-medium'>{workExperience.company}</h2>
            <span>{moment(workExperience.startDate).utc(true).format('MMMM YYYY')} - {workExperience.endDate ? moment(workExperience.endDate).utc(true).format('MMMM YYYY') : 'Present'}</span>
          </div>
          <span className='font-medium'>
            {workExperience.position}
          </span>
        </header>
        <main className='flex flex-col w-4/6 text-pretty pl-2'>
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