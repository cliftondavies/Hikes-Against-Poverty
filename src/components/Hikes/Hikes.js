import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HikeList from '../HikeList/HikeList';
import Hike from '../Hike/Hike';

const Hikes = () => {
  const { path } = useRouteMatch();
  const { hikes } = useSelector((state) => state.hikes);

  return (
    <Switch>
      <Route exact path={path}>
        <main>
          <div><span role="img" aria-label="play forward">▶️ &#9657;</span></div>
          <div><span role="img" aria-label="play backward">◀️ &#9667;</span></div>

          <h2>AVAILABLE HIKES</h2>

          <span>Please select a hike</span>

          <HikeList hikes={hikes} />
        </main>
      </Route>
      <Route
        path={`${path}/:hikeID`}
        render={({ match }) => (
          <Hike hike={hikes.find((hike) => hike.id === Number(match.params.hikeID))} />
        )}
      />
      <Route render={() => <h1>404: Page Not Found!</h1>} />
    </Switch>
  );
};

export default Hikes;
