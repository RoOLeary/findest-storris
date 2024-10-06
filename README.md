
# Move (Framna) Senior Frontend Developer Assignment

## Simple Task Management System

This project is a simple Task Management system built using **ReactJS**, **TypeScript**, **Styled Components (Emotion)**, and **Jest + Testing Library**. It allows users to add, edit, delete, and list tasks. The tasks are managed locally and fetched from a mock API. This system also synchronizes tasks with a backend for persistence.

## Features

- **Add New Tasks**: Users can create new tasks with a title, description, and priority.
- **Edit Tasks**: Users can update existing tasks by modifying the title and description.
- **Delete Tasks**: Users can remove tasks from the task list.
- **Task List**: A list of all tasks with their respective details (title, description, priority, author, and completion status).
- **Task Filtering**: Filter tasks based on criteria such as completion status or ownership.
- **Local Storage Integration**: Utilizes `localStorage` for transient data (such as user information) in lieu of a backend.
- **Mock API Integration**: Fetches an initial task list from a mock backend.
- **Task Completion**: Toggle task completion status with smooth UI transitions.

## Bonus Features

- **Backend Sync**: Ability to sync local tasks with a backend using API requests for full CRUD operations.

## Technologies Used

- **ReactJS**: For building the user interface.
- **TypeScript**: To add type safety to the application.
- **Styled Components (Emotion)**: For writing component-specific styles with ease, allowing for better UI maintainability and scalability.
- **Redux (Toolkit)**: For managing the global state of tasks.
- **Jest + Testing Library**: For unit testing components and ensuring functionality.
- **localStorage**: For storing transient user data locally in the browser.

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
   git clone https://github.com/your-repository/simple-task-manager.git
   cd simple-task-manager
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

   The test suite will verify that the core functionalities (adding, editing, deleting, and filtering tasks) work as expected.

### Mock API Setup

This project uses a mock API for fetching tasks. If you're using `mockapi.io` or `mocki.io` for this:

- The mock API should return an array of task objects with the following format:

  ```json
  [
    {
      "id": "1",
      "title": "Sample Task",
      "description": "This is a sample task",
      "author": "User1",
      "priority": "medium",
      "completed": false
    }
  ]
  ```

You can configure the API URL in your `src/services/tasksServices.tsx` file.

### API ENDPOINT:

```
https://67005c054da5bd237553e174.mockapi.io/api/move-ro-move/tasks
```

### File Structure

Here's a brief overview of the important files and directories:

- `src/components`: Contains all the UI components such as `TaskList`, `TaskItem`, etc.
- `src/actions`: Contains Redux action creators for task management.
- `src/reducers`: Contains the Redux reducers for handling state updates.
- `src/store.ts`: Configures Redux store and sets up middleware.
- `src/__tests__`: Contains unit tests for components.


## Project Screenshots

- **Task List View**: Shows all tasks fetched from the mock backend with options to add, edit, complete, or delete tasks.
- **Edit Mode**: Allows the user to edit the task title and description with smooth transitions.

You can include screenshots of your app to give users a visual preview of the UI.

## Future Improvements

- **Backend Integration**: Replace the mock API with a real backend for full CRUD operations.
- **Authentication**: Add user authentication and associate tasks with users.
- **Task Categories**: Implement categories to better organize tasks.
- **Due Dates and Reminders**: Add features like due dates and task reminders.

## License

This project is licensed under the MIT License.

---

With this README, you're now set to guide users on how to set up your project with `pnpm`. Let me know if you'd like any further modifications!