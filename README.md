# react-ui-builder

## Brief overview of the project:

The application is built using React along with TypeScript. It is bundled through Webpack and all ES6+ code is transpiled to browser supported code by Babel. Tailwind CSS is also used to design some parts of the page.

There are two main components, the BuildRenderer and the SettingsPanel. The SettingsPanel component hosts the three HTML elements which are allowed to be dragged, namely Label, Input and Button.

Flow on how the elements are rendered when they are dragged and dropped over the zone.

1. Once the element is dragged and dropped on the BuildRenderer component, the onDrop event notifies the application of the X and Y positions on the client where the element has been dropped.
2. A modal is opened up, where the Label, Font Size and the Font Weight fields are left for the users to populate. The X and Y fields are populated directly through the mouse event.
3. Once the user enters the required information, and clicks on Save Changes, all the element properties and its style is fed to a renderElement function which renders the element on the screen and saves the configuration to the localStorage.
4. Since the elements are saved on the localStorage, if you refresh the page any time, the previous elements will be persistent on the screen.
5. Anytime an existing element is dragged on the screen, the previous element is removed from the localStorage as well as the DOM and a new id is generated for the newly dragged element, and it gets saved.
6. On clicking any element and pressing ‘Enter’, the edit configuration modal opens up with the pre-populated values and the current X and Y position.
7. On pressing the ‘Delete’ key, the element is removed from localStorage and the DOM as well, handled through the onKeyDown event.


## Steps to run UI - Builder on local machine

1. Clone the repo from https://github.com/deadwing7x/react-ui-builder.git
2. Navigate to the cloned folder.
3. At the root directory, open command prompt/ terminal and run the command ‘npm run start’.
4. The application will be served at localhost:8080.
5. You can also visit the website - https://anubhav7x-ui-builder.netlify.app/ where it is hosted through Netlify.
