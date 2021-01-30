interface Offset {
  width: number
  height: number
}

interface ShadowType {
  elevation: number
  shadowColor: string
  shadowOffset: Offset
  shadowOpacity: number
  shadowRadius: number
}

export function elevationShadowStyle(elevation: number): ShadowType {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  }
}
