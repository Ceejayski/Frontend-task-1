import {
  BrowserRouter as Router, Routes,
  Route,
} from 'react-router-dom';
import NotFoundPage from './pages/404.page';
import FormPage from './pages/form.page';
import HomePage from './pages/home.page';
import PostPage from './pages/post.page';
import MainTemplate from './templates/main.template';

function App() {
  return (
    <Router>

      <MainTemplate>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/404" element={<NotFoundPage />} />
          <Route exact path="/posts/:id" element={<PostPage />} />
          <Route exact path="/posts/edit/:id" element={<FormPage />} />
          <Route exact path="/posts/new" element={<FormPage />} />
          <Route exact path="*" element={<NotFoundPage />} />
        </Routes>
      </MainTemplate>
    </Router>
  );
}

export default App;
