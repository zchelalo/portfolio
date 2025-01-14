import { IconType } from 'react-icons'

import { Button } from '@/components/Button'

import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { HiArrowDownTray } from 'react-icons/hi2'

type SocialMediaProps = {
  onClick: (url: string) => void
  fileToUpload?: string
  socialMedia: string
  icon: IconType
}

function SocialMedia({
  onClick,
  fileToUpload,
  socialMedia,
  icon
}: SocialMediaProps) {
  const downloadFile = (url: string): void => {
    const link = document.createElement('a')
    link.href = url

    const fileName = url.split('/').pop()
    if (!fileName) return
    link.download = fileName

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <article className='flex items-stretch rounded border-2 border-violet-900 dark:border-violet-300 mt-2 mr-2'>
      <Button
        type='button'
        className='bg sm:px-3 mr-1 text-lg'
        onClick={() => onClick(socialMedia)}
      >
        {icon({ title: socialMedia })}
      </Button>
      {fileToUpload ? (
        <Button
          type='button'
          className='bg sm:px-3 mr-1 text-lg'
          onClick={() => {
            downloadFile(fileToUpload)
          }}
        >
          <HiArrowDownTray />
        </Button>
      ) : undefined}
      <Button
        type='button'
        className='bg sm:px-3 mr-1 text-lg'
        onClick={() => navigator.clipboard.writeText(socialMedia)}
      >
        <HiOutlineClipboardCopy />
      </Button>
      <div className='flex-grow rounded p-2 bg text text-xs sm:text-lg'>
        {socialMedia}
      </div>
    </article>
  )
}

export { SocialMedia }