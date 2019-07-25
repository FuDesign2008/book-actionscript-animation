/**
 *
 * @author fuyg
 * @date  2019-07-18
 */

import BouncingBall from './sprite/BouncingBall'
import SpriteConfigItem from './SpriteConfigItem'

function createBouncingBallConfig(): SpriteConfigItem {
  const speedX = Math.round(Math.random() * 15) - 5
  const speedY = Math.round(Math.random() * 15) - 5
  const accelaration = Math.random()
  const friction = accelaration * 0.01

  return {
    classConstructor: BouncingBall,
    props: {
      accelaration,
      friction,
      x: 100,
      y: 150,
      speedX,
      speedY,
      radius: Math.round(Math.random() * 50) + 5,
    },
  }
}

const bouncingBallConfig: SpriteConfigItem[] = [...Array(10)].map(() => {
  const config = createBouncingBallConfig()
  return config
})

export default bouncingBallConfig
