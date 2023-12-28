const vert = `
precision highp float;
attribute vec3 position;
attribute vec2 pointA, pointB;
uniform float width;
uniform mat4 projection;
void main() {
  vec2 xBasis = normalize(pointB - pointA);
  vec2 yBasis = vec2(-xBasis.y, xBasis.x);
  vec2 offsetA = pointA + width * (position.x * xBasis + position.y * yBasis);
  vec2 offsetB = pointB + width * (position.x * xBasis + position.y * yBasis);
  vec2 point = mix(offsetA, offsetB, position.z);
  gl_Position = projection * vec4(point, 0, 1);
}`;
export {vert};
