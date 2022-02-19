import { Route } from 'wouter';
import './App.css';
import Testing from './pages/Testing';

function App() {
  const getLocation = () => {
    if(!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating…');
      navigator.geolocation.watchPosition(
        (success) => console.log(success),
        (error) => console.log(error)
      );
    }
  }
  return (
    <>
      <h1>Hello</h1>
      <Route path="/testing" component={Testing} />
      <Route path="/waho" component={Testing} />
    </>
  );
}

export default App;
