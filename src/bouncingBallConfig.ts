/**
 *
 * @author fuyg
 * @date  2019-07-18
 */

import BouncingBall from './graphic/BouncingBall'
import GraphicConfigItem from './GraphicConfigItem'

function createBouncingBallConfig(): GraphicConfigItem {
  const speedX = Math.round(Math.random() * 15) - 5
  const speedY = Math.round(Math.random() * 15) - 5
  const accelaration = Math.random()
  const friction = accelaration * 0.01

  return {
    graphicClass: BouncingBall,
    props: {
      accelaration,
      friction,
      x: 100,
      y: 150,
      speedX,
      speedY,
    },
  }
}

const bouncingBallConfig: GraphicConfigItem[] = [...Array(20)].map(() => {
  const config = createBouncingBallConfig()
  return config
})

export default bouncingBallConfig
