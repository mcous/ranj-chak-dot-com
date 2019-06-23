import { createElement, JSX } from 'preact'

import titleImageSrc from './images/title.png'
import subtitleImageSrc from './images/subtitle.png'

const TITLE_TEXT = `Hi, I'm Ranjani`
const SUBTITLE_TEXT = 'Check out my work'

const TITLE_CX = 'center mt4 mb0 w-100 w-80-bp1 w-60-bp2 w-40-bp3'
const TITLE_IMG_CX = 'db center w-80 '
const SUBTITLE_IMG_CX = 'db center w-50'

export function Title(): JSX.Element {
  return (
    <h1 class={TITLE_CX}>
      <img class={TITLE_IMG_CX} src={titleImageSrc} alt={TITLE_TEXT} />
      <img class={SUBTITLE_IMG_CX} src={subtitleImageSrc} alt={SUBTITLE_TEXT} />
    </h1>
  )
}
