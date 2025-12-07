import { useRouteError, isRouteErrorResponse } from 'react-router';

export function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div>
        <h1>Page not found</h1>
        <p>Sorry, there is no such page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>Try refreshing the page.</p>
    </div>
  );
}
