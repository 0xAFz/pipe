import forge from 'node-forge';

export function generateRSAKeyPair() {
    const keyPair = forge.pki.rsa.generateKeyPair(2048);
    return {
        privateKey: forge.pki.privateKeyToPem(keyPair.privateKey),
        pubKey: forge.pki.publicKeyToPem(keyPair.publicKey),
    };
}

export function encryptAESKey(aesKey, rsaPublicKey) {
    const publicKey = forge.pki.publicKeyFromPem(rsaPublicKey);
    const encryptedKey = publicKey.encrypt(aesKey);
    return forge.util.encode64(encryptedKey);
}

export function decryptAESKey(encryptedAESKey, rsaPrivateKey) {
    const privateKey = forge.pki.privateKeyFromPem(rsaPrivateKey);
    const decodedKey = forge.util.decode64(encryptedAESKey);
    return privateKey.decrypt(decodedKey);
}

export function encryptAES(plainText, key) {
    const iv = forge.random.getBytesSync(16);
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(plainText));
    cipher.finish();
    const encrypted = cipher.output;
    return {
        iv: forge.util.encode64(iv),
        data: forge.util.encode64(encrypted.getBytes())
    };
}

export function decryptAES(encryptedText, key, iv) {
    iv = forge.util.decode64(iv);
    encryptedText = forge.util.decode64(encryptedText);

    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv });
    decipher.update(forge.util.createBuffer(encryptedText));
    decipher.finish();
    return decipher.output.toString();
}

export function combineComponents(iv, aesKey, encryptedMessage) {
    return `${iv}-${aesKey}-${encryptedMessage}`;
}

export function splitComponents(combinedString) {
    const [iv, encryptedAESKey, encryptedMessage] = combinedString.split('-');
    return { iv, encryptedAESKey, encryptedMessage };
}
