import { createElement, JSX } from 'preact'

import { AppStateContext, useAppStateContextValue } from './state'
import { Modal } from './Modal'
import { Main } from './Main'
import { Divider } from './Divider'
import { Title } from './Title'
import { Nav } from './Nav'
import { Contents } from './Contents'
import { Footer } from './Footer'

export function App(): JSX.Element {
  const state = useAppStateContextValue()

  return (
    <AppStateContext.Provider value={state}>
      <Main>
        <Title />
        <Divider />
        <Nav />
        <Divider />
        <Contents />
        <Footer />
      </Main>
      <Modal />
    </AppStateContext.Provider>
  )
}
