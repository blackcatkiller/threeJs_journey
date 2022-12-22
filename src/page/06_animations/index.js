import React, {useContext, useEffect, useRef} from 'react'
import { AppContext } from '../../App'
import gsap from 'gsap'

function Lesson6() {
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
  camera.position.z = 3;
  
  scene.add(camera);

  

  
  useEffect(() => {
    console.log(canvasRef)
    //Renderer

    const renderer = new THREE.WebGLRenderer({canvas:canvasRef.current})

    renderer.setSize(sizes.width, sizes.height)

  /*********************Animation************************/
// //方法1：使用时间差矫正不同刷新频率的电脑运动速度不均的问题
//     // let time = Date.now();
//     // const tick = () => {
//     //   //Time
//     //   const currentTime = Date.now();
//     //   const deltaTime = currentTime - time;
//     //   time = currentTime;

//     //   //Update object
//     //   mesh.rotation.y +=0.001 *deltaTime;
//     //   renderer.render(scene, camera)
//     //   window.requestAnimationFrame(tick)
//     // }

// //方法二：使用THREE.Clock对象
//     const clock = new THREE.Clock();

//     const tick = () => {
//       const elapsedTime = clock.getElapsedTime();
//       //Update object

//       // mesh.rotation.y = elapsedTime*2*Math.PI //这样的转速是每秒1转
//       // mesh.position.y = Math.sin(elapsedTime)
//       // mesh.position.x = Math.cos(elapsedTime)
      
//       camera.position.y = Math.sin(elapsedTime)
//       camera.position.x = Math.cos(elapsedTime)
//       camera.lookAt(mesh.position)
//       renderer.render(scene, camera)
//       window.requestAnimationFrame(tick)
//     }

//方法三： 使用gsap，来更好的控制复杂的设定
    
    gsap.to(mesh.position, {duration:1, delay:1,x: 2})

    const tick = () => {
      
      renderer.render(scene, camera)
      window.requestAnimationFrame(tick)
    }


    tick()    
  },[])
  
  

  return (
    <>
      <h1 className="title">Lesson6 animations</h1>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}

export default Lesson6