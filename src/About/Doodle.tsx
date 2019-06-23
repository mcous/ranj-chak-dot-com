// about page
import { createElement, JSX } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { useInterval } from '../hooks'
import { AboutDoodle as DoodleProps } from '../types'

const SWITCH_INTERVAL_MS = 1500

const CX = 'relative'
const IMG_CX = 'w6 w7-bp3'
const ABS_IMG_CX = `${IMG_CX} absolute top-0 left-0`

export function Doodle(props: DoodleProps): JSX.Element {
  const { areas, defaultImage } = props
  const [current, setCurrent] = useState(defaultImage)
  const [switching, setSwitching] = useState(true)
  const wrapperRef = useRef<HTMLElement | null>(null)
  const images = [defaultImage, ...areas.map(a => a.image)]
  const imageCx = (src: string): string =>
    `${src === defaultImage ? IMG_CX : ABS_IMG_CX} opacity-${
      src === current ? 100 : 0
    }`

  useEffect(() => {
    const $el = wrapperRef.current

    if ($el) {
      const handleMouseMove = (event: MouseEvent): void => {
        const { left, top, width, height } = $el.getBoundingClientRect()
        const { clientX, clientY } = event
        const x = (clientX - left) / width
        const y = (clientY - top) / height

        setSwitching(false)
        areas
          .filter(
            a => x > a.box[0] && y > a.box[1] && x < a.box[2] && y < a.box[3]
          )
          .forEach(a => setCurrent(a.image))
      }

      const handleMouseOut = (): void => {
        setSwitching(true)
      }

      $el.addEventListener('mousemove', handleMouseMove)
      $el.addEventListener('mouseout', handleMouseOut)

      return () => {
        $el.removeEventListener('mousemove', handleMouseMove)
        $el.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [])

  useInterval(
    () => {
      const nextIndex = images.indexOf(current) + 1
      const next = nextIndex >= images.length ? images[0] : images[nextIndex]
      setCurrent(next)
    },
    switching ? SWITCH_INTERVAL_MS : null
  )

  return (
    <div class={CX} ref={wrapperRef}>
      {images.map((src, i) => (
        <img key={i} src={src} class={imageCx(src)} />
      ))}
    </div>
  )
}
