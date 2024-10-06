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
const SubTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: normal;
  display: flex;
  align-items: center;
  color: #000;

  span{
    font-weight: bold;
  }
`

const InstructionsContainer = styled.div`
  background: white; 
  padding: 12px; 
  font-size: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;

  p {
    color: lightslategrey;
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

const InstructionsText = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: normal;
  display: flex;
  align-items: center;
  color: gray;
`;

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
            <Title>Simple Task Manager:</Title>
            <InstructionsContainer>
              <SubTitle>Welcome {userName}!</SubTitle>
              <InstructionsText>User the interface below to Add, Edit, Update and Delete Tasks. <br />When adding a task, you will automatically be shown as the task creator. <br />Tasks can be filtered by "All", "My Tasks", "Completed", and "Incomplete".</InstructionsText>
            </InstructionsContainer>
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
