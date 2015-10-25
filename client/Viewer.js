import THREE from 'three';
import Trackball from '../vendor/trackball';
import io from 'socket.io-client';
import _ from 'lodash';

import '../vendor/ColladaLoader';

import styles from './Viewer.less';

const SMOOTH_TIME = 0.5;

window.THREE = THREE;

export default class Viewer {

  constructor(container) {
    this.socket = io();
    this.isFollowing = false;
    this.remoteCameraTarget = null;
    this.selectedObject = null;
    this.remoteCameraClock = new THREE.Clock(false);

    this.socket.on('camera', this.handleRemoteCameraChange.bind(this));

    container.className = styles.viewer;

    this.camera = new THREE.PerspectiveCamera(
      50, window.innerWidth / window.innerHeight, 1, 10000);
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
    this.scene.add(new THREE.AmbientLight(0x999999));

    this.selectedMaterial = new THREE.MeshLambertMaterial({
      color: 0x3333CC,
      vertexColors: THREE.VertexColors
    });

    const loader = new THREE.ColladaLoader();
    loader.load('/assets/canteen.dae', (collada) => {
      this.object = collada.scene;
      this.scene.add(this.object);
    });
    // (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }

    this.camera.position.z = 2;

    this.light = new THREE.SpotLight(0xffffff, 1.5);
    this.scene.add(this.light);

    this.renderer.setClearColor(0x222222);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', this.handleResize.bind(this), false);
    this.renderer.domElement.addEventListener('click', this.handleClick.bind(this), false);
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
    if (this.remoteCameraClock.getElapsedTime() > SMOOTH_TIME) {
      this.remoteCameraClock.stop();
      this.remoteCameraClock.elapsedTime = 0;
      t = 1;
    } else {
      t = this.remoteCameraClock.getElapsedTime() * (1 / SMOOTH_TIME);
    }

    if (this.remoteCameraTarget) {
      this.camera.position.lerp(this.remoteCameraTarget.position, t);
      this.camera.up.lerp(this.remoteCameraTarget.up, t);
      this.controls.target.lerp(this.remoteCameraTarget.target, t);
    }
  }

  handleControlsChanged() {
    this.socket.emit('camera', [
      this.camera.position.toArray(),
      this.camera.up.toArray(),
      this.controls.target.toArray(),
    ]);
  }

  handleClick(event) {
    event.preventDefault();
    if (this.selectedObject) {
      this.selectedObject.material = this.selectedObject.originalMaterial;
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, this.camera);
    const objects = raycaster.intersectObjects(this.scene.children, true);

    if (objects.length > 0) {
      const intersected = objects[0].object;

      intersected.originalMaterial = intersected.material;
      intersected.material = this.selectedMaterial;
      this.selectedObject = intersected;
    }
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
    this.light.position.copy(this.camera.position);
    this.light.position.y += 1; // this.scene.position.y + 1;

    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
}
