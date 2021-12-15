<template>
  <div :style="{position: 'relative',width:winWidth+'px',height:winHeight+'px'}">
    <div class="my-box" id="container">
    </div>
    <div class="pos1">
      <span>载荷比</span>
      <span>{{data0}}%</span>
    </div>
    <div class="pos2">
      <span>风速</span>
      <span>{{ data1 }}m/s</span>
    </div>
    <div class="pos3">
      <div class="item">
        <span>吊重</span>
        <span>{{ data2 }}t</span>
      </div>
      <div class="item">
        <span>幅度</span>
        <span>{{ data3 }}m</span>
      </div>
      <div class="item">
        <span>高度</span>
        <span>{{ data4 }}m</span>
      </div>
    </div>
    <div class="pos4">
      <div class="item">
        <span>转角</span>
        <span>{{ data5 }}°</span>
      </div>
      <div class="item">
        <span>倾角</span>
        <span>{{ data6 }}°</span>
      </div>

    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

export default {
  name: 'TowerCrane',
  props: ['width','height','url','loadRatio','wind','heightNow','weight','margin','towerHeight','rotation','inclination'],
  data() {
    return {
      step: 0,
      winWidth:500,
      winHeight:300,
      objUrl:'',
      data0:0,
      data1:0,
      data2:0,
      data3:0,
      data4:0,
      data5:0,
      data6:0
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    this.initScene()
    this.initLight()
    this.initCamera()
    this.initRender()
    this.initControls()
    this.initModel()
    this.render()

  },
  methods: {
    initData(){
      this.winWidth = this.width
      this.winHeight = this.height
      this.data0 = this.loadRatio
      this.data1 = this.wind
      this.data2 = this.weight
      this.data3 = this.margin
      this.data4 = this.towerHeight
      this.data5 = this.rotation
      this.data6 = this.inclination
      this.objUrl = this.url
    },
    initScene() {
      this.scene = new THREE.Scene()
      this.scene.add(new THREE.AxesHelper(5))
    },
    initLight(){
      const light = new THREE.PointLight()
      light.position.set(0.8, 1.4, 1.0)
      this.scene.add(light)

      const ambientLight = new THREE.AmbientLight()
      this.scene.add(ambientLight)
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(45, this.winWidth / this.winHeight, 0.1, 1000)
      // 设置相机位置
      this.camera.position.x = 70
      this.camera.position.y = 0
      this.camera.position.z = 100
      // 设置相机指向的位置 默认0，0，0
      this.camera.lookAt(0,0,0)
    },

    initRender() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(this.winWidth, this.winHeight)
      // 告诉渲染器需要阴影效果
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      // 设置背景色
      this.renderer.setClearColor(new THREE.Color(0x000000))
      document.querySelector('#container').appendChild(this.renderer.domElement)

    },
    initControls() {
      const controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.enableDamping = true
      controls.target.set(0, 1, 0)
    },
    initStats() {
      this.stats = new Stats()
      //document.body.appendChild(this.stats['dom'])
      document.querySelector('#status').appendChild(this.stats['dom'])
    },
    initModel() {
      const url =  this.objUrl
      const fbxLoader = new FBXLoader()
      fbxLoader.load(
          url,
          (object) => {
            // object.traverse(function (child) {
            //     if ((child as THREE.Mesh).isMesh) {
            //         // (child as THREE.Mesh).material = material
            //         if ((child as THREE.Mesh).material) {
            //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
            //         }
            //     }
            // })
            object.position.set(0,0,0)
            object.scale.set(0.02, 0.02, 0.02)
            this.scene.add(object)
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },
          (error) => {
            console.log(error)
          }
      )

    },
    render() {
      requestAnimationFrame(this.render)
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  },
  watch:{
    loadRatio(n,o){
      this.data0 = n
    },
    wind(n,o){
      this.data1 = n
    },
    weight(n,o){
      this.data2 = n
    },
    margin(n,o){
      this.data3 = n
    },
    towerHeight(n,o){
      this.data4 = n
    },
    rotation(n,o){
      this.data5 = n
    },
    inclination(n,o){
      this.data6 = n
    }
  }
}
</script>

<style lang="less" scoped>
.my-box{
  width: 100%;
  padding: 0;
  background: #2c3e50;
  margin: 0 auto;
}
.pos1{
  position: absolute;
  left: 10px;
  top: 10px;
  background: rgba(16,33,56,1);
  color: #fff;
  padding: 5px 20px;
  line-height: 24px;
  border-radius: 5px;
  span{
    display: block;
    font-size: 14px;
  }
}
.pos2{
  position: absolute;
  right: 10px;
  top: 10px;
  background: rgba(16,33,56,1);
  color: #fff;
  padding: 5px 20px;
  line-height: 24px;
  border-radius: 5px;
  span{
    display: block;
    font-size: 14px;
  }
}
.pos3{
  position: absolute;
  left: 10px;
  bottom: 10px;
  background: rgba(16,33,56,1);
  color: #fff;
  padding: 5px 20px;
  line-height: 24px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  .item{
    flex: 1;
    margin: 0 10px;
    span{
      display: block;
      font-size: 14px;
    }
  }

}
.pos4{
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: rgba(16,33,56,1);
  color: #fff;
  padding: 5px 20px;
  line-height: 24px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  .item{
    flex: 1;
    margin: 0 10px;
    span{
      display: block;
      font-size: 14px;
    }
  }

}
</style>
