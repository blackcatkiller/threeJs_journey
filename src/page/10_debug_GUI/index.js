import React, {useContext, useEffect, useRef} from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AppContext } from '../../App'
import './index.less'
import gsap from 'gsap'
import * as dat from 'dat.gui'

/* 
  yarn add dat.gui
*/

function Lesson10() {

//debug
  const gui = new dat.GUI()


  const { THREE } = useContext(AppContext)
  const canvasRef = useRef(null);
  const scene = new THREE.Scene();

  
  const geometry = new THREE.BoxGeometry(1,1,1,2,2,2)

  const parameters = {
    color: 0xaf3ad2,
    spin: () => {
      gsap.to(mesh.rotation, {duration:1, y: mesh.rotation.y+10})
    }
  }


  const material = new THREE.MeshBasicMaterial(parameters)

  const mesh = new THREE.Mesh(geometry,material)
  scene.add(mesh)

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,0.1,100)
  camera.position.z = 3;
  camera.lookAt(mesh.position);
  
  scene.add(camera);

  
/*  
debug

  tips: press h to hide the debug tool
  example: https://jsfiddle.net/ikatyang/182ztwao
*/
  
  // gui.hide();
 
  gui
  .add(mesh.position, 'y')
   .min(-3)
  .max(3)
  .step(0.01)
  .name('y position')

  gui
    .add(mesh, 'visible')

  gui
    .add(material, 'wireframe')
    
  
  gui
    .addColor(parameters, 'color')
    .onChange(() => {
      material.color.set(parameters.color)
    })
    
  gui
    .add(parameters, 'spin')

    

  
  useEffect(() => {

    //Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current }) 
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    
    // Controls 使用内置的OrbitControls控件
    const controls = new OrbitControls(camera,canvasRef.current)
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

    
  },[THREE.WebGLRenderer,camera,scene,sizes])
  
  

  return (
    <div className="container">
      <h1 className="container-title">debug ui控件 dat.gui</h1>
      <canvas className='webGL' ref={canvasRef}></canvas>
    </div>
  )
}

export default Lesson10