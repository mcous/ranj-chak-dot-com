import { createElement, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { MediaItem } from '../types'
import VideoEmbed, { VIMEO, YOUTUBE } from '../VideoEmbed'

const CX =
  'fixed absolute--fill pa2 pa4-bp2 bg-black-70 flex align-center justify-center transition-opacity'
const WRAPPER_CX = 'flex relative w-90 w-70-bp3 mxw-100 mxh-100'
const CLOSE_BTN_CX = 'close-button'
const IMG_CX =
  'object-contain object-center pa2 pa3-bp2 pa4-bp3 bg-white radius'

const stopPropagation = (event: Event): void => event.stopPropagation()

interface ModalContentsProps {
  item: MediaItem
  setItem: (current: MediaItem | null) => unknown
}

export function ModalContents(props: ModalContentsProps): JSX.Element {
  const { item, setItem } = props
  const { name, link } = item
  const [show, setShow] = useState(false)
  const close = (): void => {
    setShow(false)
    setTimeout(() => setItem(null), 150)
  }

  useEffect((): (() => void) => {
    setShow(true)
    window.document.documentElement.classList.add('overflow-hidden')
    return (): void =>
      window.document.documentElement.classList.remove('overflow-hidden')
  }, [])

  let children: JSX.Element

  if (link.indexOf('https://vimeo.com') === 0) {
    const videoId = link.split('/').slice(-1)[0]
    children = <VideoEmbed site={VIMEO} videoId={videoId} />
  } else if (link.indexOf('https://www.youtube.com') === 0) {
    const videoId = link.split('=').slice(-1)[0]
    children = <VideoEmbed site={YOUTUBE} videoId={videoId} />
  } else {
    children = <img class={IMG_CX} src={link} alt={name} />
  }

  return (
    <div class={`${CX} opacity-${show ? '100' : '0'}`} onClick={close}>
      <div class={WRAPPER_CX} onClick={stopPropagation}>
        {children}
        <button
          class={CLOSE_BTN_CX}
          type="button"
          onClick={close}
          title="close"
        />
      </div>
    </div>
  )
}
