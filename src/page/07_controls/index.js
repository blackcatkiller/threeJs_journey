import React, {useContext, useEffect, useRef} from 'react'
import { AppContext } from '../../App'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
function Lesson7() {
  //获取THREE
  const { THREE } = useContext(AppContext)

  // canvas使用的ref
  const canvasRef = useRef(null);

  // Scene
  const scene = new THREE.Scene();

    // Red cube
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x238480 })
  )
  scene.add(mesh)
  
    // Size
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight-100
  }
  //PerspectiveCamera  
  const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,0.1,100)
  // // OrthographicCamera
  camera.position.z = 3;
  camera.lookAt(mesh.position);
  
  scene.add(camera);

 
  
  useEffect(() => {

    // console.log(canvasRef)
    
    // Cursor
    // const cursor = {
    //   x: 0,
    //   y: 0,
    // }
    // window.addEventListener('mousemove', (e) => {
    //   cursor.x = e.clientX / sizes.width - 0.5;
    //   cursor.y = -(e.clientY / sizes.height-0.5);
      
    //   console.log(cursor.x)
    // })

    //Renderer

    const renderer = new THREE.WebGLRenderer({canvas:canvasRef.current})

    renderer.setSize(sizes.width, sizes.height)

     // Controls 使用内置的OrbitControls控件
    const controls = new OrbitControls(camera,canvasRef.current)
    controls.enableDamping = true //增加阻尼，需要在tick中controls.update()

    //animations
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      
      //UPdate camera
      // camera.position.x = cursor.x*10
      // camera.position.y = cursor.y * 10
// 手动控制
      // camera.position.x = Math.sin(cursor.x*Math.PI*2) *3
      // camera.position.z = Math.cos(cursor.x*Math.PI*2) *3
      // camera.position.y = cursor.y * 5;
      // camera.lookAt(mesh.position)

      //update controls
      controls.update()

      
      
      //Update object
      // mesh.rotation.y = elapsedTime
      
        
      renderer.render(scene, camera)
      window.requestAnimationFrame(tick)
    }


    tick()    
  },[])
  
  

  return (
    <>
      <h1 className="title">Lesson7 controls</h1>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}

export default Lesson7