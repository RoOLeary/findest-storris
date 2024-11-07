import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { AppContainer,SubTitle } from './components/StyledComponents';
import StoryList from './components/StoryList'
import StoryForm from './components/StoryForm'
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
          <div className="flex flex-col md:flex-row justify-between p-6 gap-8">
            <div className="w-full md:w-1/2">
              <SubTitle emph={true}>Add a New Story: </SubTitle>
              <StoryForm user={userName}/>
            </div>
            <StoryList />
          </div>
        )}
      </PersistGate>
    </Provider>
  )
}

export default App
