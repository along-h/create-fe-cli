import { useRoutes } from 'react-router'
import routes from './router'
import { Suspense } from 'react'
import { Loading } from '@/components'
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>
    </>
  )
}

export default App
