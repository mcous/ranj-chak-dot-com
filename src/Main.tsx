import { createElement, JSX, ComponentChildren } from 'preact'

const MAIN_CX = 'relative h-100 mxw4 center pa3 pl4-bp1 pr4-bp1 pl5-bp2 pr5-bp2'

export interface MainProps {
  children: ComponentChildren
}

export function Main(props: MainProps): JSX.Element {
  return <main class={MAIN_CX}>{props.children}</main>
}
