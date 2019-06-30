import { createElement, Fragment, JSX } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { windowOrNull } from '../window'
import { useDebouncedListener, useFade } from '../hooks'
import { SECTIONS } from '../Contents'

interface SideNavProps {
  show: boolean
}

interface NavLinkProps {
  name: string
  title: string
  label?: string
  labelSrc?: string
  class?: string
}

interface SocialLinkProps {
  name: string
  label: string
  link: string
  class?: string
}

const NAV_CX = 'transition-opacity'
const NAV_LIST_CX = 'center w-100 w-80-bp3'
const NAV_ITEM_CX = 'dib w-50 mb3 pl1 pr1 w-25-bp2 mb0-bp2'
const NAV_LINK_ICON_CX =
  'aspect aspect--5-3 bg-center bg-no-repeat nav-link-icon'

const SOCIAL_LIST_CX = 'mt3 flex flex-wrap justify-center'
const SOCIAL_ITEM_CX = 'w3 pa2'
const SOCIAL_LINK_ICON_CX =
  'aspect aspect--1-1 bg-center bg-contain bg-no-repeat social-link-icon'

const SIDE_NAV_CX = 'transition-opacity top-0 fixed'
const LEFT_NAV_CX = `${SIDE_NAV_CX} side-nav-left`
const RIGHT_NAV_CX = `${SIDE_NAV_CX} side-nav-right`
const SIDE_NAV_ITEM_CX = 'w4 mb4'
const SIDE_SOCIAL_ITEM_CX = 'w3 pl2 pr2 mb3'

const NAV_ITEMS: NavLinkProps[] = SECTIONS.map(
  (s): NavLinkProps => ({
    name: s.name,
    title: s.title,
    label: s.label,
    labelSrc: require(`../images/nav/${s.name}-label.png`),
  })
)

const SOCIAL_ITEMS: SocialLinkProps[] = [
  {
    name: 'instagram',
    label: 'Instagram',
    link: 'https://www.instagram.com/ranjchak/',
  },
  {
    name: 'facebook',
    label: 'facebook',
    link: 'https://www.facebook.com/ranjani.chakraborty',
  },
  {
    name: 'twitter',
    label: 'Twitter',
    link: 'https://twitter.com/ranjchak',
  },
  {
    name: 'vimeo',
    label: 'Vimeo',
    link: 'https://vimeo.com/ranjanichakraborty',
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ranjchak',
  },
  {
    name: 'email',
    label: 'Email',
    link: 'mailto:hello@ranjchak.com',
  },
  {
    name: 'resume',
    label: 'Resume',
    link: '/ranj-chak-cv.pdf',
  },
]

function NavLinkItem(props: NavLinkProps & { key: number }): JSX.Element {
  const { name, title, label, labelSrc, class: cx } = props

  return (
    <li class={cx}>
      <a href={`#${name}`} title={title}>
        <div class={`${NAV_LINK_ICON_CX} ${name}`} />
        {label && labelSrc && <img src={labelSrc} alt={label} />}
      </a>
    </li>
  )
}

function SocialLinkItem(props: SocialLinkProps & { key: number }): JSX.Element {
  const { name, label, link, class: cx } = props

  return (
    <li class={cx}>
      <a href={link} title={label}>
        <div class={`${SOCIAL_LINK_ICON_CX} ${name}`} />
      </a>
    </li>
  )
}

function SideNav(props: SideNavProps): JSX.Element | null {
  const [elementRef, show] = useFade(props.show)

  if (show === null) return null

  return (
    <Fragment>
      <nav class={`${LEFT_NAV_CX} opacity-${show ? 100 : 0}`} ref={elementRef}>
        <ul>
          {NAV_ITEMS.map((n, i) => (
            <NavLinkItem
              key={i}
              class={SIDE_NAV_ITEM_CX}
              name={n.name}
              title={n.title}
            />
          ))}
        </ul>
      </nav>
      <nav class={`${RIGHT_NAV_CX} opacity-${show ? 100 : 0}`}>
        <ul>
          {SOCIAL_ITEMS.map((s, i) => (
            <SocialLinkItem key={i} class={SIDE_SOCIAL_ITEM_CX} {...s} />
          ))}
        </ul>
      </nav>
    </Fragment>
  )
}

export function Nav(): JSX.Element {
  const [floating, setFloating] = useState(false)
  const prevFloating = useRef(floating)
  const wrapperRef = useRef<HTMLElement | null>(null)
  const [navRef, showMainNav, prevShowMainNav] = useFade(!floating)

  const handleScroll = useCallback(() => {
    const $el = wrapperRef.current

    if ($el) {
      const { top, height } = $el.getBoundingClientRect()
      const nextFloating = top < (-3 * height) / 4

      setFloating(nextFloating)
      prevFloating.current = nextFloating
    }
  }, [])

  useEffect(() => {
    const $el = wrapperRef.current

    if ($el && showMainNav !== prevShowMainNav) {
      if (showMainNav) {
        requestAnimationFrame(() => ($el.style.height = 'auto'))
      } else {
        const { height } = $el.getBoundingClientRect()
        $el.style.height = `${height}px`
      }
    }
  }, [showMainNav, prevShowMainNav])

  useDebouncedListener(windowOrNull, 'scroll', handleScroll)

  return (
    <Fragment>
      <div ref={wrapperRef}>
        {showMainNav !== null && (
          <nav
            class={`${NAV_CX} opacity-${showMainNav ? 100 : 0}`}
            ref={navRef}
          >
            <ul class={NAV_LIST_CX}>
              {NAV_ITEMS.map((n, i) => (
                <NavLinkItem key={i} class={NAV_ITEM_CX} {...n} />
              ))}
            </ul>
            <ul class={SOCIAL_LIST_CX}>
              {SOCIAL_ITEMS.map((s, i) => (
                <SocialLinkItem key={i} class={SOCIAL_ITEM_CX} {...s} />
              ))}
            </ul>
          </nav>
        )}
      </div>
      <SideNav show={floating} />
    </Fragment>
  )
}
