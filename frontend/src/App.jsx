import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutUsPage from "./pages/AboutUsPage";
import ServicesPage from "./pages/ServicesPage";
import CreateQuestion from "./pages/CreateQuestion";
import ViewQuestions from "./pages/ViewQuestions";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/create" element={<CreateQuestion />} />
        <Route path="/create/view" element={<ViewQuestions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
