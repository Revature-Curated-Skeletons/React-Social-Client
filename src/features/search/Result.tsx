export default function Result() {
  const url = `/profile/${result.id}`;
  return (
    <>
      <NavLink to={url} key={result.id}>{result.email}</NavLink><br key={result.id + "1"}/>
    </>
  )
}
