import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import MainApp from './MainApp.jsx'

function App() {
  return (
      <AuthProvider>
        <InterviewProvider>
          <MainApp />
        </InterviewProvider>
      </AuthProvider>
  )
}

export default App
