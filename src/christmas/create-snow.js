import * as THREE from 'three';

let container,
  camera,
  scene,
  renderer,
  particles = [],
  material,
  map,
  textureLoader;
const halfX = window.innerWidth / 2;
const halfY = window.innerHeight / 2;
let mouseX = 0,
  mouseY = 0;
const fallSpeen = 2;
const amount = 1000;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Init(el) {
  if (!el) return;
  container = document.createElement('div');
  el.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 100;

  scene = new THREE.Scene();

  textureLoader = new THREE.TextureLoader();
  map = textureLoader.load('snow-32.png');
  material = new THREE.SpriteMaterial({ map: map });

  for (let i = 0; i < amount; i++) {
    const particle = new THREE.Sprite(material);
    const randomScale = randomRange(10, 20);

    particle.position.x = randomRange(-1000, 1000);
    particle.position.y = randomRange(-1000, 1000);
    particle.position.z = randomRange(-1000, 1000);
    particle.scale.x = particle.scale.y = particle.scale.z = randomScale;
    particle.v = new THREE.Vector3(0, -fallSpeen, 0);
    particle.v.z = 1 * randomRange(-1, 1);
    particle.v.x = 1 * randomRange(-1, 1);

    particles.push(particle);
    scene.add(particle);
  }

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', mouseHandler, false);
  document.addEventListener('touchstart', touchHandler, false);
  document.addEventListener('touchmove', touchHandler, false);

  animate();
}

function mouseHandler(e) {
  mouseX = e.clientX - halfX;
  mouseY = e.clientY - halfY;
}

function touchHandler(e) {
  e.preventDefault();
  mouseX = e.touches[0].pageX - halfX;
  mouseY = e.touches[0].pageY - halfY;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const pp = particle.position;

    pp.add(particle.v);

    if (pp.y < -1000) pp.y = 1000;
    if (pp.x > 1000) pp.x = -1000;
    else if (pp.x < -1000) pp.x = 1000;
    if (pp.z > 1000) pp.z = -1000;
    else if (pp.z < -1000) pp.z = 1000;
  }

  camera.position.x += (mouseX - camera.position.x) * 0.0005;
  camera.position.y += (-mouseY - camera.position.y) * 0.0005;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

export default Init;
