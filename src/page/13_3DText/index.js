import React, {useContext, useEffect, useRef} from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AppContext } from '../../App'
import './index.less'
function Lesson13() {
  //获取THREE
  const { THREE } = useContext(AppContext)

  // canvas使用的ref
  const canvasRef = useRef(null);

  // Scene
  const scene = new THREE.Scene();

    // Red cube
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial()
  )
  scene.add(mesh)
  
    // Size
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  
  //PerspectiveCamera  
  const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,0.1,100)
  camera.position.z = 3;
  camera.lookAt(mesh.position);
  
  scene.add(camera);

 
  
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