import logo from './logo.svg'
import './App.css'
import { useQuery } from '@apollo/client'
import { queryPeople } from './gql/queryPeople'
import { People } from './components/People';

function App() {

  const { data, error, loading } = useQuery(queryPeople);

  if (error) return <span style='color: red'>{error}</span>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Graphql + React!</p>
        { loading && <p>Loading...</p> }
        { data && <People people={data.allPeople} /> }
      </header>
    </div>
  )
}

export default App
