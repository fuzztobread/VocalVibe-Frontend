import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

//react ko lagi
import { store } from './app/store';
import { Provider } from 'react-redux';


const clientId = "963076518708-u7b6mdhr18id93r8sdua5caqi8av2g26.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>

      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);