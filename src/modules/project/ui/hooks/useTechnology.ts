import { Technology } from '@/constants'

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiDrizzle,
  SiSequelize,
  SiMongoose,
  SiJest,
  SiZod,
  SiEslint,
  SiShadcnui,
  SiTailwindcss,

  SiGo,
  SiGin,

  SiPython,
  SiFastapi,
  SiSqlalchemy,

  SiI18Next,
  SiDocker,

  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis
} from 'react-icons/si'

const technologyData = {
  [Technology.JAVASCRIPT]: {
    name: 'JavaScript',
    textColor: '#f7df1e',
    backgroundColor: '#000',
    icon: SiJavascript
  },
  [Technology.TYPESCRIPT]: {
    name: 'TypeScript',
    textColor: '#3178c6',
    backgroundColor: '#fff',
    icon: SiTypescript
  },
  [Technology.REACT]: {
    name: 'React',
    textColor: '#61dafb',
    backgroundColor: '#282c34',
    icon: SiReact
  },
  [Technology.NODE]: {
    name: 'Node.js',
    textColor: '#68a063',
    backgroundColor: '#333',
    icon: SiNodedotjs
  },
  [Technology.EXPRESS]: {
    name: 'Express',
    textColor: '#000',
    backgroundColor: '#fff',
    icon: SiExpress
  },
  [Technology.DRIZZLE]: {
    name: 'Drizzle',
    textColor: '#000',
    backgroundColor: '#fff',
    icon: SiDrizzle
  },
  [Technology.SEQUELIZE]: {
    name: 'Sequelize',
    textColor: '#000',
    backgroundColor: '#fff',
    icon: SiSequelize
  },
  [Technology.MONGOOSE]: {
    name: 'Mongoose',
    textColor: '#000',
    backgroundColor: '#fff',
    icon: SiMongoose
  },
  [Technology.JEST]: {
    name: 'Jest',
    textColor: '#99425b',
    backgroundColor: '#fff',
    icon: SiJest
  },
  [Technology.ZOD]: {
    name: 'Zod',
    textColor: '#000',
    backgroundColor: '#fff',
    icon: SiZod
  },
  [Technology.ESLINT]: {
    name: 'ESLint',
    textColor: '#4b32c3',
    backgroundColor: '#fff',
    icon: SiEslint
  },
  [Technology.SHADCN]: {
    name: 'Shadcn',
    textColor: '#000',
    backgroundColor: '#fff',
    icon: SiShadcnui
  },
  [Technology.TAILWIND_CSS]: {
    name: 'Tailwind CSS',
    textColor: '#06b6d4',
    backgroundColor: '#fff',
    icon: SiTailwindcss
  },

  [Technology.GO]: {
    name: 'Go',
    textColor: '#00add8',
    backgroundColor: '#fff',
    icon: SiGo
  },
  [Technology.GIN]: {
    name: 'Gin',
    textColor: '#00add8',
    backgroundColor: '#fff',
    icon: SiGin
  },

  [Technology.PYTHON]: {
    name: 'Python',
    textColor: '#306998',
    backgroundColor: '#fff',
    icon: SiPython
  },
  [Technology.FASTAPI]: {
    name: 'FastAPI',
    textColor: '#306998',
    backgroundColor: '#fff',
    icon: SiFastapi
  },
  [Technology.SQLALCHEMY]: {
    name: 'SQLAlchemy',
    textColor: '#306998',
    backgroundColor: '#fff',
    icon: SiSqlalchemy
  },

  [Technology.I18NEXT]: {
    name: 'i18next',
    textColor: '#fff',
    backgroundColor: '#000',
    icon: SiI18Next
  },
  [Technology.DOCKER]: {
    name: 'Docker',
    textColor: '#0db7ed',
    backgroundColor: '#fff',
    icon: SiDocker
  },

  [Technology.MONGODB]: {
    name: 'MongoDB',
    textColor: '#13aa52',
    backgroundColor: '#fff',
    icon: SiMongodb
  },
  [Technology.POSTGRESQL]: {
    name: 'PostgreSQL',
    textColor: '#336791',
    backgroundColor: '#fff',
    icon: SiPostgresql
  },
  [Technology.MYSQL]: {
    name: 'MySQL',
    textColor: '#00758f',
    backgroundColor: '#fff',
    icon: SiMysql
  },
  [Technology.REDIS]: {
    name: 'Redis',
    textColor: '#dc382d',
    backgroundColor: '#fff',
    icon: SiRedis
  }
}

function useTechnology() {
  return { technologyData }
}

export { useTechnology }