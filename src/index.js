/* eslint-disable no-inner-declarations */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import "./index.css";

let camera, scene, renderer, mixer, mixer2, controls;
let clock = new THREE.Clock();
main();
animate();


function main() {
  const canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.outputEncoding = THREE.sRGBEncoding;

  const fov = 90;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

  controls = new OrbitControls( camera, renderer.domElement );

  //controls.update() must be called after any manual changes to the camera's transform
  camera.position.set( 0, 20, 100 );
  controls.update();

  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFFFFF);

  let ambientLight = new THREE.AmbientLight( 0xcccccc, 1 );
  scene.add( ambientLight );
  var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  pointLight.position.set( 50, 50, 50 );
  camera.add( pointLight );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 700;

  const loader = new GLTFLoader();

  loadPhoenix(loader);
  loadGalaxy(loader);
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  if (mixer ) mixer.update( clock.getDelta() );
  if (mixer2 ) mixer2.update( clock.getDelta() );
    requestAnimationFrame(animate);
    controls.update();
    render(renderer, scene, camera);
}

function loadPhoenix(loader) {
  loader.load( './models/phoenix_bird/scene.gltf', function ( gltf ) {
    let model = new THREE.Object3D();
    model =  gltf.scene;
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();
    scene.add(model);
    renderer.render(scene, camera);
  }, undefined, function ( error ) {
    console.error("Could not load phoenix");
    console.error( error );
  } );
}

function loadGalaxy(loader) {
  loader.load( './models/need_some_space/scene.gltf', function ( gltf ) {
    let galaxy = new THREE.Object3D();
    galaxy =  gltf.scene;
    mixer2 = new THREE.AnimationMixer(galaxy);
    mixer2.clipAction(gltf.animations[0]).play();
    scene.add(galaxy);
    renderer.render(scene, camera);
  }, undefined, function ( error ) {
    console.error("Could not load galaxy");
    console.error( error );
  } );
}
