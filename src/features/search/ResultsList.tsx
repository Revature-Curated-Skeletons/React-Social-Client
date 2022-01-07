import { NavLink } from 'react-router-dom';
import Result from './Result'

function ResultsList({ results }: any) {
  return (
    <>
      {
        results.map((result: any) => {
          <Result />
      }
      <br/>
    </>
  );
}

export default ResultsList;
