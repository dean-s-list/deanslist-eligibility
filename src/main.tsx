import ReactDOM from 'react-dom/client';
import { App } from './app';
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

// Patch BigInt so we can log it using JSON.stringify without any errors
(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};
