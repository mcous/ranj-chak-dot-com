import { ComponentChildren } from 'preact'

export type SectionName = keyof SectionContentMap

export interface ContentSection {
  name: SectionName
  title: string
  label: string
}

export interface SectionContentMap {
  film: MediaItem[]
  writing: MediaItem[]
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
  doodle: AboutDoodle
  content: ComponentChildren[]
}

export interface AboutDoodle {
  areas: AboutDoodleHitbox[]
  defaultImage: string
}

export interface AboutDoodleHitbox {
  box: [number, number, number, number]
  image: string
}

export interface AppStateContextValue {
  modal: MediaItem | null
  setModal: (current: MediaItem | null) => unknown
}
