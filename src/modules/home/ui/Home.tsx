import { AboutMe } from '@/modules/about_me/ui/AboutMe'
import { WorkExperience } from '@/modules/work_experience/ui/WorkExperience'
import { Project } from '@/modules/project/ui/Project'
import { Study } from '@/modules/study/ui/Study'
import { Skill } from '@/modules/skill/ui/Skill'

function Home() {
  return (
    <div>
      <AboutMe />
      <WorkExperience />
      <Project />
      <Study />
      <Skill />
    </div>
  )
}

export { Home }