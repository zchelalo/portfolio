import { useTechnology } from '@/hooks/useTechnology'

import { Technology } from '@/constants'

import { NavLink } from 'react-router-dom'

type ButtonTechnologyProps = {
  technology: Technology
}

function ButtonTechnology({
  technology
}: ButtonTechnologyProps) {
  const { technologyData } = useTechnology()

  return (
    <NavLink
      to={`/skills/${technology}`}
      className='rounded flex justify-center items-center p-1 mr-1 mt-1 cursor-pointer hover:scale-105 transition-transform'
      style={{
        color: technologyData[technology].textColor,
        backgroundColor: technologyData[technology].backgroundColor
      }}
    >
      {technologyData[technology].icon({ title: technologyData[technology].name })}
      <span className='text-xs ml-1'>{technologyData[technology].name}</span>
    </NavLink>
  )
}

export { ButtonTechnology }