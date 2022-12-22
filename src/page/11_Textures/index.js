import React, {useContext, useEffect, useRef} from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AppContext } from '../../App'
import './index.less'
import wood from '../../static/wood.jpg'
import { LoadingManager } from 'three';


function Lesson11() {

  const { THREE } = useContext(AppContext)
  const canvasRef = useRef(null);
  const scene = new THREE.Scene();

  
  const geometry = new THREE.BoxGeometry(1,1,1,2,2,2)
  // console.log('uv:',geometry.attributes.uv)


    /* 
     * Texture
    */
  
    // 方法一
    // const image = new Image()
    // const texture = new THREE.Texture(image)
   
    // image.onload = () => {
    //   texture.needsUpdate = true
    // }

    // image.src = wood
    // console.log(image)
    // console.log(texture)

// 方法二
  
  //加上进度条
  const loadingManager = new THREE.LoadingManager()
  loadingManager.onStart = () => {
    console.log('onStart')
  }
  loadingManager.onLoaded = () => {
    console.log('onLoaded')
  }
  loadingManager.onProgress = () => {
    console.log('onProgress')
  }
  loadingManager.onError = () => {
    console.log('onError')
  }

  //加载texture
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const texture = textureLoader.load(
    wood, //path
    () => { 
      console.log('load')
    },
    () => {
      console.log('progress')
    },
    () => { 
      console.log('error')    
    }
  )

  // //repeat
  // texture.repeat.x = 2;
  // texture.repeat.y = 3
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // // texture.wrapS = THREE.MirroredRepeatWrapping;
  // // texture.wrapT = THREE.MirroredRepeatWrapping;

  // //offset
  // texture.offset.x = 0.1
  // texture.offset.y = 0.1

  // rotation 旋转的支点是左下角，逆时针旋转
  texture.rotation = Math.PI / 4
  //把旋转支点放在中间
  texture.center.x = 0.5
  texture.center.y = 0.5


  // filter&mipmapping
  texture.generateMipmaps = false //minFilter 使用MearestFilter时可以禁用minmap，以减轻gpu的负担
  texture.minFilter = THREE.NearestFilter //sharp 默认是LinearFilter,效果是blur
  texture.magFilter = THREE.NearestFilter


  /* 
    纹理格式 和优化
    需要注意以下三点：
    · the weight of the texture ,of the file 
    · the size of the image, of the revolution
    · the data we put into the revolution


    texture 素材网站
    poligon.com
    3dtextures.me
    arroway-textures.ch
  */
/* ******************************************************** */
  const material = new THREE.MeshBasicMaterial({map: texture})

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
      <h1 className="container-title">11  Textures 纹理</h1>
      <canvas className='webGL' ref={canvasRef}></canvas>
    </div>
  )
}

export default Lesson11