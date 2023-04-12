import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <p>Hi mom!</p>
      </div>
    </Provider>
  );
}

export default App;
