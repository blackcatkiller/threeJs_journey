import React, {useContext, useEffect, useRef} from 'react'
import { AppContext } from '../../App'

import './index.less'

function Lesson5() {
  //获取THREE
  const { THREE } = useContext(AppContext)

  // canvas使用的ref
  const canvasRef = useRef(null);

  // Scene
  const scene = new THREE.Scene();

    // Red cube
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x238480 })
  // const mesh = new THREE.Mesh(geometry, material)
  // scene.add(mesh);



    // Size
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight-100
  }
  
    //Camera
  const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,0.1,1000)
  scene.add(camera);

  /*************************************************************/

  // console.log(mesh.position.distanceTo(camera.position))
  camera.position.set(0,0,3)

  // mesh.position.x = 0.7;
  // mesh.position.y = -0.6
  // mesh.position.z = 2;// x:左右   y: 上下  z: 前后
  // mesh.position.set(0.7, -0.6, 1)

  // Objects 把按一定规则组合的物体，放进一个Group里可以对它们进行同步操作
  const group = new THREE.Group()
  scene.add(group)

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color:0xff0000,})
  )

  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color:0x00ff00,})
  )
  cube2.position.x = -2

  const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color:0x0000ff,})
  )
  cube3.position.x = 2

  group.add(cube1)
  group.add(cube2)
  group.add(cube3)

  // 整租移动
  group.position.y = -1
  group.scale.y = 0.5
  group.rotation.y = 1


  //Axes helper
  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

  //Scale
  // mesh.scale.x = 2;
  // mesh.scale.y = 0.5;
  // mesh.scale.z = 0.5;
  // mesh.scale.set(2, 0.5, 0.5)
  
  //Rotation 旋转的时候要注意各轴旋转的先后顺序,不同顺序导致不同结果
  // mesh.rotation.reorder('YXZ')//旋转顺序，reorder必须写在旋转之前
  // mesh.rotation.y = Math.PI*0.25 //绕y轴转半圈
  // mesh.rotation.x = Math.PI*0.25//绕y轴转半圈

  //改变camera的朝向
  // camera.lookAt(3,0,0)//朝右看
  // camera.lookAt(mesh.position)//朝向物体


  /***********************************************************/

  useEffect(() => {
    console.log(canvasRef)
    //Renderer
    const renderer = new THREE.WebGLRenderer({canvas:canvasRef.current})

    renderer.setSize(sizes.width, sizes.height)

    renderer.render(scene,camera)
  },[canvasRef])
  
  

  return (
    <>
      <h1 className="title">Lesson5 Transform_objects</h1>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}

export default Lesson5