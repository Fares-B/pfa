// import { NativeBaseProvider } from 'native-base';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './layouts';
// import reportWebVitals from './reportWebVitals';
// import theme from "./assets/nativeBaseTheme";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <NativeBaseProvider theme={theme}> */}
      <App />
    {/* </NativeBaseProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
