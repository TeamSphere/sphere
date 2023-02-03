import React, { useEffect} from 'react'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Home = () => {
  useEffect(() => {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000);


    // Create our sphere
    const geometry = new THREE.SphereGeometry(3,64,64)
    const material = new THREE.MeshStandardMaterial({
      color: "#fb8c00",
    })
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff
    });

    const starVertices = []
    for (let i=0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = -Math.random() * 1000
      starVertices.push(x, y, z)
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

    const stars = new THREE.Points(
      starGeometry, starMaterial
    )
    
    scene.add(stars)

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const camera = new THREE.PerspectiveCamera(
      25,
      sizes.width / sizes.height,
      5,
      3000
    );
    camera.position.z = 25;

 

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
        <h1>The world of defi<br/> at your <span class="highlight">fingertips.</span></h1>
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