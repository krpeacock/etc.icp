import React from "react";
import ReactDOM from "react-dom/client";
import { etc } from "./actor";
import App from "./App";


const render404 = () => {
  const div = document.createElement("div");
  const header = document.createElement("h1");
  const link = document.createElement("a");

  header.innerText = "404: redirect not found";
  link.innerText = "Return home";
  link.href = "/";

  div.appendChild(header);
  div.appendChild(link);

  document.body.appendChild(div);
};

if (
  location.pathname.startsWith("/r/") &&
  location.pathname.split("/r/").length
) {
  const shortened = location.pathname.split("/r/")[1];
  etc
    .get(shortened)
    .then((url) => {
      if (url) {
        location.assign(url);
      } else {
        render404();
      }
    })
    .catch((_) => {
      render404();
    });
} else {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(<App />);
}

