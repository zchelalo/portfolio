import { Technology } from '@/constants'

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiJest,

  SiGo,

  SiPython,
  SiFastapi,

  SiDocker,

  SiMongodb,
  SiPostgresql,
  SiMysql,

  SiAmazonwebservices,
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
  [Technology.JEST]: {
    name: 'Jest',
    textColor: '#99425b',
    backgroundColor: '#fff',
    icon: SiJest
  },

  [Technology.GO]: {
    name: 'Go',
    textColor: '#00add8',
    backgroundColor: '#fff',
    icon: SiGo
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
  [Technology.AWS]: {
    name: 'Amazon Web Services',
    textColor: '#ff9900',
    backgroundColor: '#fff',
    icon: SiAmazonwebservices
  }
}

function useTechnology() {
  return { technologyData }
}

export { useTechnology }