import { IconType } from 'react-icons'

import { Button } from '@/components/Button'

import { HiOutlineClipboardCopy } from 'react-icons/hi'

type SocialMediaProps = {
  onClick: (url: string) => void
  socialMedia: string
  icon: IconType
}

function SocialMedia({
  onClick,
  socialMedia,
  icon
}: SocialMediaProps) {
  return (
    <article className='flex items-stretch rounded border-2 border-violet-900 dark:border-violet-300 mt-2 mr-2'>
      <Button
        type='button'
        className='bg px-3 mr-1'
        onClick={() => onClick(socialMedia)}
      >
        {icon({ title: socialMedia })}
      </Button>
      <Button
        type='button'
        className='bg px-3 mr-1'
        onClick={() => navigator.clipboard.writeText(socialMedia)}
      >
        <HiOutlineClipboardCopy />
      </Button>
      <div className='flex-grow rounded p-2 bg text'>
        {socialMedia}
      </div>
    </article>
  )
}

export { SocialMedia }