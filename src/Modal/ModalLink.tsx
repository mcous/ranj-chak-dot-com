import { createElement, JSX, ComponentChildren } from 'preact'
import { useAppState } from '../state'
import { MediaItem } from '../types'

export interface ModalLinkProps {
  item: MediaItem
  modal?: boolean
  class?: string
  style?: { [name: string]: string | number }
  children?: ComponentChildren
}

export function ModalLink(props: ModalLinkProps): JSX.Element {
  const { setModal } = useAppState()
  const { item, modal, style, children, class: cx } = props
  const { name, link } = item

  const handleClick = (event: MouseEvent): void => {
    setModal(item)
    event.preventDefault()
  }

  return (
    <a
      class={cx}
      style={style}
      title={name}
      href={link}
      onClick={modal ? handleClick : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
