import { Outlet } from 'react-router-dom';
import AppHeader from '../../components/app-header/app-header';
import './app.styles.css';

export default function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="Router-content">
        <Outlet />
      </div>
    </div>
  );
}
