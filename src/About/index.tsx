// about page
import { createElement, JSX } from 'preact'
import { AboutContent as AboutProps } from '../types'

import { Doodle } from './Doodle'

const CX = 'flex flex-wrap align-center justify-center pa2 pa3-bp3'
const COPY_CX = 'f5 measure lh-copy'
const PARA_CX = 'mt3'

export function About(props: AboutProps): JSX.Element {
  return (
    <div class={CX}>
      <Doodle {...props.doodle} />
      <div class={COPY_CX}>
        {props.content.map((c, i) => (
          <p key={i} class={PARA_CX}>
            {c}
          </p>
        ))}
      </div>
    </div>
  )
}
