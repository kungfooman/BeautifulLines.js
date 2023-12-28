import {positions, cells} from './interleaved-strip-geometry.js';
/**
 * @param {import('regl').Regl} regl 
 */
export function interleavedStripTerminalCommand(regl) {
  return regl({
    vert: `
        precision highp float;
        attribute vec2 position;
        attribute vec2 pA, pB, pC;
        uniform float width;
        uniform mat4 projection;
        void main() {
          if (position.x == 0.0) {
            vec2 xBasis = pB - pA;
            vec2 yBasis = normalize(vec2(-xBasis.y, xBasis.x));
            vec2 point = pA + xBasis * position.x + yBasis * width * position.y;
            gl_Position = projection * vec4(point, 0, 1);
            return;
          }
          // Find the normal vector.
          vec2 tangent = normalize(normalize(pC - pB) + normalize(pB - pA));
          vec2 normal = vec2(-tangent.y, tangent.x);
          // Find the perpendicular vectors.
          vec2 ab = pB - pA;
          vec2 cb = pB - pC;
          vec2 abNorm = normalize(vec2(-ab.y, ab.x));
          // Determine the bend direction.
          float sigma = sign(dot(ab + cb, normal));
          if (sign(position.y) == -sigma) {
            vec2 position = 0.5 * normal * -sigma * width / dot(normal, abNorm);
            gl_Position = projection * vec4(pB + position, 0, 1);
          } else {
            vec2 xBasis = pB - pA;
            vec2 yBasis = normalize(vec2(-xBasis.y, xBasis.x));
            vec2 point = pA + xBasis * position.x + yBasis * width * position.y;
            gl_Position = projection * vec4(point, 0, 1);
          }
        }`,
    frag: `
        precision highp float;
        uniform vec4 color;
        void main() {
          gl_FragColor = color;
        }`,
    attributes: {
      position: {
        buffer: regl.buffer(positions),
        divisor: 0,
      },
      pA: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 6,
      },
      pB: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 2,
        stride: Float32Array.BYTES_PER_ELEMENT * 6,
      },
      pC: {
        buffer: regl.prop/*<any, any>*/("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 4,
        stride: Float32Array.BYTES_PER_ELEMENT * 6,
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
