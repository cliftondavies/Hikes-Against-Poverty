import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import Home from '../Home/Home';
import Hikes from '../Hikes/Hikes';
import Bookings from '../Bookings/Bookings';

const App = () => {
  const loggedIn = useSelector((state) => state.authenticated);

  return (
    <BrowserRouter>
      <SideBar />
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/hikes" /> : <Home />}
        </Route>
        <Route path="/hikes">
          {!loggedIn ? <Redirect to="/" /> : <Hikes />}
        </Route>
        <Route path="/bookings">
          {!loggedIn ? <Redirect to="/" /> : <Bookings />}
        </Route>
        <Route render={() => <h1>404: Page Not Found!</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
