import { createPortal } from 'react-dom'

import { cn } from '@/utils/styles'

import '@/components/Modal/Modal.css'

type ModalProps = {
  children: React.ReactNode
  className?: string
}

function Modal({
  children,
  className = ''
}: ModalProps) {
  const modalRoot = document.getElementById('modal')

  return modalRoot ? createPortal(
    <div className={cn('modal-modalBackground', className)}>
      {children}
    </div>,
    modalRoot
  ) : undefined
}

export { Modal }