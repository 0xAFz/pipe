/* @refresh reload */
import { render } from 'solid-js/web';
import { createResource, onMount } from 'solid-js';
import { Router, Route } from "@solidjs/router";
import axios from "./axios";
import * as cryptoUtils from './cryptography/cryptoUtils';
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

const setPubKey = async (pubKey) => {
  try {
    const response = await axios.patch('/setPubKey', { "pubkey": pubKey },
      {
        headers: { 'Content-Type': 'application/json' },
      });

    if (response.status !== 200) {
      Telegram.WebApp.showAlert("Failed to set public key on server");
      console.error('Error occurred: Failed to set public key on server');
      throw new Error('Failed to set public key on server');
    }
    return response;
  } catch (e) {
    console.error('Failed to set public key on server', e.message);
  }
}

const getMe = async () => {
  try {
    const response = await axios.get('/getMe');

    if (response.status === 201) {
      const keyPair = await cryptoUtils.generateKeyPair();
      const privateKey = await cryptoUtils.exportPrivateKey(keyPair.privateKey);
      const pubKeyBase64 = await cryptoUtils.exportPublicKey(keyPair.publicKey);

      Telegram.WebApp.CloudStorage.setItem('privateKey', privateKey);
      Telegram.WebApp.CloudStorage.setItem('pubKey', pubKeyBase64);

      const resp = await setPubKey(pubKeyBase64);
      console.log('Public key set successfully');
    }

    return response.data;
  } catch (e) {
    console.error('Error occurred:', e.message);
  }
};

const MainLayout = (props) => {
  const [user] = createResource(getMe);

  onMount(() => {
    Telegram.WebApp.expand();
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