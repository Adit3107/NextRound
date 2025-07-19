# NextRound

This project is an AI-powered mock interview application designed to help users practice their interview skills with realistic scenarios and receive instant feedback. Leveraging the Google Gemini API, the application simulates an interview experience, providing a dynamic and interactive way to prepare for job interviews.

## Features

* **AI-Powered Interviewer:** Interact with an AI interviewer powered by the Gemini API, capable of asking relevant questions and understanding your responses.
* **Realistic Interview Scenarios:** Practice for various roles and industries with customizable interview settings.
* **Instant Feedback:** Receive immediate feedback on your answers, including suggestions for improvement.
* **Performance Tracking:** (Potentially) Track your progress over time with insights into your strengths and weaknesses.
* **User-Friendly Interface:** Built with React and TypeScript for a smooth and intuitive user experience.

## Technologies Used

* **Frontend:**
    * React
    * TypeScript
    * Tailwind CSS (indicated by `tailwind.config.js`)
* **Backend/API:**
    * Google Gemini API (for AI capabilities)
* **Build Tool:**
    * Vite (indicated by `vite.config.ts`)
* **Package Manager:**
    * NPM or Yarn (indicated by `package.json` and `package-lock.json`)
* **Linting:**
    * ESLint (indicated by `eslint.config.js`)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (LTS version recommended)
* NPM or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL_HERE]
    cd [YOUR_PROJECT_FOLDER_NAME]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project (as indicated by `.env` in the file structure). This file will store your sensitive information, such as your Gemini API key.

    ```
    VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```
    *Replace `YOUR_GEMINI_API_KEY` with your actual Google Gemini API key. You can obtain one from the Google AI Studio or Google Cloud Console.*

### Running the Development Server

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
