
import Result from './Result'

function ResultsList({ results }: any) {
  console.log(results)
  return (
    <div className='results-list'>
      {
        results.map((result: any) => <Result user={result} />
        )}
    </div>
  );
}

export default ResultsList;
