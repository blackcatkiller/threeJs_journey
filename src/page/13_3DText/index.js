import React, {useContext, useEffect, useRef} from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { AppContext } from '../../App'

//这里是调用threejs自带字体库的方法
// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

import typefaceFont from '../../static/fonts/helvetiker_regular.typeface.json'

import matcap1 from '../../static/textures/matcaps/8.png'

import './index.less'


function Lesson13() {
  //获取THREE
  const { THREE } = useContext(AppContext)

  // canvas使用的ref
  const canvasRef = useRef(null);

  // Scene
  const scene = new THREE.Scene();

  // Axes helper
  // const axesHelper = new THREE.AxesHelper()
  // scene.add(axesHelper)

  // Textures
  const textureLoader = new THREE.TextureLoader()
  const matcapTexture = textureLoader.load(matcap1)
  const material = new THREE.MeshMatcapMaterial({matcap:matcapTexture})

  // Fonts
  const fontLoader = new FontLoader()

  const font = fontLoader.parse(typefaceFont)
  // console.log(font)
  const textGeometry = new TextGeometry(
    'Hello Threejs',
    {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4
    }
  )


  /* 
    居中文字
    方法1：自己计算
  */
  //计算bounding，不计算直接取的化得到的bounding为null
  // textGeometry.computeBoundingBox()
  // // console.log(textGeometry.boundingBox)
  // textGeometry.translate(
  //   - (textGeometry.boundingBox.max.x-0.02) >> 1,
  //   - (textGeometry.boundingBox.max.y-0.02) >> 1,  
  //   - (textGeometry.boundingBox.max.z-0.03) >> 1,
  // )
  
    /* 
    居中文字
    方法2：
  */
  
  textGeometry.center()

  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)
  
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  for (let i = 0; i <200; i++){
   
    const donut = new THREE.Mesh(donutGeometry, material)

    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale,scale)

    scene.add(donut)
  }
 
  
    // Size
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  
  //PerspectiveCamera  
  const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,0.1,100)
  camera.position.x = 1
  camera.position.y = 1
  camera.position.z = 2
  scene.add(camera)

 
  
  useEffect(() => {

    
  
    //Renderer

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
    
    renderer.setSize(sizes.width, sizes.height)

    //消除阶梯感，并限制渲染的最高像素比为2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    
    // Controls 使用内置的OrbitControls控件
    const controls = new OrbitControls(camera,canvasRef.current)
    // controls.enabled = false;
    controls.enableDamping = true //增加阻尼，需要在tick中controls.update()



    const tick = () => {
      
      //update controls
      controls.update();

      renderer.render(scene, camera)
      window.requestAnimationFrame(tick)
    }

    tick()   

    //当缩放屏幕时，调整渲染尺寸，总是填满视口
    window.addEventListener('resize', () => {

      // undate sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // update renderer
      renderer.setSize(sizes.width, sizes.height)
    })

  // 当双击屏幕时，全屏显示canvas
    window.addEventListener('dblclick', () => {
      const fullscreenElement = document.fullscreenElement||document.webkitFullscreen
      if (!fullscreenElement) {
        if (canvasRef.current.requestFullscreen) {
          canvasRef.current.requestFullscreen() 
        } else {
          canvasRef.current.webkitRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()  
        } else {
          document.webkitExitFullscreen()
        }
      }
    })

    
  },[])
  
  

  return (
    <>
      <canvas className='webGL' ref={canvasRef}></canvas>
    </>
  )
}

export default Lesson13

//14课讲的是自动化部署工具vercel