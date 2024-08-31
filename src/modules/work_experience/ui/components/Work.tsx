import moment from 'moment'

import { Button } from '@/components/Button'

type WorkProps = {
  onClick?: () => void
  company: string
  position: string
  description: string
  startDate: string
  endDate: string
}

function Work({
  onClick,
  company,
  position,
  description,
  startDate,
  endDate
}: WorkProps) {
  return (
    <>
      <hr className='mt-4 border-violet-900' />
      <article className='w-full flex rounded text mt-4'>
        <header className='w-2/6 flex flex-col justify-between text-pretty'>
          <div>
            <h2 className='text-lg font-medium'>{company}</h2>
            <span>{moment(startDate).utc(true).format('MMMM YYYY')} - {endDate}</span>
          </div>
          <span className='font-medium'>
            {position}
          </span>
        </header>
        <main className='flex flex-col w-4/6 text-pretty pl-2'>
          <p>
            {description}
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