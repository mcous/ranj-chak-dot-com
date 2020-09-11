import { createElement, JSX } from 'preact'

const CX = 'flex flex-wrap justify-between pa2 pa3-bp3'
const COPY_CX = 'mb3 lh-title'
const LEFT_COPY_CX = `${COPY_CX} mr3`
const LINK_CX = 'blue dim'

export function Footer(): JSX.Element {
  return (
    <footer class={CX}>
      <p class={LEFT_COPY_CX}>© 2016-2020 by Ranjani Chakraborty</p>
      <p class={COPY_CX}>
        Built by{' '}
        <a
          class={LINK_CX}
          href="https://mike.cousins.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mike Cousins
        </a>
      </p>
    </footer>
  )
}
