import React, {useContext, useEffect, useRef} from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'

import { AppContext } from '../../App'
import './index.less'

import color_door from '../../static/textures/door/color.jpg';
import alpha_door from '../../static/textures/door/alpha.jpg';
import ambientOcclusion_door from '../../static/textures/door/ambientOcclusion.jpg';
import height_door from '../../static/textures/door/height.jpg';
import normal_door from '../../static/textures/door/normal.jpg';
import metalness_door from '../../static/textures/door/metalness.jpg';
import roughness_door from '../../static/textures/door/roughness.jpg';
import matCap from '../../static/textures/matcaps/3.png'
import gradient from '../../static/textures/gradients/5.jpg'

  
const gui = new dat.GUI()

function Lesson12() {


  const { THREE } = useContext(AppContext)
  const canvasRef = useRef(null);
  const scene = new THREE.Scene()

  const textureLoader = new THREE.TextureLoader();
  const cubeTextureLoader = new THREE.CubeTextureLoader();


  const doorColorTexture = textureLoader.load(color_door)
  const doorAlphaTexture = textureLoader.load(alpha_door);
  const doorAmbientOcclusionTexture = textureLoader.load(ambientOcclusion_door);
  const doorHeightTexture = textureLoader.load(height_door)
  const doorNormalTexture = textureLoader.load(normal_door)
  const doorMetalnessTexture = textureLoader.load(metalness_door);
  const doorRoughnessTexture = textureLoader.load(roughness_door);
  const matcapTexture = textureLoader.load(matCap);
  const gradientTexture = textureLoader.load(gradient)
  gradientTexture.minFilter = THREE.NearestFilter
  gradientTexture.magFilter = THREE.NearestFilter
    
    console.log(require('../../static/textures/environmentMaps/0/px.jpg'),)
  //环境材料
  const environmentMapTexture = cubeTextureLoader.load([
    require('../../static/textures/environmentMaps/0/px.jpg'),
    require('../../static/textures/environmentMaps/0/nx.jpg'),
    require('../../static/textures/environmentMaps/0/py.jpg'),
    require('../../static/textures/environmentMaps/0/ny.jpg'),
    require('../../static/textures/environmentMaps/0/pz.jpg'),
    require('../../static/textures/environmentMaps/0/nz.jpg'),
  ])

  /* 
   *  Objects
  */
  
  // // MeshBasicMaterial
  // const material = new THREE.MeshBasicMaterial()
  // material.color.set('purple');
  // material.wireframe = true;
  // material.color = new THREE.Color('purple')
  // material.map = doorColorTexture ;
  // material.transparent = true;
  // material.opacity = 0.5
  // material.alphaMap = doorAlphaTexture; //alpha 白色的部分是可见的，黑色的部分将被隐藏


  // // MeshNormalMaterial
  // const material = new THREE.MeshNormalMaterial()
  // material.side = THREE.DoubleSide
  // // material.wireframe = true
  // material.flatShading = true //每个面的边缘锋利

  // // MeshMatcapMaterial 可以做到在scene中没有light的时候i，模仿图片中的灯光
  // const material = new THREE.MeshMatcapMaterial()
  // material.matcap = matcapTexture
  // // matcap 资源链接：https://github.com/nidorx/matcap

  // // MeshDepthMaterial 靠近就会变白，远离就会变暗 灯光它不起作用
  // const material = new THREE.MeshDepthMaterial()

  // // MeshLambertMaterial 需要灯光才能可见 没有反射光
  // const material = new THREE.MeshLambertMaterial()
  
  // // MeshPhongMaterial 需要灯光，有反射光
  // const material = new THREE.MeshPhongMaterial()
  // material.shininess = 100 //反光程度
  // material.specular = new THREE.Color(0x1188ff) //反光的颜色
  
  // //MeshToonMaterial 对光的反应像卡通，突变
  // const material = new THREE.MeshToonMaterial()
  // material.gradientMap = gradientTexture // 需要给texture添加添加NearestFilter

  // //MeshStandardMaterial 也支持光，但是有更好的参数，比如roughness, metalness
  // // 使用pbr标准（physically based rendering）
  // const material = new THREE.MeshStandardMaterial()
  // // material.metalness = 0.45;
  // // material.roughness = 0.65;
  // material.map = doorColorTexture
  // //增加立体感，使用时需要给mesh提供uv坐标
  // material.aoMap = doorAmbientOcclusionTexture
  // material.aoMapIntensity = 1 //阴影的轻重
  // // 在阴影的地方增加高度
  // material.displacementMap = doorHeightTexture
  // material.displacementScale = 0.1
  // //增加金属配件的金属感
  // material.metalnessMap = doorMetalnessTexture
  // material.roughnessMap = doorRoughnessTexture

  // //给表面增加法线，展示更细节的纹路，
  // material.normalMap = doorNormalTexture
  // material.normalScale.set(0.5, 0.5)

  // //使用alpha 
  // material.transparent = true;
  // material.alphaMap = doorAlphaTexture
  // //至此，一个完美的门诞生了

  // 来感受一个完美的环境映射
  const material = new THREE.MeshStandardMaterial()
  material.metalness = 0.7;
  material.roughness = 0.2;
  material.envMap = environmentMapTexture;

  /*
      提供环境素材的网站：
      HDRIHaven
      把从上面网站下载的图片分割为cube：https://matheowis.github.io/HDRI-to-CubeMap/


  */

    gui.add(material, 'metalness').min(0).max(1).step(0.001)
    gui.add(material, 'roughness').min(0).max(1).step(0.001)
    gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001)
    gui.add(material, 'displacementScale').min(0).max(1).step(0.001)
  
  


  //球
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 200,200),
    material
  )
  sphere.position.set(-1.5, 0, 0)
  sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

  //平面
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1,200,200),
    material
  )
  
  // console.log(plane.geometry.attributes.uv)
  plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

  // 轮胎
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,200,200),
    material
  )
  torus.position.set(1.5, 0, 0)
  torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
  
  scene.add(sphere,plane,torus)

  /* 
   * Lights
  */
  //环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  //高光
  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  pointLight.position.x = 2
  pointLight.position.y = 3
  pointLight.position.z = 4
  scene.add(pointLight)

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,0.1,100)
  camera.position.z = 3;

  
  scene.add(camera);
  
  useEffect(() => {

    //Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current }) 
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    
    // Controls 使用内置的OrbitControls控件
    const controls = new OrbitControls(camera,canvasRef.current)
    controls.enableDamping = true //增加阻尼，需要在tick中controls.update()

    const clock = new THREE.Clock();
    const tick = () => {
      
      const elapsedTime = clock.getElapsedTime();

      // update object
      sphere.rotation.y = 0.5 * elapsedTime
      plane.rotation.y = 0.5* elapsedTime
      torus.rotation.y = 0.5 * elapsedTime

      sphere.rotation.x = 0.5 * elapsedTime
      plane.rotation.x = 0.5* elapsedTime
      torus.rotation.x = 0.5 * elapsedTime


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
      <h1 className="container-title">12 Material</h1>
      <canvas className='webGL' ref={canvasRef}></canvas>
    </div>
  )
}

export default Lesson12