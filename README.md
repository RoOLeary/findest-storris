
# Findest Storris

Integration of Storris demo application (by Sander van der Woude) and RTKQuery instance to perform 
simple CRUD operations

## Simple Story Management System

This project is a simple Story Management system built using **ReactJS**, **TypeScript**, **Styled Components (Emotion)**, and **Jest + Testing Library**. It allows users to add, edit, delete, and list Stories. The Stories are managed locally and fetched from a mock API. This system also synchronizes Stories with a backend for persistence.

## Features

- **Add New Stories**: Users can create new Stories with a title, description, and priority.
- **Edit Stories**: Users can update existing Stories by modifying the title and description.
- **Delete Stories**: Users can remove Stories from the Story list.
- **Story List**: A list of all Stories with their respective details (title, description, priority, author, and completion status).
- **Story Filtering**: Filter Stories based on criteria such as completion status or ownership.
- **Local Storage Integration**: Utilizes `localStorage` for transient data (such as user information) in lieu of a backend.
- **Mock API Integration**: Fetches an initial Story list from a mock backend.
- **Story Completion**: Toggle Story completion status with smooth UI transitions.

## Bonus Features

- **Backend Sync**: Ability to sync local Stories with a backend using API requests for full CRUD operations.

## Technologies Used

### **ReactJS**:
Used for building the user interface with reusable, component-based architecture.

### **TypeScript**:
Provides type safety across the application, reducing runtime errors and enhancing the development experience with better tooling and autocomplete features.

### **Styled Components (Emotion)**:
Allows writing scoped, component-specific styles, offering a maintainable and scalable solution for styling components while supporting dynamic theming and props.

### **Redux (Toolkit)**:
Manages global state in a predictable and maintainable way, particularly for Stories-related data and actions. Manages localstorage and persistence.

### **Jest + React Testing Library**:
Used for unit and integration testing, ensuring reliability and correctness of the components and business logic.

### **localStorage**:
Employed to persist transient user data (such as Stories) locally in the browser, enabling the user’s data to remain available across sessions.

### **Vite**:
Provides a fast and efficient development build tool, with features like hot module replacement (HMR) that enhance the development workflow.

### **ESLint**:
Enforces code quality and best practices, identifying potential errors and maintaining consistency in TypeScript and JavaScript codebases.

### **TailwindCSS**:
Integrated for applying global utility-based CSS classes, enabling quick structural layout adjustments, complementing the component-specific styles provided by Emotion.
.

## Test Suites
```
StoryForm Component:

- ✓ should render the inputs and submit button (102 ms)
- ✓ should allow input changes for title, description, and priority (24 ms)
- ✓ should dispatch addNewStory when form is submitted (29 ms)
- ✓ should not dispatch addNewStory if all inputs are empty (17 ms)

StoryItem Component:
- ✓ should render Story details correctly when not in edit mode (97 ms)
- ✓ should enter edit mode when clicking the "Edit" button (37 ms)
- ✓ should call onSaveEdit when "Save" button is clicked (64 ms)
- ✓ should call onToggleCompletion when "Complete" button is clicked (8 ms)
- ✓ should call onDelete when "Delete" button is clicked (5 ms)

StoryList Component:

- ✓ should dispatch fetchStories when component mounts (76 ms)
- ✓ should display Stories correctly (34 ms)
- ✓ should filter Stories based on user selection (53 ms)
- ✓ should allow Story completion toggle (35 ms)
- ✓ should allow Story editing and saving (48 ms)
- ✓ should allow Story deletion (12 ms)
- ✓ should reset everything when reset button is clicked (17 ms)

```


## Project Setup

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= v20.0.0)
- **pnpm**: If you don't have `pnpm` installed, you can install it globally by running:

  ```bash
  npm install -g pnpm
  ```

### Installation & Getting started

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone git@github.com:RoOLeary/move-challenge-rol.git
   cd move-challenge-rol
   ```

2. **Install dependencies**:

   Using `pnpm`:

   ```bash
   pnpm install
   ```

3. **Start the development server**:

   ```bash
   pnpm run dev
   ```

   This will start the application at `http://localhost:5173`.

4. **Run the tests**:

   To run the tests using Jest and Testing Library, run:

   ```bash
   pnpm run test
   ```

   The test suite will verify that the core functionalities (adding, editing, deleting, and filtering Stories) work as expected.

### Mock API Setup

This project uses a mock API for fetching Stories. If you're using `mockapi.io` or `mocki.io` for this:

- The mock API should return an array of Story objects with the following format:

  ```json
  [
    {
      "id": "1",
      "title": "Sample Story",
      "description": "This is a sample Story",
      "author": "User1",
      "priority": "medium",
      "completed": false
    }
  ]
  ```

You can configure the API URL in your `src/services/StoriesServices.tsx` file.

### API ENDPOINT:

```
https://67005c054da5bd237553e174.mockapi.io/api/move-ro-move/Stories
```

### File Structure

Here's a brief overview of the important files and directories:

- `src/components`: Contains all the UI components such as `StoryList`, `StoryItem`, etc.
- `src/actions`: Contains Redux action creators for Story management.
- `src/reducers`: Contains the Redux reducers for handling state updates.
- `src/store.ts`: Configures Redux store and sets up middleware.
- `src/__tests__`: Contains unit tests for components.


## Using the Application

```
- Enter the details for a new Story and click "Add Story". Your new Story will display at the top of the filtered Stories list, as an incompete Story.
- Clicking on "Complete" will mark the Story as complete. Clicking 'Undo' will mark the Story incomplete.
- Click "Edit" to update the title and description of the Story. You can save or cancel these changes.
- Click "Delete" to remove the Story.
- Click "Resyc" to fetch the latest from the api endpoint, clicking "Log out" will clear your session and return to the entry screen.
- You can filter by "All Stories", "My Stories", "Completed Stories" and "Incomplete Stories".
```

## Screenshots

Why bother, when there's a <a href="https://move-challenge-rol.vercel.app" target="_blank">live demo</a>.

## Possible Future Improvements

- **Backend Integration**: Replace the mock API with a real backend for full CRUD operations.
- **Authentication**: Add user authentication and associate Stories with users.
- **Story Categories**: Implement categories to better organize Stories.
- **Due Dates and Reminders**: Add features like due dates and Story reminders.
