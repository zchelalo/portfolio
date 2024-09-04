import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

import { HiOutlineXMark } from 'react-icons/hi2'

type ModalFullWorkExperienceProps = {
  setModalIsOpen: (isOpen: boolean) => void
  workExperience: WorkExperienceEntity
}

function ModalFullWorkExperience({
  setModalIsOpen,
  workExperience
}: ModalFullWorkExperienceProps) {
  return (
    <Modal>
      <div className='max-w-4xl w-2/3 max-h-[80vh] rounded bg text flex flex-col p-4'>
        <header className='w-full flex flex-wrap justify-between items-center'>
          <h3 className='text-lg font-medium'>
            Full Experience
          </h3>
          <Button
            type='button'
            className='bg-hover-secondary'
            onClick={() => {
              setModalIsOpen(false)
              console.log(workExperience)
            }}
          >
            <HiOutlineXMark />
          </Button>
        </header>
      </div>
    </Modal>
  )
}

export { ModalFullWorkExperience }