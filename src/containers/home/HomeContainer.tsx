import Home from '../../components/home/Home';
import { useDashboard } from '../../redux/selectors';

const HomeContainer = () => {
  const dashboard = useDashboard();
  return <Home rows={dashboard.rows} />;
};

export default HomeContainer;
