import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './pages/LandingPage/LandingPage';
import ChatPage from './pages/Chatpage/ChatPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/main">
          <Nav />
          <MainPage />
        </Route>
        <Route path="/chat">
          <Nav />
          <ChatPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
