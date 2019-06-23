// embeded Vimeo or YouTube player
import { createElement, JSX } from 'preact'

const VIMEO_PARAMS = '?badge=0&byline=0&portrait=0&title=0'
const YOUTUBE_PARAMS = '?modestbranding=1'

export const VIMEO = 'vimeo'
export const YOUTUBE = 'youtube'

const ASPECT_WRAPPER_CX = 'aspect aspect--16-9'
const EMBED_CX = 'aspect--item'

export interface VideoEmbedProps {
  site: typeof VIMEO | typeof YOUTUBE
  videoId: string
}

export default function VideoEmbed(props: VideoEmbedProps): JSX.Element {
  const { site, videoId } = props
  const src =
    site === VIMEO
      ? `https://player.vimeo.com/video/${videoId}${VIMEO_PARAMS}`
      : `https://www.youtube-nocookie.com/embed/${videoId}${YOUTUBE_PARAMS}`

  return (
    <div class={ASPECT_WRAPPER_CX}>
      <iframe
        class={EMBED_CX}
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
