import React, { Component } from 'react';   
import * as THREE from 'three';
import PropTypes from 'prop-types';

class three extends Component {

    constructor(props){
        super(props)

        this.event = this.event.bind(this)
        document.addEventListener('keypress', e => this.event(e))
    }

    event(e){
        switch(e.key){
            case 'a':
                this.cube.position.x -= 0.2;
                break;
            case 'd':
                this.cube.position.x += 0.2;
                break;
            case 'w':
                this.cube.position.y += 0.2;
                break;
            case 's':
                this.cube.position.y -= 0.2;
                break;
            default:
                console.log(e.key)
        }
    }

    componentDidMount(){
        // this.mount.clientWidth equal window.innerWidth
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
          70,
          width / height,
          0.1,
          1000
        )
        //this.controls = new THREE.OrbitControls(this.camera)
        //this.controls.autoRotate = true
        this.camera.position.z = 4
        //this.controls.update()
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#000000')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: '#00FF00'})
        this.cube = new THREE.Mesh(geometry, material)
        this.scene.add(this.cube)
        // console.log(this)
        this.start()
    }


    start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
    }

    update = () => {

    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    // update renderer
    animate = () => {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
        this.frameId = window.requestAnimationFrame(this.animate)
        //this.controls.update()
        this.renderScene()
    }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }
    
    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }
        
    render() {
        return (
            <div style={{ width: window.innerWidth, height: window.innerHeight }}
                ref={(mount) => { this.mount = mount }}/>
        );
  	}
}

three.PropTypes = PropTypes;

export default three;
