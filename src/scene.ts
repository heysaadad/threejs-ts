import { createreticle } from "./objects/reticle";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { handleXRHitTest } from "./utils/hitTest";

import {
  AmbientLight,
  DirectionalLight,
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  XRFrame,
} from "three";

export function createScene(renderer: WebGLRenderer) {
  const scene = new Scene()
  const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.02, 60,)
  const reticle = createreticle();
  let ObjModel: Object3D;
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("https://s3-eu-west-1.amazonaws.com/fetchcfd/original/file-1571062496022.glb", (gltf: GLTF) => {
    ObjModel = gltf.scene.children[0];
  });
  
  const controller = renderer.xr.getController(0);
  scene.add(controller);
  controller.addEventListener("select", onSelect);
  const ambientLight = new AmbientLight(0xffffff, 3.0);
  scene.add(ambientLight);
  const directionalLight = new DirectionalLight( 0xffffff, 1 );
  scene.add( directionalLight );

  function onSelect() {
    if (reticle.visible) {
      const model = ObjModel.clone();
      model.position.setFromMatrixPosition(reticle.matrix);
      model.visible = true;
      scene.add(model);
    }
  }
  scene.add(reticle);
  
  const renderLoop = (timestamp: number, frame?: XRFrame) => {   
    if (renderer.xr.isPresenting) {
      if (frame) {
        handleXRHitTest(renderer, frame, (hitPoseTransformed: Float32Array) => {
          if (hitPoseTransformed) {
            reticle.visible = true;
            reticle.matrix.fromArray(hitPoseTransformed);
          }
        }, () => {
          reticle.visible = false;
        })
      }
      renderer.render(scene, camera);
    }
  }
  renderer.setAnimationLoop(renderLoop);
};
