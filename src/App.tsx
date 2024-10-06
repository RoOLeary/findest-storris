import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Footer from './components/Footer'
import OverlayComponent from './components/Overlay'
import styled from '@emotion/styled'

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`
const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`

function App() {
  const [userName, setUserName] = useState<string | null>(null)

  // Check if user's name exists in localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  // Handle name submission from the overlay
  const handleNameSubmit = (name: string) => {
    localStorage.setItem('userName', name)
    setUserName(name)
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {!userName ? (
          <OverlayComponent onSubmitName={handleNameSubmit} />
        ) : (
          <AppContainer>
            <Title>Welcome {userName}!</Title>
            <Title>Task Manager:</Title>
            <TaskForm user={userName}/>
            <TaskList />
            <Footer />
          </AppContainer>
        )}
      </PersistGate>
    </Provider>
  )
}

export default App
