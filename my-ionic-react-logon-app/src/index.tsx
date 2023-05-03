import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// We need:
// "@ionic/pwa-elements": "^3.1.1", 
// in package json
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AuthProvider } from "./AuthContext";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
