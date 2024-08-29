import elliptic from 'elliptic';

const ec = new elliptic.ec('secp256k1');

export const generateKeyPairs = () => {
  const keyPair = ec.genKeyPair();
  return {
    privateKey: keyPair.getPrivate('hex'),
    publicKey: keyPair.getPublic('hex'),
  };
};

export const encryptMessage = (publicKey, message) => {
  const key = ec.keyFromPublic(publicKey, 'hex');
  const encrypted = key.encrypt(message, 'hex');
  return encrypted;
};

export const decryptMessage = (privateKey, encrypted) => {
  const key = ec.keyFromPrivate(privateKey, 'hex');
  const decrypted = key.decrypt(encrypted, 'utf8');
  return decrypted;
};