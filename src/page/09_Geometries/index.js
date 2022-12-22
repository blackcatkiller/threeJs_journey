import React, {useContext, useEffect, useRef} from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AppContext } from '../../App'
import './index.less'
function Lesson9() {

  const { THREE } = useContext(AppContext)
  const canvasRef = useRef(null);
  const scene = new THREE.Scene();

  /*******************object******************/
  
  // const geometry = new THREE.BoxGeometry(1,1,1,2,2,2)
 
  // const geometry = new THREE.Geometry()
  // const vertex1 = new THREE.Vector3(0, 0, 0)
  // const vertex2 = new THREE.Vector3(1, 0, 0)
  // const vertex3 = new THREE.Vector3(0, 1, 0)
 
  // geometry.vertices.push(vertex1)
  // geometry.vertices.push(vertex2)
  // geometry.vertices.push(vertex3)

  // const face = new THREE.Face3(0, 1, 2)
  // geometry.faces.push(face)

  const geometry = new THREE.BufferGeometry();
  // const vertices = new Float32Array( [
  //   -1.0, -1.0,  1.0,
  //    1.0, -1.0,  1.0,
  //    1.0,  1.0,  1.0,
  // ]);

  // let verticesArray = [];
  // for (let i = 0; i < 50; i++){
  //   for (let j = 0; j <9; j++){
  //     verticesArray.push((Math.random() - 0.5)*10)
  //   }
  // }

  //Float32Array,固定类型，固定长度数组 
  let vertices = new Float32Array(150)

  vertices = vertices.map((i) => {
    return (Math.random() - 0.5)*10
  })

  geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

  const material = new THREE.MeshBasicMaterial({
    color: 0x238480,
    wireframe: true //显示面
  })

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
      <h1 className="container-title">几何体Geometries</h1>
      <canvas className='webGL' ref={canvasRef}></canvas>
    </div>
  )
}

export default Lesson9