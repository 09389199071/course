import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CourseDetails from "./pages/CourseDetails";
import EnrolledCourses from "./pages/EnrolledCourses";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 rtl">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/enrolled" element={<EnrolledCourses />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
