import { useTechnology } from '@/hooks/useTechnology'

import { Technology } from '@/constants'

type ButtonTechnologyProps = {
  technology: Technology
  clickable?: boolean
  onClick?: () => void
}

function ButtonTechnology({
  technology,
  clickable = false,
  onClick
}: ButtonTechnologyProps) {
  const { technologyData } = useTechnology()

  return (
    <button
      type='button'
      className={`rounded flex justify-center items-center p-1 mr-1 mt-1 ${clickable ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-default'}`}
      style={{
        color: technologyData[technology].textColor,
        backgroundColor: technologyData[technology].backgroundColor
      }}
      onClick={onClick}
    >
      {technologyData[technology].icon({ title: technologyData[technology].name })}
      <span className='text-xs ml-1'>{technologyData[technology].name}</span>
    </button>
  )
}

export { ButtonTechnology }