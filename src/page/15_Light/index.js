import React, {useContext, useEffect, useRef} from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import * as dat from 'dat.gui'
import { AppContext } from '../../App'
import './index.less'


function Lesson15() {

    // Debug
  const gui = new dat.GUI()
  
  //获取THREE
  const { THREE } = useContext(AppContext)

  // canvas使用的ref
  const canvasRef = useRef(null);


  
  // Scene
  const scene = new THREE.Scene();

  /*****************Lights********************/
  //环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01)
  
  //平行光 模拟太阳光
  const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
  directionalLight.position.set(1, 0.25, 0)
  scene.add(directionalLight)

  //第一个颜色从上到下，第二个颜色从下到上,但是原理是类似于环境光的
  const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
  scene.add(hemisphereLight)

  //点光源
  const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
  pointLight.position.set(1,0.5,1)
  scene.add(pointLight)

  //方块光源
  const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
  rectAreaLight.position.set(-1.5, 0.5, 1.5)
  rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0))
  scene.add(rectAreaLight)

  //聚光灯
  const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI*0.1, 0.25, 1)
  spotLight.position.set(0, 2, 3)
  scene.add(spotLight)
  // To rotate the SpotLight, we need to add its target
  // property to the scene and move it.
  spotLight.target.position.x = -0.75
  scene.add(spotLight.target)

  /*
  小结：
  增加灯光会非常消耗计算机的性能，我们应该尽可能少的使用灯光
  最节省性能的light：AmbientLight、HemisphereLight；
  中等性能的light：DirectionalLight、PointLight；
  最消耗性能的light：RectAreaLight、SpotLight。

  我们可以把需要的灯光制作进texture里，这样做的好处是节省性能开支，缺点是无法对光源进行移动
  */
  
  //Helper
  const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
  scene.add(hemisphereLightHelper)

  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
  scene.add(directionalLightHelper)

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
  scene.add(pointLightHelper)

  //这个位置还在默认位置，必须手动更新
  const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotLightHelper)
  //手动更新，下一帧才能显示
  window.requestAnimationFrame(() => {
    spotLightHelper.update()
  })

  const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
  scene.add(rectAreaLightHelper)



  /*********Object**********/
  // material
  // MeshStandardMaterial需要光源，没有light就看不到
  const material = new THREE.MeshStandardMaterial()
  material.roughness = 0.4

  // object
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
  )
  sphere.position.x = -1.5

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
  )

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
  )
  torus.position.x = 1.5

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
  )
  plane.rotation.x = -  Math.PI * 0.5
  plane.position.y = - 0.65

  scene.add(sphere, cube, torus, plane)
  
  
  // Axes helper
  // const axesHelper = new THREE.AxesHelper()
  // scene.add(axesHelper)

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    
    // Controls 使用内置的OrbitControls控件
    const controls = new OrbitControls(camera,canvasRef.current)
    // controls.enabled = false;
    controls.enableDamping = true //增加阻尼，需要在tick中controls.update()


    // Animatie
    const clock = new THREE.Clock();

    const tick = () => {

      const elapsedTime = clock.getElapsedTime();

      //Update objects
      sphere.rotation.y = 0.1 * elapsedTime
      cube.rotation.y = 0.1 * elapsedTime
      torus.rotation.y = 0.1 * elapsedTime

      sphere.rotation.x = 0.15 * elapsedTime
      cube.rotation.x = 0.15 * elapsedTime
      torus.rotation.x = 0.15 * elapsedTime
      
      //update controls
      controls.update();

      //render
      renderer.render(scene, camera)

      // call tick again on the next frame
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

export default Lesson15
