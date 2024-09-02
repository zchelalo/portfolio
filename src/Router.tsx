import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from '@/components/Layout'
import { Home } from '@/modules/home/ui/pages/Home'
import { Skill } from '@/modules/skill/ui/pages/Skill'

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/skills/{technology}'
            element={<Skill />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export { Router }