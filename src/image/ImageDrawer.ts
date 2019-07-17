/**
 *
 * @author fuyg
 * @date  2019-07-17
 */

class ImageDrawer {
  private context2d: CanvasRenderingContext2D
  private imageUrl: string
  private imageDom: HTMLImageElement | null

  constructor(context2d: CanvasRenderingContext2D, imageUrl: string) {
    this.context2d = context2d
    this.imageUrl = imageUrl
    this.imageDom = null
    this.loadImage()
  }

  loadImage(): Promise<null> {
    return new Promise((resolve, reject) => {
      const { imageUrl, imageDom } = this
      if (imageDom) {
        resolve()
      }
      const image = new Image()
      image.onload = () => {
        this.imageDom = image
        resolve()
      }
      image.onerror = image.onabort = () => {
        reject()
      }
      image.src = imageUrl
    })
  }

  draw() {
    const { imageDom, context2d } = this
    if (imageDom) {
      context2d.drawImage(imageDom, 0, 0, imageDom.width, imageDom.height)
    }
  }
}

export default ImageDrawer
