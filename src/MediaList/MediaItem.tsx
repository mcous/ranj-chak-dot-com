// story list component
import { createElement, JSX } from 'preact'
import { useRef, useState, useCallback } from 'preact/hooks'
import { windowOrNull } from '../window'
import { useDebouncedListener } from '../hooks'
import { ModalLink } from '../Modal'
import { MediaItem as MediaItemProps } from '../types'

const LAZY_LOAD_THRESHOLD = 512

const LINK_CX = 'db w-100 h-100 bg-cover bg-center bg-no-repeat'
const BG_OVERLAY_CX = 'relative w-100 h-100 transition-bg-color bg-black-40'
const TITLE_CX = 'media-item-title f5 bold white uppercase lh-title'
const LABEL_CX = 'media-item-label white f6 lh-title'

export function MediaItem(
  props: MediaItemProps,
  index: number,
  coll: MediaItemProps[]
): JSX.Element {
  const itemRef = useRef<HTMLLIElement | null>(null)
  const [showLabel, setShowLabel] = useState(false)
  const [loadHighRes, setLoadHighRes] = useState(index <= 6)
  const loadHighResRef = useRef(loadHighRes)

  const handleScroll = useCallback((): void => {
    if (itemRef.current) {
      const midLine = window.innerHeight / 2
      const { top, bottom } = itemRef.current.getBoundingClientRect()

      setShowLabel(top < midLine && bottom > midLine)
      loadHighResRef.current = top < window.innerHeight + LAZY_LOAD_THRESHOLD
      setLoadHighRes(loadHighResRef.current)
    }
  }, [itemRef.current])

  useDebouncedListener(windowOrNull, 'scroll', handleScroll)

  const { name, label, modal, thumbnail } = props
  const style: { [name: string]: string } = {}

  if (thumbnail) {
    const { src, lowResSrc, color } = thumbnail
    const images = []
    if (loadHighResRef.current) images.push(`url(${src})`)
    if (lowResSrc) images.push(`url(${lowResSrc})`)
    if (color) style.backgroundColor = color
    style.backgroundImage = images.join(',')
  }

  let itemCx = 'media-item'

  if (index >= 3 && coll.length - index > 3) {
    if (index % 3 === 0) itemCx += ' big'
    if (index % 6 === 0) itemCx += ' right'
  }

  if (coll.length - index < 3) itemCx += ' last'
  if (showLabel) itemCx += ' show-label'

  return (
    <li class={itemCx} ref={itemRef}>
      <ModalLink item={props} class={LINK_CX} style={style} modal={modal}>
        {name && (
          <div class={BG_OVERLAY_CX}>
            <h3 class={TITLE_CX}>{name}</h3>
            <p class={LABEL_CX}>{label}</p>
          </div>
        )}
      </ModalLink>
    </li>
  )
}
