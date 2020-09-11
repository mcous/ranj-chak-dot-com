import { ComponentChildren } from 'preact'

export type SectionName = keyof SectionContentMap

export interface ContentSection {
  name: SectionName
  title: string
  label: string
}

export interface SectionContentMap {
  film: MediaItem[]
  art: MediaItem[]
  about: AboutContent
}

export interface MediaItem {
  name?: string
  label?: string
  modal?: boolean
  thumbnail?: ImageSrc
  link: string
}

export interface ImageSrc {
  src: string
  lowResSrc?: string
  color?: string
}

export interface AboutContent {
  content: ComponentChildren[]
}

export interface AppStateContextValue {
  modal: MediaItem | null
  setModal: (current: MediaItem | null) => unknown
}
