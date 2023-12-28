import {frag} from './miter-join-command-frag.js';
import {vert} from './miter-join-command-vert.js';
const geometry = {
  positions: [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ],
  cells: [
    [0, 1, 2],
    [0, 2, 3],
  ],
};
/**
 * @param {import('regl').Regl} regl
 */
export function miterJoinCommand(regl) {
  return regl({
    vert,
    frag,
    depth: {
      enable: false,
    },
    attributes: {
      position: {
        buffer: regl.buffer(geometry.positions),
        divisor: 0,
      },
      pointA: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
      },
      pointB: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 2,
      },
      pointC: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 4,
      },
    },
    uniforms: {
      width: regl.prop/*<any, any>*/("width"),
      color: regl.prop/*<any, any>*/("color"),
      projection: regl.prop/*<any, any>*/("projection"),
    },
    blend: {
      enable: true,
      func: {
        src: "src alpha",
        dst: "one minus src alpha",
      },
    },
    cull: {
      enable: true,
      face: "back",
    },
    elements: regl.elements(geometry.cells),
    instances: regl.prop/*<any, any>*/("instances"),
    viewport: regl.prop/*<any, any>*/("viewport"),
  });
}
