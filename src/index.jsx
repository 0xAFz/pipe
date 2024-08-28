/* @refresh reload */
import { render } from 'solid-js/web';
import { createResource, onMount } from 'solid-js';
import { Router, Route } from "@solidjs/router";
import axios from "./axios";

import './index.css';
import App from './App';
import Me from './Me';
import DeleteAccount from './DeleteAccount';
import PrivacyPolicy from './PrivacyPolicy';
import SendMessage from './SendMessage';
import Error from './Error';
import Navbar from './Navbar';
import Footer from './Footer';


const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const getMe = async () => {
  const response = await axios.get('/getMe');
  return response.data;
}

const MainLayout = (props) => {
  const [user] = createResource(getMe);

  onMount(() => {
    Telegram.WebApp.expand()
    Telegram.WebApp.setHeaderColor("#0C0A09");
  });

  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

render(
  () => (
    <Router root={MainLayout}>
      <Route path="/" component={App} />
      <Route path="/me" component={Me} />
      <Route path="/sendMessage/:privateID" component={SendMessage} />
      <Route path="/deleteAccount" component={DeleteAccount} />
      <Route path="/privacyPolicy" component={PrivacyPolicy} />
      <Route path="*" component={Error} />

    </Router>
  ),
  root
);