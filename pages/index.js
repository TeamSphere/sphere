import React, { useEffect} from 'react'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Home = () => {
  useEffect(() => {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );


    // Create our sphere
    const geometry = new THREE.SphereGeometry(3,64,64)
    const material = new THREE.MeshStandardMaterial({
      color: "#fb8c00",
    })
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const camera = new THREE.PerspectiveCamera(
      25,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 20;

 

    //Renderer
    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(2);
    document.body.appendChild(renderer.domElement);


    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(0,10,10);
    scene.add(pointLight);

    const animate = () => {
      renderer.setSize(sizes.width, sizes.height);
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();

    //Cntrols
    const controls = new OrbitControls(camera,canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    //Resize
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.updateProjectionMatrix();
      camera.aspect = sizes.width / sizes.height;
      renderer.setSize(sizes.width, sizes.height);
    });

    const loop = () => {
      controls.update();
      renderer.render(scene,camera);
      window.requestAnimationFrame(loop);
    }
    loop();

  }, []);

  return (
    <>
      <div className="main">
        <span className="pretitle">Welcome to the <strong>Sphere</strong></span>
        <h1>Defi at your <span class="highlight">fingertips.</span></h1>
        <div class="bottom">
          <p>© Copyright 2023. All Rights Reserved<br/></p>
        </div>
        <a className="bottom-github" href="https://github.com/TeamSphere/sphere">Made with ❤️ by Team Sphere - View on Github</a>
      </div>
      <canvas id="myThreeJsCanvas" />
    </>
  )
}

export default Home