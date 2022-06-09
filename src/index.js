import * as THREE from 'three';

function createCube(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;
    return cube;
}

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue

  //add a light
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const cube = new THREE.Mesh(geometry, material);
  const cube2 = createCube(geometry, 0x8844aa, -2)
  const cube3 = createCube(geometry, 0x32b5ed,  2)
  let elements = [cube, cube2, cube3]
  scene.add(cube);
  scene.add(cube2)
  scene.add(cube3)


  function render(time) {
    time *= 0.001;  // convert time to seconds
    elements.forEach((e) => {
        e.rotation.x = time;
        e.rotation.y = time;
    })

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}



main();
