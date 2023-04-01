import { Link, useRouteError } from 'react-router-dom';
import './error-boundary.styles.css';

type ErrorResponse = {
  data: any;
  status: number;
  statusText: string;
  message?: string;
};

export default function ErrorBoundary() {
  const error = useRouteError() as ErrorResponse;

  return (
    <div className="ErrorBoundary">
      <h1>Oops, we seem to have a problem</h1>
      <h4>
        {error?.status} {error?.statusText}
      </h4>
      {process.env.NODE_ENV === 'development' ? <small>{error?.data}</small> : null}
      <Link to="/">
        <button aria-label="Home page">Return back to Home page</button>
      </Link>
    </div>
  );
}
