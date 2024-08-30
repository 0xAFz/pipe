# Pipe

Pipe is a Telegram Mini App with E2EE (ECC + AES), Users can send hidden message to each other. 

## End-to-End Encryption Workflow

### Overview

This document outlines the end-to-end encryption (E2EE) workflow implemented in our web application. The system uses a hybrid encryption approach combining Elliptic Curve Cryptography (ECC) for key exchange and AES for message encryption.

### Key Components

1. **ECC Key Pair**: A public-private key pair used for secure key exchange.
2. **AES Key**: A symmetric key derived from the shared secret, used for encrypting and decrypting messages.
3. **Telegram Mini App Cloud Storage**: Used to store the user's private key securely on the client-side.

## Workflow Steps

### 1. Initial Setup (First-time User)

1. The client generates an ECC key pair (public and private keys).
2. The private key is exported as a JSON Web Key (JWK) and stored in Telegram Mini App Cloud Storage.
3. The public key is exported in base64 format and sent to the server.
4. The server stores the user's public key associated with their account.

### 2. Sending a Message

1. The sender retrieves the recipient's public key from the server.
2. The sender generates an ephemeral ECC key pair.
3. Using the recipient's public key and the ephemeral private key, a shared secret is derived.
4. An AES key is generated from the shared secret.
5. The message is encrypted using the AES key.
6. The encrypted message and the ephemeral public key are sent to the server.

### 3. Receiving a Message

1. The recipient receives the encrypted message and ephemeral public key from the server.
2. The recipient retrieves their private key from Telegram Mini App Cloud Storage and imports it as a CryptoKey object.
3. Using their private key and the sender's ephemeral public key, the same shared secret is derived.
4. The same AES key is generated from the shared secret.
5. The message is decrypted using the AES key.

### Security Considerations

- The private key never leaves the client device, ensuring end-to-end encryption.
- A new ephemeral key pair is used for each message, providing forward secrecy.
- The server never has access to the private keys or the decrypted messages.

# ECC vs RSA: Key Points for End-to-End Encryption

### Overview

Elliptic Curve Cryptography (ECC) and RSA are both asymmetric encryption algorithms used in public key cryptography. While RSA has been the standard for many years, ECC has gained popularity, especially in mobile and web applications, due to its efficiency and strength at smaller key sizes.

### Key Advantages of ECC over RSA

1. **Smaller Key Size**
   - ECC can provide the same level of security as RSA with significantly smaller key sizes.
   - Example: A 256-bit ECC key is roughly equivalent in security to a 3072-bit RSA key.
   - Smaller keys mean less data to transmit, store, and process.

2. **Faster Computation**
   - ECC operations are generally faster than equivalent RSA operations.
   - This leads to improved performance, especially on devices with limited computational power.

3. **Lower Resource Usage**
   - ECC requires less memory and CPU usage compared to RSA for the same security level.
   - This is particularly beneficial for mobile devices and web applications.

4. **Better Scalability**
   - As security requirements increase over time, ECC scales better than RSA.
   - Increasing key sizes in ECC has a lower performance impact compared to RSA.

5. **Energy Efficiency**
   - The lower computational requirements of ECC translate to reduced energy consumption.
   - This is crucial for battery-powered devices and large-scale server operations.

6. **Future-Proofing**
   - ECC is considered more quantum-resistant compared to RSA.
   - While not fully quantum-safe, ECC would require larger quantum computers to break than equivalent RSA keys.

7. **Efficient for Key Exchange**
   - ECC is particularly efficient for key exchange protocols like ECDH (Elliptic Curve Diffie-Hellman).
   - This makes it ideal for establishing shared secrets in end-to-end encryption scenarios.

8. **Widespread Support**
   - Modern cryptographic libraries and web standards (like WebCrypto API) have robust support for ECC.
   - This ensures compatibility across different platforms and browsers.

### Practical Implications for E2EE in Web Applications

1. **Faster Encryption/Decryption**
   - ECC's efficiency means quicker message encryption and decryption, improving user experience.

2. **Reduced Network Overhead**
   - Smaller key sizes and signatures mean less data transferred, beneficial for mobile networks.

3. **Better Performance on Various Devices**
   - ECC's lower resource requirements ensure smooth operation across a wide range of devices.

4. **Improved Battery Life**
   - For mobile applications, the energy efficiency of ECC contributes to better battery life.

5. **Future-Ready Security**
   - As security standards evolve, ECC provides a more adaptable foundation for long-term security.

## Conclusion

While RSA remains a robust and widely used algorithm, ECC offers significant advantages in terms of efficiency, performance, and future-readiness. For modern web and mobile applications implementing end-to-end encryption, ECC provides an excellent balance of security and efficiency, making it the preferred choice for our E2EE implementation.

## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (github pages, netlify, cloudflare pages, etc.)
