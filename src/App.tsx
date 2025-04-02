// import { Button } from "@/components/ui/button"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PublicLayout from "./layouts/public-layout"
import Home from "./routes/Home"
import AuthenticationLayout from "./layouts/auth-layout"
import SignUpPage from "./routes/sign-up"
import SignInPage from "./routes/sign-in"
import ProtectedRoute from "./layouts/protected-layout"


import { Generate } from "./components/generate"
import { MainLayout } from "./layouts/main-layout"
import { CreatePage } from "./routes/create-edit-page"
import { Dashboard } from "./routes/dashboard"
import { MockLoadPage } from "./routes/mock-load-page"
import { MockInterviewPage } from "./routes/mock-interview-page"
import { Feedback } from "./routes/feedback"







const App = () => {
  return (
    <Router>
      <Routes>
        {/* public-routes  */}
        <Route element={<PublicLayout/>} >
          <Route index element={<Home/>} />
        </Route>

        {/* auth-routes */}
        <Route element={<AuthenticationLayout/>}>
          <Route path="/signin/*" element={<SignInPage/>} />
          <Route path="/signup/*" element={<SignUpPage/>} />
        </Route>

        {/* protected-routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* add all the protect routes */}
          <Route element={<Generate />} path="/generate" >
            <Route index element={<Dashboard />} />
            <Route path=":interviewId" element={<CreatePage/>} />
            <Route path="interview/:interviewId" element={<MockLoadPage/>} />
            <Route
              path="interview/:interviewId/start"
              element={<MockInterviewPage />}
            />
            <Route path="feedback/:interviewId" element={<Feedback/>}> </Route>
          </Route>
        </Route>

        

      </Routes>
    </Router>
  )
}

export default App
