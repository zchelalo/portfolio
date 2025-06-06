import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'

import moment from 'moment'

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

import { HiOutlineXMark } from 'react-icons/hi2'

type ModalFullWorkExperienceProps = {
  modalIsOpen: boolean
  setModalIsOpen: (isOpen: boolean) => void
  workExperience: WorkExperienceEntity | null
  setWorkExperience: (workExperience: WorkExperienceEntity | null) => void
}

function ModalFullWorkExperience({
  modalIsOpen,
  setModalIsOpen,
  workExperience,
  setWorkExperience
}: ModalFullWorkExperienceProps) {
return (
    <Modal
      className={`${modalIsOpen ? 'modal-open' : 'modal-closed'}`}
    >
      {workExperience && (
        <div className='sm:max-w-4xl w-10/12 sm:w-3/4 lg:w-2/4 max-h-[80dvh] rounded bg text flex flex-col p-4 overflow-y-auto'>
          <header className='w-full flex justify-between items-center'>
            <h3 className='text-lg font-medium'>
              {workExperience.company}
            </h3>
            <Button
              type='button'
              className='bg-hover-secondary'
              onClick={() => {
                setModalIsOpen(false)
                setWorkExperience(null)
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
                {moment(workExperience.startDate).utc(true).format('MM/YYYY')} - {workExperience.endDate ? moment(workExperience.endDate).utc(true).format('MM/YYYY') : 'Present'}
              </span>
            </div>
          </main>
        </div>
      )}
    </Modal>
  )
}

export { ModalFullWorkExperience }