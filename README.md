# Code Haven

**Code Haven** is a real-time collaborative code editor with features like syntax highlighting, code execution, and group chat.

## 🚀 Features

- Real-time code collaboration
- Multiple programming language support
- Integrated code execution
- Group chat functionality
- Theme customization
- Automatic Syntax Highlighting

## 🌐️ Technologies Used

- Frontend (Client-Side)
    - **HTML5:** Structures the web application's content and layout.
    - **CSS3:** Styles the application, enhancing visual appeal and user experience.
    - **JavaScript (ES6+):** Provides dynamic functionality and interactivity on the client-side.
    - **React.js:** A JavaScript library for building user interfaces, enabling efficient rendering and component-based architecture.
    - **Monaco Editor:** Integrated as the code editor component, providing features like syntax highlighting and auto-suggestions.

- Backend (Server-Side)
    - **Node.js:** A JavaScript runtime for building server-side applications and handling API requests efficiently.
    - **Express.js:** A web application framework for Node.js, used to build the server and handle HTTP requests.
    - **Socket.io:** A powerful JavaScript library for real-time web applications, enabling bi-directional, event-based communication between clients and servers.
    - **Judge0 API:** Enables multi-language code execution within the app.

## 📂 File Structure

```
📂 code-haven/
├── 🌍 .env
├── 📁 .git/
├── 🗑️ .gitignore
├── 📁 node_modules/
├── 📄 package.json
├── 📄 package-lock.json
├── 📁 public/
│   ├── 🖼️ code-haven.png
│   ├── 🖼️ favicon.ico
│   ├── 📄 index.html
│   ├── 🖼️ logo192.png
│   ├── 🖼️ logo512.png
│   ├── 📄 manifest.json
│   └── 🤖 robots.txt
├── 📄 server.js
└── 📁 src/
    ├── 📁 actions/
    │   └── 📄 actions.js
    ├── 📁 components/
    │   ├── 📄 Avatar.css
    │   ├── 📄 Avatar.js
    │   ├── 📄 Client.css
    │   ├── 📄 Client.js
    │   ├── 📄 CollaborationMenu.css
    │   ├── 📄 CollaborationMenu.js
    │   ├── 📄 Container.css
    │   ├── 📄 Container.js
    │   ├── 📄 Editor.css
    │   ├── 📄 Editor.js
    │   ├── 📄 Executor.css
    │   ├── 📄 Executor.js
    │   ├── 📄 FileUploader.css
    │   ├── 📄 FileUploader.js
    │   ├── 📄 GroupChat.css
    │   ├── 📄 GroupChat.js
    │   ├── 📄 JoinRoomModal.css
    │   ├── 📄 JoinRoomModal.js
    │   ├── 📄 LanguageSelector.css
    │   ├── 📄 LanguageSelector.js
    │   ├── 📄 Navbar.css
    │   ├── 📄 Navbar.js
    │   ├── 📄 Room.js
    │   ├── 📄 ShareMenu.css
    │   ├── 📄 ShareMenu.js
    │   ├── 📄 Spinner.css
    │   ├── 📄 Spinner.js
    │   ├── 📄 ThemeDropdown.css
    │   ├── 📄 ThemeDropdown.js
    │   ├── 📄 VotingSystem.css
    │   ├── 📄 VotingSystem.js
    │   ├── 📄 Whiteboard.css
    │   └── 📄 Whiteboard.js
    ├── 📁 context/
    │   └── 📄 PostContext.js
    ├── 📁 helpers/
    │   ├── 📄 defineTheme.js
    │   ├── 📄 languages.js
    │   ├── 📄 Statuses.js
    │   ├── 📄 TailwindClasses.js
    │   └── 📄 utils.js
    ├── 📁 pages/
    │   ├── 📄 AboutPage.css
    │   ├── 📄 AboutPage.js
    │   ├── 📄 EditorPage.css
    │   ├── 📄 EditorPage.js
    │   ├── 📄 HomePage.css
    │   └── 📄 HomePage.js
    ├── 📁 services/
    │   └── 📄 api.js
    ├── 📁 tests/
    │   ├── 🧪 App.test.js
    │   ├── 🧪 EditorPage.test.js
    │   ├── 🧪 Editor.test.js
    │   └── 🧪 HomePage.test.js
    ├── 📄 App.css
    ├── 📄 App.js
    ├── 📄 index.css
    ├── 📄 index.js
    ├── 🖼️ logo.svg
    ├── 📄 reportWebVitals.js
    ├── 📄 setupTests.js
    └── 📄 socket.js
```

## 🛠 Installation

To set up the Code Haven project locally, follow these steps:

### 1. Clone the repository:

```
git clone https://github.com/deezyfg/code-haven.git
```

### 2. Navigate to the project directory:

```
cd code-haven
```

### 3. Install dependencies for both the server and client:

```
npm install
```

### 4. Create Environment Variable

Create a `.env` file in the root directory of your project with the following content:

```
REACT_APP_RAPID_API_URL=https://judge0-ce.p.rapidapi.com/submissions
REACT_APP_RAPID_API_HOST=judge0-ce.p.rapidapi.com
REACT_APP_RAPID_API_SECRET=your_rapid_api_secret_here
REACT_APP_SERVER_URL=http://localhost:5000
CLIENT_SIDE_URL=http://localhost:3000
SERVER_PORT=5000
```

Replace `your_rapid_api_secret_here` with your actual RapidAPI secret key after subscribing to the Judge0 API on RapidAPI.

**Important:** Ensure that you create the .env file before running the development server. If there's no .env file when you enter a room, you may be disconnected shortly after.

#### 🔑 API Key Setup

To obtain your RapidAPI secret key for the Judge0 CE API, follow these steps:

1. Visit the [Judge0 CE API on RapidAPI] (https://rapidapi.com/judge0-official/api/judge0-ce).
2. Sign in to your RapidAPI account or create a new one if you don't have an existing account.
3. Review the available pricing plans on the Judge0 CE API page and select the one that best suits your needs.
4. Click the `"Subscribe"` button for your chosen plan.
5. After subscribing, you will be redirected to a new page.
6. Look for a field labeled `"X-RapidAPI-Key"` with a value next to it. This value is your RapidAPI secret key.
7. Alternatively, check the `"Code Snippets"` section on the page and find your unique RapidAPI secret key in the example code headers, typically labeled as `"X-RapidAPI-Key"`.
8. Copy this key and replace `"your_rapid_api_secret_here"` in your `.env` file with the actual key.

Remember to keep your API key confidential and never share it publicly. If you need to reset your key for security reasons, you can do so from your RapidAPI dashboard.

* **Note**: Never commit your `.env` file to version control like Git for security reasons. 

### 5. Start the development server:

```
npm run dev
```

## 🌐 Local Development

**Realtime Code Editor** runs on the following ports:

- **Server:** [http://localhost:5000](http://localhost:5000)
- **Client:** [http://localhost:3000](http://localhost:3000)

The application runs on:
- **Server:** [http://localhost:5000](http://localhost:5000)
- **Client:** [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

This web app is deployed on [Vercel](https://vercel.com/) for both **frontend** and **backend**:
- **Live Site:** [Code Haven](https://code-haven-wheat.vercel.app/)

## Demo Video

[![Code Haven Demo Video](https://i.imgur.com/BPrzBx1.png)](https://github.com/user-attachments/assets/1f614ca3-f7ae-43a1-9852-f267cf2cef52)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started.

## 📝 License

This project is [MIT](LICENSE) licensed.

## 📧 Contact

- **Name:** [Peter Opoku-Mensah](https://github.com/deezyfg/code-haven)  
  - **Email:** [mensahpeter421@gmail.com](mailto:mensahpeter421@gmail.com)

- **Project Link:** [Code Haven Repository](https://github.com/deezyfg/code-haven)
