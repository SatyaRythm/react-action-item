import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
// import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
       {/* <BrowserRouter> */}
       <main className="">
         <App />
       </main>
       {/* </BrowserRouter> */}
    </NextUIProvider>
  </React.StrictMode>
);

// const init = ({
//   rootElement,
//   allActionItems,
//   overdueActionItems,
//   openActionItems,
//   closedActionItems,
// }) => {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <React.StrictMode>
//       <NextUIProvider>
//         {/* <BrowserRouter> */}
//           <main className="">
//           <App
//             allActionItems={allActionItems}
//             overdueActionItems={overdueActionItems}
//             openActionItems={openActionItems}
//             closedActionItems={closedActionItems}
//             // pageReferences={pageReferences}
//           />
//          </main>
//          {/* </BrowserRouter> */}
//       </NextUIProvider>
//     </React.StrictMode>
//   );
// };

// window.ReactApp = {
//   init: init,
// };
