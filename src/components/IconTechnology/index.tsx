import { Technology } from '@/constants'
import { useTechnology } from '@/components/IconTechnology/hooks/useTechnology'

type IconTechnologyProps = {
  technology: Technology
}

function IconTechnology({
  technology
}: IconTechnologyProps) {
  const { technologyData } = useTechnology()

  return (
    <div
      className='rounded flex justify-center items-center p-1 mr-1 mt-1'
      style={{
        color: technologyData[technology].textColor,
        backgroundColor: technologyData[technology].backgroundColor
      }}
    >
      {technologyData[technology].icon({ title: technologyData[technology].name })}
      <span className='text-xs ml-1'>{technologyData[technology].name}</span>
    </div>
  )
}

export { IconTechnology }