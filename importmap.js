const imports = {
  "regl": "./regl.js",
  "gl-matrix": "./node_modules/gl-matrix/esm/index.js"
};
const importmap = document.createElement('script');
importmap.type = 'importmap';
importmap.textContent = JSON.stringify({imports});
document.head.append(importmap);
