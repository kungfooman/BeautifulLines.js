import REGL from "regl";
import { new2d } from "./new-2d/new-2d.js";
import { old2d } from "./old-2d/old-2d.js";
/**
 * @param {HTMLElement} element 
 * @returns 
 */
function visible(element) {
  const rect = element.getBoundingClientRect();
  return rect.bottom >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
}
const canvas = document.createElement("canvas");
const regl = REGL({ canvas, extensions: ["ANGLE_instanced_arrays"] });
const renderNew = new2d(regl);
/**
 * @param {string} canvasid 
 * @param {boolean} color 
 * @param {"miter" | "bevel" | "round" | "none"} join 
 * @param {"round" | "square" | "none"} cap 
 * @param {boolean} terminal 
 * @param {number} alpha 
 */
export function newStrip(canvasid, color, join, cap, terminal, alpha) {
  function loop() {
    requestAnimationFrame(loop);
    const targetcanvas = document.getElementById(canvasid);
    if (!(targetcanvas instanceof HTMLCanvasElement)) {
      throw new Error("missing canvas");
    }
    if (!visible(targetcanvas)) return;
    if (targetcanvas.width !== targetcanvas.clientWidth || targetcanvas.height !== targetcanvas.clientHeight) {
      targetcanvas.width = targetcanvas.clientWidth;
      targetcanvas.height = targetcanvas.clientHeight;
    }
    if (canvas.width !== targetcanvas.clientWidth || canvas.height !== targetcanvas.clientHeight) {
      canvas.width = targetcanvas.clientWidth;
      canvas.height = targetcanvas.clientHeight;
    }
    renderNew(targetcanvas, color, join, cap, terminal, alpha);
    const ctx = targetcanvas.getContext("2d");
    ctx?.clearRect(0, 0, targetcanvas.width, targetcanvas.height);
    ctx?.drawImage(canvas, 0, 0);
  }
  requestAnimationFrame(loop);
};
const renderOld = old2d(regl);
/**
 * @param {string} canvasid 
 * @param {boolean} segments 
 * @param {number} alpha 
 */
export function oldStrip(canvasid, segments, alpha) {
  function loop() {
    requestAnimationFrame(loop);
    const targetcanvas = document.getElementById(canvasid);
    if (!(targetcanvas instanceof HTMLCanvasElement)) {
      throw new Error("missing canvas");
    }
    if (!visible(targetcanvas)) {
      return;
    }
    if (targetcanvas.width !== targetcanvas.clientWidth || targetcanvas.height !== targetcanvas.clientHeight) {
      targetcanvas.width = targetcanvas.clientWidth;
      targetcanvas.height = targetcanvas.clientHeight;
    }
    if (canvas.width !== targetcanvas.clientWidth || canvas.height !== targetcanvas.clientHeight) {
      canvas.width = targetcanvas.clientWidth;
      canvas.height = targetcanvas.clientHeight;
    }
    renderOld(targetcanvas, segments, alpha);
    const ctx = targetcanvas.getContext("2d");
    ctx?.clearRect(0, 0, targetcanvas.width, targetcanvas.height);
    ctx?.drawImage(canvas, 0, 0);
  }
  requestAnimationFrame(loop);
};
