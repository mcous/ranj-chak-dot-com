import { createElement, JSX } from 'preact'
import { useRef } from 'preact/hooks'

import { ContentSection as SectionProps, SectionName } from '../types'
import { About } from '../About'
import { MediaList } from '../MediaList'
import { CONTENT_BY_SECTION } from './content'

const SECTION_CX = 'w-100 pb4 mb4 bb'
const TITLE_CX = 'clip'
const HERO_WRAPPER_CX = 'center w5 mb3 pl3 pr3 pl0-bp1 pr0-bp1'
const HERO_CX = 'aspect aspect--16-9 bg-center bg-no-repeat nav-link-icon'

function createSection(name: SectionName): JSX.Element {
  switch (name) {
    case 'film':
    case 'art': {
      return <MediaList items={CONTENT_BY_SECTION[name]} />
    }

    case 'about': {
      return <About {...CONTENT_BY_SECTION[name]} />
    }
  }
}

export function Section(props: SectionProps): JSX.Element {
  const { name, title, label } = props
  const $el = useRef<HTMLElement | null>(null)

  return (
    <section class={SECTION_CX} ref={$el}>
      <a href={`#${name}`}>
        <h2 id={name}>
          <span class={TITLE_CX}>{title}</span>
          <div class={HERO_WRAPPER_CX} title={title}>
            <div class={`${HERO_CX} ${name}`} alt={label} />
          </div>
        </h2>
      </a>
      {createSection(name)}
    </section>
  )
}
