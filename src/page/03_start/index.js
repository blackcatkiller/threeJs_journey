import React, {useContext, useEffect, useRef} from 'react'
import { AppContext } from '../../App'

import './index.less'

function Lesson3() {
  //获取THREE
  const { THREE } = useContext(AppContext)

  // canvas使用的ref
  const canvasRef = useRef(null);

  // Scene
  const scene = new THREE.Scene();

    // Red cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x238480 })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh);
  
    // Size
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight-100
  }
  
    //Camera
  const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,)
  camera.position.z = 5;
  camera.position.x = 2;
  camera.position.y = 2;
  scene.add(camera);
  
  useEffect(() => {
    console.log(canvasRef)
    //Renderer
    const renderer = new THREE.WebGLRenderer({canvas:canvasRef.current})

    renderer.setSize(sizes.width, sizes.height)

    renderer.render(scene,camera)
  },[canvasRef])
  
  

  return (
    <>
      <h1 className="title">Lesson3 尝试画一个用three.js 画一个正方体</h1>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}

export default Lesson3