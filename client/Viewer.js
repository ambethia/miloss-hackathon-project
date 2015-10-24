import THREE from 'three';
import Trackball from '../vendor/trackball';
import io from 'socket.io-client';
import _ from 'lodash';

import styles from './Viewer.less';

window.THREE = THREE;

export default class Viewer {

  constructor(container) {
    this.socket = io();
    this.isFollowing = false;
    this.remoteCameraTarget = null;
    this.remoteCameraClock = new THREE.Clock(false);

    this.socket.on('camera', this.handleRemoteCameraChange.bind(this));

    container.className = styles.viewer;

    this.camera = new THREE.PerspectiveCamera(
      70, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    this.controls = new Trackball(this.camera, container);
    this.controls.target.set(0, 0, 0);
    this.controls.rotateSpeed = 2.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;

    this.controls.addEventListener(
      'change',
      _.debounce(this.handleControlsChanged.bind(this), 10, {
        leading: true,
        maxWait: 50
      }));

    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x555555));

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true,
      vertexColors: THREE.VertexColors
    });

    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.camera.position.z = 5;

    const directionalLight = new THREE.SpotLight(0xffffff, 1.5);
    directionalLight.position.set(0, 500, 2000);
    this.scene.add(directionalLight);

    this.renderer.setClearColor(0x222222);

    window.addEventListener('resize', this.handleResize.bind(this), false);
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  handleRemoteCameraChange(data) {
    if (this.isFollowing) {
      this.remoteCameraTarget = {
        position: new THREE.Vector3().fromArray(data[0]),
        up: new THREE.Vector3().fromArray(data[1]),
        target: new THREE.Vector3().fromArray(data[2])
      };
      this.remoteCameraClock.elapsedTime = 0;
      this.remoteCameraClock.start();
    }
  }

  updateCamera() {
    let t = 0;
    if (this.remoteCameraClock.getElapsedTime() > 0.5) {
      this.remoteCameraClock.stop();
      this.remoteCameraClock.elapsedTime = 0;
      t = 1;
    } else {
      t = this.remoteCameraClock.getElapsedTime() * 2;
    }

    if (this.remoteCameraTarget) {
      this.camera.position.lerp(
        this.remoteCameraTarget.position, t);
      this.camera.up.lerp(
        this.remoteCameraTarget.up, t);
      this.controls.target.lerp(
        this.remoteCameraTarget.target, t);
    }
  }

  handleControlsChanged() {
    this.socket.emit('camera', [
      this.camera.position.toArray(),
      this.camera.up.toArray(),
      this.controls.target.toArray(),
    ]);
  }

  start() {
    this.animate();
  }

  render() {
    this.updateCamera();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
}
