const Storiis: React.FC = () => {
  // Define event handler types
  const createStory = (): void => {
    console.log("Create Story clicked");
  };

  const deleteStory = (): void => {
    console.log("Clear form clicked");
  };

  const collapseSidebar = (): void => {
    console.log("Sidebar collapse clicked");
  };

  const copyStory = (id: string): void => {
    console.log(`Copy story with ID: ${id}`);
  };

  const printDiv = (id: string): void => {
    console.log(`Print div with ID: ${id}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const downloadInnerHtml = (filename: string, elId: string, mimeType: string = 'text/html'): void => {
    console.log(`Download div with ID: ${elId}`);
  };

  return (
    <div className="flex">
      {/* Left Column */}
      <div id="left-column" className="flex flex-col w-1/2 p-6 fixed">
        <div className="header flex items-center mb-4">
          <svg
            id="logo"
            width="80px"
            height="43px"
            viewBox="0 0 80 43"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
              <path
                d="M1.13641365,18.5669912 C-1.01739494,42.1902347 23.0460816,49.8224167 23.0460816,18.5669912 C23.0460816,-4.85566375 13.9098512,-4.85566375 13.9098512,18.5669912 C13.9098512,51.475769 35.2003785,38.6194339 35.2003785,18.5669912 C35.2003785,1.70194851 28.9371949,4.49854547 28.9371949,18.5669912 C28.9371949,50.5001831 78.5348512,48.7644534 78.5348512,18.5669912"
                stroke="#0000FF"
                strokeWidth="2"
              />
            </g>
          </svg>
          <h1 className="text-xl font-semibold ml-4">
            Storiis<span id="beta" className="text-xs font-normal">BETA</span>
          </h1>
        </div>
        <div className="story_form">
          {/* USER STORY CREATION FORM */}
          <form>
            As <label htmlFor="role" className="sr-only">role</label>
            <input
              list="roles"
              type="text"
              id="role"
              placeholder="a user"
              autoFocus
              className="border p-2 rounded mb-2"
            />
            I can <input
              type="text"
              id="capability"
              placeholder="capability"
              className="border p-2 rounded mb-2"
            />,
            so that <input
              type="text"
              id="benefit"
              placeholder="benefit"
              className="border p-2 rounded mb-2"
            />
            <datalist id="roles">
              <option value="a user">a user</option>
              <option value="an enterprise user">an enterprise user</option>
              <option value="a digital native">a digital native</option>
              <option value="a digital analphabetic">a digital analphabetic</option>
              <option value="persona 1">persona 1</option>
              <option value="persona 2">persona 2</option>
            </datalist>
          </form>

          {/* SUBMIT BUTTONS */}
          <div id="buttons" className="mt-4">
            <button
              id="createstor"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
              onClick={createStory}
            >
              &#8617; Add Story
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={deleteStory}
            >
              Clear the form
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div id="storyModal" className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div className="modal-content bg-white rounded p-6 max-w-md mx-auto">
          <h4 className="text-lg mb-2">User story:</h4>
          <span className="close text-gray-500 cursor-pointer text-lg font-bold">&times;</span>
          <h3 id="modal-story" className="text-blue-600 mt-4">Some text in the Modal..</h3>
          <div id="modal-buttons" className="mt-4 flex space-x-2">
            <button
              className="copybutton bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              id="modal-copy"
              onClick={() => copyStory('recent')}
            >
              Copy
            </button>
            <button className="copybutton bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Edit</button>
            <button className="destructive bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div id="right-column" className="flex-1 p-6">
        <span
          id="shadow-column"
          className="block h-full w-full bg-gray-100 shadow-md cursor-pointer"
          onClick={collapseSidebar}
        ></span>
        <div id="stories">
          <div id="output" className="p-4 bg-white shadow rounded mb-4">
            <span id="recent">
              <span id="as"></span>
              <span id="rol"></span>
              <span id="can"></span>
              <span id="cap"></span>
              <span id="so"></span>
              <span id="ben"></span>
              <span id="punct"></span>
            </span>
            <button
              id="copystor"
              className="copybutton bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 ml-2"
              onClick={() => copyStory('recent')}
              disabled
            >
              Copy
            </button>
          </div>
          <div id="saved" className="bg-white p-4 rounded shadow">
            <div id="export" className="flex justify-end space-x-2 mb-2">
              <button
                id="printstor"
                className="secundary bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => printDiv('stories')}
                disabled
              >
                Print
              </button>
              <button
                id="downstor"
                className="secundary bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => downloadInnerHtml('storiis.txt', 'list')}
                disabled
              >
                Download
              </button>
            </div>
            <h5 className="text-lg font-semibold mb-2">Your stories</h5>
            <ol id="list" className="list-decimal list-inside">
              {/* List items will go here */}
            </ol>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="footer" className="text-center text-gray-500 mt-8 p-4 border-t">
        <p>Created by Sander van der Woude – 2018</p>
        <p>
          This project is open sourced at{' '}
          <a href="https://github.com/SandervdW/Storiis" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Github
          </a>{' '}
          – Follow me on{' '}
          <a href="https://twitter.com/apnom" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Twitter
          </a>{' '}
          or{' '}
          <a href="https://dribbble.com/apnom" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Dribbble
          </a>
        </p>
      </div>
    </div>
  );
};

export default Storiis;
