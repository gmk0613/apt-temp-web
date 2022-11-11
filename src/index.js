import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import appHistory from './appHistory';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <HistoryRouter history={appHistory}>
      <App />
    </HistoryRouter>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
