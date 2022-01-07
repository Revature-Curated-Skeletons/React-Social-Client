
import Result from './Result'

function ResultsList({ results }: any) {
  console.log(results)
  return (
    <>
      {
        results.map((result: any) => <Result user={result} />
        )}
      <br/>
    </>
  );
}

export default ResultsList;
