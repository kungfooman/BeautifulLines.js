import {vert} from './interleaved-strip-round-cap-join-vert.js';
import {frag} from './interleaved-strip-round-cap-join-frag.js';
/**
 * @param {import('regl').Regl} regl 
 * @param {number} resolution
 */
function roundCapJoinGeometry(regl, resolution) {
  const instanceRoundRound = [
    [0, -0.5, 0],
    [0, -0.5, 1],
    [0, 0.5, 1],
    [0, -0.5, 0],
    [0, 0.5, 1],
    [0, 0.5, 0],
  ];
  // Add the left cap.
  for (let step = 0; step < resolution; step++) {
    const theta0 = Math.PI / 2 + ((step + 0) * Math.PI) / resolution;
    const theta1 = Math.PI / 2 + ((step + 1) * Math.PI) / resolution;
    instanceRoundRound.push([0, 0, 0]);
    instanceRoundRound.push([0.5 * Math.cos(theta0), 0.5 * Math.sin(theta0), 0]);
    instanceRoundRound.push([0.5 * Math.cos(theta1), 0.5 * Math.sin(theta1), 0]);
  }
  // Add the right cap.
  for (let step = 0; step < resolution; step++) {
    const theta0 = (3 * Math.PI) / 2 + ((step + 0) * Math.PI) / resolution;
    const theta1 = (3 * Math.PI) / 2 + ((step + 1) * Math.PI) / resolution;
    instanceRoundRound.push([0, 0, 1]);
    instanceRoundRound.push([0.5 * Math.cos(theta0), 0.5 * Math.sin(theta0), 1]);
    instanceRoundRound.push([0.5 * Math.cos(theta1), 0.5 * Math.sin(theta1), 1]);
  }
  return {
    buffer: regl.buffer(instanceRoundRound),
    count: instanceRoundRound.length,
  };
}
/**
 * @param {import('regl').Regl} regl 
 * @param {number} resolution 
 */
export function interleavedStripRoundCapJoin(regl, resolution) {
  const roundCapJoin = roundCapJoinGeometry(regl, resolution);
  return regl({
    vert,
    frag,
    attributes: {
      position: {
        buffer: roundCapJoin.buffer,
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
    },
    uniforms: {
      width: regl.prop/*<any, any>*/("width"),
      color: regl.prop/*<any, any>*/("color"),
      projection: regl.prop/*<any, any>*/("projection"),
    },
    depth: {
      enable: false,
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
    count: roundCapJoin.count,
    instances: regl.prop/*<any, any>*/("segments"),
    viewport: regl.prop/*<any, any>*/("viewport"),
  });
}
