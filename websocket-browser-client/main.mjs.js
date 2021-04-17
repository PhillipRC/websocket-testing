import App from './App.mjs.js';

// A HTML element to output returns from WebSocket Server
const outputElement = document.getElementById("output");

// A HTML element to send an echo message to the WebSocket Server
const echoOptionElement = document.getElementById("echoOption");

// Create the Application
const app = new App(
  'ws://localhost:8080',
  outputElement,
  echoOptionElement
);
