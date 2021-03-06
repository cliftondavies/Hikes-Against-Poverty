import { useState, useEffect } from 'react';
import {
  HashRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import Toggle from '../Toggle/Toggle';
import SideBar from '../SideBar/SideBar';
import Home from '../Home/Home';
import Hikes from '../Hikes/Hikes';
import Hike from '../Hike/Hike';
import Bookings from '../Bookings/Bookings';

const App = () => {
  const [session, setSession] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [toggleStatus, setToggleStatus] = useState(false);
  const loggedIn = useSelector((state) => state.authStatus);
  const { hikes } = useSelector((state) => state.hikes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('user'))) {
      dispatch(login());
    }
  }, []);

  useEffect(() => {
    setSession(JSON.parse(sessionStorage.getItem('user')));
  }, [loggedIn]);

  const handleToggle = (toggleType) => {
    if (toggleType === 'X') {
      setToggleStatus(false);
    } else {
      setToggleStatus(true);
    }
  };

  return (
    <HashRouter>
      <Toggle active={toggleStatus} clickHandler={handleToggle} />
      <SideBar active={toggleStatus} />
      <Switch>
        <Route exact path="/">
          {(loggedIn || session) ? <Redirect to="/hikes" /> : <Home />}
        </Route>
        <Route path="/hikes">
          {(!loggedIn && !session) ? <Redirect to="/" /> : (
            <Switch>
              <Route exact path="/hikes">
                <Hikes />
              </Route>
              <Route
                path="/hikes/:hikeID"
                render={({ match }) => (
                  <Hike hike={hikes.find((hike) => hike.id === Number(match.params.hikeID))} />
                )}
              />
              <Route render={() => <h1>404: Page Not Found!</h1>} />
            </Switch>
          )}
        </Route>
        <Route path="/bookings">
          {(!loggedIn && !session) ? <Redirect to="/" /> : <Bookings />}
        </Route>
        <Route render={() => <h1>404: Page Not Found!</h1>} />
      </Switch>
    </HashRouter>
  );
};

export default App;
