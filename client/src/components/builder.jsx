import * as THREE from "three";
const SCALE_CD = 1;
const positionRegex = /^[A-Z]\d{2}_\d{2}[A-Z]_\d{2}$/;
const columnsRegex = /^(FRONT|BACK) COLUMN - \d+$/;

const matBase = new THREE.MeshLambertMaterial({ color: 0xced4da });
const matShelf = new THREE.MeshLambertMaterial({ color: 0x0000ee });
const material = new THREE.MeshLambertMaterial({ color: 0xd5d5d5 });

function buildLOD(group, structures, pixelMeterRelation) {
  const count = structures.length;

  /*ASIGNA TIPOS*/
  for (let i = 0; i < count; i++) {
    const structure = structures[i];
    asignaTipo(structure);
  }

  for (let i = 0; i < count; i++) {
    const structure = structures[i];
    buildCDStructureLOD(group, structure, pixelMeterRelation);
  }
}

function createStructurePart(part, view3d = false) {
  let mat = null;
  switch (part.type) {
    case "BASE":
      mat = matBase;
      break;
    case "STRUCTURE":
      mat = matShelf;
      break;
    case "OTHER":
      mat = material;
      break;
  }

  const dimY = view3d ? part.dim_y * SCALE_CD : 0.1;
  const posY = view3d ? part.pos_y * SCALE_CD : 0;

  const geometry = new THREE.BoxGeometry(part.dim_x * SCALE_CD, dimY, part.dim_z * SCALE_CD);

  const grPart = new THREE.Mesh(geometry, mat);

  grPart.name = part.name;
  grPart.position.x = part.pos_x * SCALE_CD;
  grPart.position.y = posY;
  grPart.position.z = part.pos_z * SCALE_CD;
  grPart.updateMatrix();
  grPart.matrixAutoUpdate = false;

  return grPart;
}

function createStructure(structure, view3d = false) {
  let mat = material;
  const dimY = view3d ? structure.dim_y * SCALE_CD : 0.1;
  const posY = view3d ? (structure.dim_y * SCALE_CD) / 2.0 : 0;

  const geometry = new THREE.BoxGeometry(structure.dim_x * SCALE_CD, dimY, structure.dim_z * SCALE_CD);

  const grStructure = new THREE.Mesh(geometry, mat);

  grStructure.name = structure.name;
  grStructure.position.y = posY;
  grStructure.updateMatrix();
  grStructure.matrixAutoUpdate = false;

  return grStructure;
}

function asignaTipo(structure) {
  const parts = structure.parts;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (positionRegex.test(part.name)) {
      part["type"] = "BASE";
    } else {
      if (columnsRegex.test(part.name)) {
        part["type"] = "STRUCTURE";
      } else {
        part["type"] = "OTHER";
      }
    }
  }
}

function buildCDStructureLOD(group, structure, pixelMeterRelation = 1) {
  const parts = structure.parts;
  const grStructure = new THREE.Group();
  const grLow = new THREE.Group();
  const grHigh = new THREE.Group();

  grStructure.name = structure.name;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    switch (part.type) {
      case "BASE":
      case "STRUCTURE":
        grLow.add(createStructurePart(part));
      case "OTHER":
        grHigh.add(createStructurePart(part));
    }
  }

  const lod = new THREE.LOD();
  lod.addLevel(grHigh, 10);
  lod.addLevel(grLow, 35);
  lod.addLevel(createStructure(structure), 70);

  grStructure.add(lod);
  grStructure.position.x = structure.pos_x * pixelMeterRelation;
  grStructure.position.y = structure.pos_y * pixelMeterRelation;
  grStructure.position.z = structure.pos_z * pixelMeterRelation;
  grStructure.rotateY((structure.rot * 3.14) / 180);

  group.add(grStructure);
}

export { buildLOD };
