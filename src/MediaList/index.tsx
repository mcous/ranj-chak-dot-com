// story list component
import { createElement, JSX } from 'preact'

import { MediaItem as MediaItemProps } from '../types'
import { MediaItem } from './MediaItem'

const CX = 'cf tac'

export interface MediaListProps {
  items: MediaItemProps[]
}

export function MediaList(props: MediaListProps): JSX.Element {
  return <ul class={CX}>{props.items.map(MediaItem)}</ul>
}
