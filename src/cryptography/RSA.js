import forge from 'node-forge';

export const generateKeyPair = async () => {
    const keys = await forge.pki.rsa.generateKeyPair({ bits: 4096, workers: 2 });
    const pubKey = forge.pki.publicKeyToPem(keys.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keys.privateKey);

    return { privateKey, pubKey };
}

export const encrypt = async (pubKey, data) => {
    const publicKey = forge.pki.publicKeyFromPem(pubKey);
    const encryptedMsg = publicKey.encrypt(data, 'RSA-OAEP');
    return forge.util.bytesToHex(encryptedMsg);
}

export const decrypt = async (privateKey, encryptedData) => {
    const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
    const encryptedBytes = forge.util.hexToBytes(encryptedData);
    return privateKeyObj.decrypt(encryptedBytes, 'RSA-OAEP');
}
