import { createElement, JSX } from 'preact'

import { SECTIONS } from './sections'
import { Section } from './Section'

const CONTENTS_CX = 'w-100'

export function Contents(): JSX.Element {
  return <div class={CONTENTS_CX}>{SECTIONS.map(Section)}</div>
}

export * from './sections'
