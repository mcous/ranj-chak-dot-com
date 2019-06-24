import { createContext } from 'preact'
import { useContext, useState, useMemo } from 'preact/hooks'
import { AppStateContextValue, MediaItem } from './types'

export const AppStateContext = createContext<AppStateContextValue>({
  modal: null,
  setModal: (): void => {},
})

export function useAppState(): AppStateContextValue {
  return useContext(AppStateContext)
}

export function useAppStateContextValue(): AppStateContextValue {
  const [modal, setModal] = useState<MediaItem | null>(null)

  return useMemo((): AppStateContextValue => ({ modal, setModal }), [modal])
}
