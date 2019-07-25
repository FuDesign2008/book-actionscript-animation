/**
 *
 * @author fuyg
 * @date  2019-07-16
 */

import bouncingBallConfigSprite from './bouncingBallConfigSprite'
import CircularBall from './sprite/CircularBall'
import EasingBall from './sprite/EasingBall'
import EllipseBall from './sprite/EllipseBall'
import MovableBall from './sprite/MovableBall'
import OpacityBall from './sprite/OpacityBall'
import RotationBall from './sprite/RotationBall'
import ScalingBall from './sprite/ScalingBall'
import VectorBall from './sprite/VectorBall'
import SpriteConfigItem from './SpriteConfigItem'

const isSimple = false

const spriteConfig: SpriteConfigItem[] = [
  {
    classConstructor: ScalingBall,
    props: {
      speed: 0.02,
      radius: 50,
      innerRadius: 5,
      x: 100,
      y: 100,
    },
  },
  {
    classConstructor: EasingBall,
    props: {
      easing: 0.05,
    },
  },
  {
    classConstructor: EasingBall,
    props: {
      easing: 0.1,
    },
  },
  {
    classConstructor: MovableBall,
    props: {
      speed: 2,
      x: 400,
      y: 200,
    },
  },
  {
    classConstructor: VectorBall,
    props: {
      accelaration: 0.05,
      friction: 0.02,
      x: 400,
      y: 250,
    },
  },
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
  {
    classConstructor: CircularBall,
    props: {
      speed: 0.01,
      radius: 100,
      x: 500,
      y: 200,
    },
  },
  {
    classConstructor: CircularBall,
    props: {
      speed: 0.03,
      radius: 150,
      x: 700,
      y: 200,
    },
  },
  {
    classConstructor: EllipseBall,
    props: {
      speed: 0.01,
      radius: 100,
      longRadius: 200,
      x: 1000,
      y: 250,
    },
  },
  {
    classConstructor: RotationBall,
    props: {
      speed: 0.01,
      radius: 20,
      x: 1000,
      y: 250,
    },
  },
  ...bouncingBallConfigSprite,
]

if (isSimple) {
  spriteConfig.length = 5
}

export { spriteConfig }
