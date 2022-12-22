import React, { Suspense } from 'react'
import { HashRouter, Routes,Route } from 'react-router-dom'
import { routerData } from './routerData'


function Router() {
  // console.log('................................................................')
  return (
    <HashRouter>
        <Suspense fallback={null}>
          <Routes>
            {
            routerData.map(item => {

                return (
                  <Route
                      element={item.element}
                      exact={item.exact}
                      key={item.key}
                      path={item.path}
                  />
                )

              })
            }
          </Routes>
        </Suspense>
      </HashRouter>
  )
}

export default Router