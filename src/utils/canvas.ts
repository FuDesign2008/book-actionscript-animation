/**
 *
 * @author fuyg
 * @date  2019-07-18
 */

function createCanvas(width = 400, height = 400) {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export { createCanvas }
