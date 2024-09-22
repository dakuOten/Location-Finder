import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './main.css'

window.ZOHO.embeddedApp.on("PageLoad", function (Entity) {
  let EntityId = Entity.EntityId;
  let Module = Entity.Entity;
  window.ZOHO.CRM.UI.Resize({ height: "350", width: "500" }).then(function () {
 
    createRoot(document.getElementById('root')).render(
        <App />,
    )


  });
});

window.ZOHO.embeddedApp.init();
