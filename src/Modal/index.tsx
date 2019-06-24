import { createElement, JSX } from 'preact'
import { useAppState } from '../state'
import { ModalContents } from './ModalContents'

export function Modal(): JSX.Element | null {
  const { modal, setModal } = useAppState()

  if (!modal) return null

  return <ModalContents item={modal} setItem={setModal} />
}

export * from './ModalLink'
