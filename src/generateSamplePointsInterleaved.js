/**
 * @param {number} width 
 * @param {number} height 
 * @returns {number[][]}
 */
function generateSamplePointsInterleaved(width, height) {
  const stepx = width / 9;
  const stepy = height / 10;
  /** @type {number[][]} */
  const points = [];
  for (let x = 1; x < 9; x += 2) {
    points.push([(x + 0) * stepx - width / 2, 3 * stepy - height / 2]);
    points.push([(x + 1) * stepx - width / 2, 7 * stepy - height / 2]);
  }
  return points;
}

export {generateSamplePointsInterleaved};
