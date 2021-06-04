import logo from './logo.svg';
import './App.css';
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="container-fluid p-0">
      <nav className="navbar primary-navbar">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 lead">NEXT</span>
        </div>
      </nav>
      <ItemList></ItemList>
    </div>
  );
}

export default App;
