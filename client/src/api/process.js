const positionRegex = /^[A-Z]\d{2}_\d{2}[A-Z]_\d{2}$/;
const columnsRegex = /^(FRONT|BACK) COLUMN - \d+$/;

function asignTypes(structures) {
  const count = structures.length;

  /*Asign type*/
  for (let i = 0; i < count; i++) {
    const structure = structures[i];
    asignPartType(structure);
  }
}

function groupPartsByType(structures) {
  const count = structures.length;
  const groupsBtTypes = new Map();

  /*Asign type*/
  asignTypes(structures);

  /*Group*/
  for (let i = 0; i < count; i++) {
    const structure = structures[i];
    group(groupsBtTypes, structure);
  }

  console.log("groupPartsByType ->", groupsBtTypes.keys());

  return groupsBtTypes;
}

function asignPartType(structure) {
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

function group(map, structure) {
  const parts = structure.parts;
  let arr = null;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    arr = map.get(part["type"]);

    if (!arr) {
      arr = [];
      map.set(part["type"], arr);
    }

    arr.push(part);
  }
}

export { groupPartsByType, asignTypes };
