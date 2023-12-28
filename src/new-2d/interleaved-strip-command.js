import {positions, cells} from './interleaved-strip-geometry.js';
import {vert            } from './interleaved-strip-vert.js';
import {frag            } from './interleaved-strip-frag.js';
/**
 * @param {import('regl').Regl} regl 
 */
export function interleavedStripCommand(regl) {
  return regl({
    vert,
    frag,
    attributes: {
      position: {
        buffer: regl.buffer(positions),
        divisor: 0,
      },
      pA: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
      },
      pB: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 2,
      },
      pC: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 4,
      },
      pD: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 6,
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
    depth: {
      enable: false,
    },
    elements: regl.elements(cells),
    instances: regl.prop/*<any, any>*/("segments"),
    viewport: regl.prop/*<any, any>*/("viewport"),
  });
}
