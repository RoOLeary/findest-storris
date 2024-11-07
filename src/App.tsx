import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { AppContainer, Title, InstructionsContainer, SubTitle, InstructionsText } from './components/StyledComponents';
import TaskList from './components/StoryList'
import TaskForm from './components/StoryForm'
import OverlayComponent from './components/Overlay'

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
            <Title>Storri's:</Title>
            <InstructionsContainer>
              <SubTitle emph={true}>Welcome {userName}!</SubTitle>
              <InstructionsText>User the interface below to Add, Edit, Update and Delete your stories. <br />When adding a task, you will automatically be shown as the story creator. <br />Stories can be filtered by "All", "My Stories", "Completed", and "Incomplete".</InstructionsText>
            </InstructionsContainer>
            <SubTitle emph={true}>Add a New Task: </SubTitle>
            <TaskForm user={userName}/>
            <TaskList />
          </AppContainer>
        )}
      </PersistGate>
    </Provider>
  )
}

export default App
