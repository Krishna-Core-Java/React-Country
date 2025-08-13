import { NavLink, useRouteError } from 'react-router-dom'

const ErrorPage = () => {

  const error = useRouteError();
  console.log(error)

  return (
    <>
      <h1>Oops! An Error Occurred.</h1>
      {error && <p>{error.data}</p>}
      <NavLink to="/"><button>Go Home</button></NavLink>
    </>
  )
}

export default ErrorPage
