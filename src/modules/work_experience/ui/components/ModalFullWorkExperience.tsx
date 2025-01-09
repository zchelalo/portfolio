import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'

import moment from 'moment'

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

import { HiOutlineXMark } from 'react-icons/hi2'

type ModalFullWorkExperienceProps = {
  modalIsOpen: boolean
  setModalIsOpen: (isOpen: boolean) => void
  workExperience: WorkExperienceEntity
}

function ModalFullWorkExperience({
  modalIsOpen,
  setModalIsOpen,
  workExperience
}: ModalFullWorkExperienceProps) {
  return (
    <Modal
      className={`${modalIsOpen ? 'modal-open' : 'modal-closed'}`}
    >
      <div className='max-w-4xl w-2/4 max-h-[80vh] rounded bg text flex flex-col p-4 overflow-y-auto'>
        <header className='w-full flex flex-wrap justify-between items-center'>
          <h3 className='text-lg font-medium'>
            {workExperience.company}
          </h3>
          <Button
            type='button'
            className='bg-hover-secondary'
            onClick={() => {
              setModalIsOpen(false)
            }}
          >
            <HiOutlineXMark />
          </Button>
        </header>
        <main>
          <p className='text-pretty text-md whitespace-pre-wrap my-4 px-4'>
            {workExperience.fullDescription}
          </p>
          <div className='flex flex-col'>
            <span className='font-medium'>
              {workExperience.position}
            </span>
            <span className='font-medium'>
              {moment(workExperience.startDate).utc(true).format('MMMM YYYY')} - {workExperience.endDate ? moment(workExperience.endDate).utc(true).format('MMMM YYYY') : 'Present'}
            </span>
          </div>
        </main>
      </div>
    </Modal>
  )
}

export { ModalFullWorkExperience }