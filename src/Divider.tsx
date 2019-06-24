import { createElement, JSX } from 'preact'

const DIVIDER_CX = 'w-100 h0 bt mt4 mb4'

export function Divider(): JSX.Element {
  return <div class={DIVIDER_CX} />
}
