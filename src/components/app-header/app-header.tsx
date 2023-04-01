import { Link, useNavigation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import './app-header.styles.css';

export default function AppHeader() {
  const navigation = useNavigation();

  return (
    <header className="AppHeader">
      <Link to="/" className="header-link" role="link">
        <img src={logo} className="header-logo" alt="logo" />
        <h1 className="header-title">Podcaster</h1>
      </Link>
      {/* Shows Loading spinner whenever navigation is not idle (submitting or loading) */}
      <div className="header-loader">{navigation.state !== 'idle' ? <LoadingSpinner /> : null}</div>
    </header>
  );
}
