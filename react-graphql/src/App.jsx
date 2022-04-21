import logo from './logo.svg'
import './App.css'
import { useQuery } from '@apollo/client'
import { queryPeople } from './gql/queryPeople'
import { People } from './components/People';
import { PersonForm } from './components/PersonForm';

function App() {

  const { data, error, loading } = useQuery(
    queryPeople,
    // { pollInterval: 2000 } // Every 2000 ms ask to server for new info
  );

  if (error) return <span style='color: red'>{error}</span>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Graphql + React!</p>
        { loading && <p>Loading...</p> }
        { data && <People people={data.allPeople} /> }
        <PersonForm/>
      </header>
    </div>
  )
}

export default App
