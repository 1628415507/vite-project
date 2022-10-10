/*
 * @Author: Hongzf
 * @Date: 2022-10-10 11:10:11
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-10 15:09:45
 * @Description: 通过这个文件实现一个简易的threejs渲染逻辑
 */
// 【1】引入createRenderer  
import { createRenderer } from '@vue/runtime-core';
// 通过createRenderer函数创建了一个渲染器。
// 通过参数options获取增删改查所有的函数以后，
// 在内部的render、mount、patch等函数中，需要去渲染一个元素的时候，
// 就可以通过option.createElement和option.insert来实现。
import * as THREE from 'three'// npm install three --save
import {nextTick} from '@vue/runtime-core'

let renderer
// 【2】实现draw函数  
function draw(obj) {
    const {camera,cameraPos, scene, geometry,geometryArg,material,mesh,meshY,meshX} = obj
    if([camera,cameraPos, scene, geometry,geometryArg,material,mesh,meshY,meshX].filter(v=>v).length<9){
        return 
    }
    let cameraObj = new THREE[camera]( 40, window.innerWidth / window.innerHeight, 0.1, 10 )
    Object.assign(cameraObj.position,cameraPos)

    let sceneObj = new THREE[scene]()

    let geometryObj = new THREE[geometry]( ...geometryArg)
    let materialObj = new THREE[material]()

    let meshObj = new THREE[mesh]( geometryObj, materialObj )
    meshObj.rotation.x = meshX
    meshObj.rotation.y = meshY
    sceneObj.add( meshObj )
    renderer.render( sceneObj, cameraObj );

}
// 【3】在createRenderer的insert方法中调用draw函数
const { createApp: originCa } = createRenderer({
  insert: (child, parent, anchor) => {
    if(parent.domElement){
        draw(child)
    }
  },
  createElement(type, isSVG, isCustom) {
    return {
      type
    }
  },
  setElementText(node, text) {
  },
  patchProp(el, key, prev, next) {
    el[key] = next
    draw(el)
  },
  parentNode: node => node,
  nextSibling: node => node,
  createText: text => text,
  remove:node=>node

});
// 【4】重写并导出createApp
function createApp(...args) {
  const app = originCa(...args)
  return {
    mount(selector) {
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        app.mount(renderer)
    }
  }
}
export { createApp }
// 【5】在main.js中引入自己写的createApp