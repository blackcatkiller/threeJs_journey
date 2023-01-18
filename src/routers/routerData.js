import { lazy } from 'react';

const Lesson3 = lazy(()=>import ('../page/03_start/index'))
const Lesson4 = lazy(() => import('../page/04_webpack/index'))
const Lesson5 = lazy(()=>import ('../page/05_Transform_objects/index'))
const Lesson6 = lazy(()=>import ('../page/06_animations/index'))
const Lesson7 = lazy(() => import('../page/07_controls/index'))
const Lesson8 = lazy(()=>import ('../page/08_fullScreen_and_resizing/index'))
const Lesson9 = lazy(()=>import ('../page/09_Geometries/index'))
const Lesson10 = lazy(()=>import ('../page/10_debug_GUI'))
const Lesson11 = lazy(()=>import ('../page/11_Textures'))
const Lesson12 = lazy(()=>import ('../page/12_Materials'))
const Lesson13 = lazy(()=>import ('../page/13_3DText'))




export const routerData = [
  {
    element: <Lesson3/>,
    path: '/lesson3',
    exact: true,
    key: 'lesson3'
  },
  {
    element: <Lesson4/>,
    path: '/lesson4',
    exact: true,
    key: 'lesson4'
  },
  {
    element: <Lesson5/>,
    path: '/lesson5',
    exact: true,
    key: 'lesson5'
  },
  {
    element: <Lesson6/>,
    path: '/lesson6',
    exact: true,
    key: 'lesson6'
  },
  {
    element: <Lesson7/>,
    path: '/lesson7',
    exact: true,
    key: 'lesson7'
  },
  {
    element: <Lesson8/>,
    path: '/lesson8',
    exact: true,
    key: 'lesson8'
  },
  {
    element: <Lesson9/>,
    path: '/lesson9',
    exact: true,
    key: 'lesson8'
  },
  {
    element: <Lesson10/>,
    path: '/lesson10',
    exact: true,
    key: 'lesson10'
  },
  {
    element: <Lesson11/>,
    path: '/lesson11',
    exact: true,
    key: 'lesson11'
  },
  {
    element: <Lesson12/>,
    path: '/lesson12',
    exact: true,
    key: 'lesson12'
  },
  {
    element: <Lesson13/>,
    path: '/lesson13',
    exact: true,
    key: 'lesson13'
  },
  
]