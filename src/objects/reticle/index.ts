import { Mesh, MeshBasicMaterial, RingGeometry } from "three";

export function createreticle() {
  const reticleMaterial = new MeshBasicMaterial({ color: 0xffffff });  
  const reticleGeometry = new RingGeometry(0.14, 0.15, 16).rotateX(
    -Math.PI / 2,
  );
  const reticle = new Mesh(reticleGeometry, reticleMaterial);
  reticle.matrixAutoUpdate = false;
  return reticle;
};
