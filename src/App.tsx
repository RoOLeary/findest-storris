import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Footer from './components/Footer'
import OverlayComponent from './components/Overlay' // Import your overlay
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

const InstructionsContainer = styled.div`
  background: white; 
  padding: 12px; 
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;

  p {
    color: lightslategrey;
    font-size: 14px;
    margin-bottom: 5px;
  }
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
          <OverlayComponent onSubmitName={handleNameSubmit} /> // Show overlay if name is not set
        ) : (
          <AppContainer>
            <Title>Welcome {userName}!</Title>
            <Title>Usage Instructions:</Title>
            <InstructionsContainer>
              <p>Enter the details for a new task and click "Add Task". Your new task will display at the top of the filtered tasks list, as an incompete task.</p>
              <p>Clicking on "Complete" will mark the task as complete. Clicking 'Undo' will mark the task incomplete.</p>
              <p>Click "Edit" to update the title and description of the task. You can save or cancel these changes.</p>
              <p>Click "Delete" to remove the task.</p>
              <p>Click "Resyc" to fetch the latest from the api endpoint, clicking "Log out" will clear your session and return to the entry screen.</p>
              <p>You can filter by "All Tasks", "My Tasks", "Completed Tasks" and "Incomplete Tasks".</p>
            </InstructionsContainer>
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
