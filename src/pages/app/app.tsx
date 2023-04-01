import { Outlet } from 'react-router-dom';
import './app.styles.css';

export default function App() {
  return (
    <div className="App">
      <div className="Router-content">
        <Outlet />
      </div>
    </div>
  );
}
