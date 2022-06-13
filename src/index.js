/* eslint-disable no-inner-declarations */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import "./index.css";

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 90;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFFFFF);

  var ambientLight = new THREE.AmbientLight( 0xcccccc, 1 );
  scene.add( ambientLight );
  // var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  // camera.add( pointLight );
  camera.position.x = 0;
  camera.position.y = -20;
  camera.position.z = 700;

  const loader = new GLTFLoader();

    loader.load( './models/phoenix_bird/scene.gltf', function ( gltf ) {
      scene.add( gltf.scene );
      renderer.render(scene, camera);
    }, undefined, function ( error ) {
      console.error( error );
    } );

}

main();