import { useState, useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import SideBar from '../SideBar/SideBar';
import Home from '../Home/Home';
import Hikes from '../Hikes/Hikes';
import Bookings from '../Bookings/Bookings';

const App = () => {
  const [session, setSession] = useState(JSON.parse(sessionStorage.getItem('user')));
  const loggedIn = useSelector((state) => state.authenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('user'))) {
      dispatch(login());
    }
  }, []);

  useEffect(() => {
    setSession(JSON.parse(sessionStorage.getItem('user')));
  }, [loggedIn]);

  return (
    <BrowserRouter>
      <SideBar />
      <Switch>
        <Route exact path="/">
          {(loggedIn || session) ? <Redirect to="/hikes" /> : <Home />}
        </Route>
        <Route path="/hikes">
          {(!loggedIn && !session) ? <Redirect to="/" /> : <Hikes />}
        </Route>
        <Route path="/bookings">
          {(!loggedIn && !session) ? <Redirect to="/" /> : <Bookings />}
        </Route>
        <Route render={() => <h1>404: Page Not Found!</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
