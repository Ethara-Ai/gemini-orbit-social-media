import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './layout/Layout';
import { Home, Discover, Messages, Notifications, Connections, Profile } from './pages';

function App() {
  return (
    <ThemeProvider>
      <Router basename="/orbit-social-media">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="discover" element={<Discover />} />
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
