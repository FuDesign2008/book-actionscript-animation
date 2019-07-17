/**
 *
 * @author fuyg
 * @date  2019-07-17
 */

import BlurFilter from './filter/BlurFilter'
import FilterConstructor from './filter/FilterConstructor'
import GrayFilter from './filter/GrayFilter'
import GrayFilterAlgorithm from './filter/GrayFilterAlgorithm'

interface FilterConfigItem {
  filterClass: FilterConstructor
  options: any
}

const filterConfig: FilterConfigItem[] = [
  {
    filterClass: BlurFilter,
    options: {
      x: 250,
      y: 300,
      width: 100,
      height: 100,
      radius: 1,
    },
  },
  {
    filterClass: GrayFilter,
    options: {
      x: 550,
      y: 100,
      width: 100,
      height: 100,
    },
  },
  {
    filterClass: GrayFilter,
    options: {
      x: 350,
      y: 200,
      width: 100,
      height: 100,
      algorithm: GrayFilterAlgorithm.G,
    },
  },
]

export default filterConfig
