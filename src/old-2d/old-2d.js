import {mat4                           } from 'gl-matrix';
import {interleavedStripCommand        } from './interleaved-strip-command.js';
import {interleavedStripRoundCapJoin   } from './interleaved-strip-round-cap-join.js';
import {generateSamplePointsInterleaved} from '../generateSamplePointsInterleaved.js';
/**
 * @param {import('regl').Regl} regl 
 */
export function old2d(regl) {
  const interleavedStrip = interleavedStripCommand(regl);
  const roundRound = interleavedStripRoundCapJoin(regl, 16);
  const pointsBuffer = regl.buffer(0);
  /**
   * @param {HTMLCanvasElement} canvas 
   * @param {boolean} segments 
   * @param {number} alpha 
   */
  function render(canvas, segments, alpha) {
    const {width, height} = canvas;
    const points     = generateSamplePointsInterleaved(width, height);
    const projection = mat4.ortho(mat4.create(), -width / 2, width / 2, -height / 2, height / 2, 0, -1);
    const viewport   = {x: 0, y: 0, width, height};
    const scaleX     = 0.45 * Math.sin(performance.now() * 0.002) + 0.75;
    const scaleY     = Math.sin(performance.now() * 0.0003);
    const scaledData = points.map(([x, y]) => [x * scaleX, y * scaleY]);
    regl.clear({ color: [0, 0, 0, 0] });
    const command = segments ? interleavedStrip : roundRound;
    command({
      points: pointsBuffer(scaledData),
      segments: points.length - 1,
      width: width * 0.05,
      color: [0.25, 0.25, 0.25, alpha],
      projection,
      viewport,
    });
  }
  return render;
}
