/**
 *
 * @author fuyg
 * @date  2019-07-16
 */

import OpacityBall from './sprite/OpacityBall'
import ScalingBall from './sprite/ScalingBall'
import SpriteConfigItem from './SpriteConfigItem'

const spriteConfig: SpriteConfigItem[] = [
  {
    classConstructor: ScalingBall,
    props: {
      speed: 0.07,
      radius: 50,
      innerRadius: 5,
      x: 300,
      y: 300,
    },
  },
  {
    classConstructor: OpacityBall,
    props: {
      speed: 0.01,
      radius: 100,
      innerRadius: 20,
      x: 100,
      y: 300,
    },
  },
]

export { spriteConfig }
