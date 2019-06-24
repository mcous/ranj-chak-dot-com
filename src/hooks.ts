import { useEffect, useRef, useState, Ref } from 'preact/hooks'

function once(
  target: EventTarget,
  event: string,
  handler: () => unknown
): () => unknown {
  function handleEvent(): void {
    cleanup()
    handler()
  }

  function cleanup(): void {
    target.removeEventListener(event, handleEvent)
  }

  target.addEventListener(event, handleEvent)
  return cleanup
}

export function useDebouncedListener(
  target: EventTarget | null,
  event: string,
  listener: () => unknown
): void {
  useEffect((): (() => void) => {
    let pending: number | null = null

    const cleanupRaf = (): void => {
      if (pending) cancelAnimationFrame(pending)
    }

    const runListener = (): void => {
      pending = null
      listener()
    }

    const handleEvent = (): void => {
      cleanupRaf()
      pending = requestAnimationFrame(runListener)
    }

    target && target.addEventListener(event, handleEvent)

    return (): void => {
      cleanupRaf()
      target && target.removeEventListener(event, handleEvent)
    }
  }, [target, event, listener])
}

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(
  handler: () => unknown,
  delay: number | null
): void {
  const savedHandler = useRef<() => unknown>(() => {})

  // Remember the latest callback.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  // Set up the interval.
  useEffect(() => {
    const tick = (): unknown => savedHandler.current()

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export function useFade(
  fadeIn: boolean
): [Ref<HTMLElement | null>, boolean | null, boolean | null] {
  const elementRef = useRef<HTMLElement | null>(null)
  const [show, setShow] = useState<boolean | null>(fadeIn)
  const prevShowRef = useRef(show)

  useEffect(() => {
    const $el = elementRef.current
    if (fadeIn) {
      setShow(false)
      requestAnimationFrame(() => setShow(true))
    } else if ($el) {
      setShow(false)
      return once($el, 'transitionend', () => setShow(null))
    }
  }, [fadeIn])

  useEffect(() => {
    prevShowRef.current = show
  }, [show])

  return [elementRef, show, prevShowRef.current]
}
