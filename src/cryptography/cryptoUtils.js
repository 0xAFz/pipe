async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-256",
        },
        true,
        ["deriveKey", "deriveBits"]
    );
    return { privateKey: keyPair.privateKey, pubKey: keyPair.publicKey };
}

async function exportPublicKey(publicKey) {
    const exported = await window.crypto.subtle.exportKey("raw", publicKey);
    return btoa(String.fromCharCode.apply(null, new Uint8Array(exported)));
}

async function importPublicKey(publicKeyBase64) {
    const keyData = Uint8Array.from(atob(publicKeyBase64), (c) => c.charCodeAt(0));
    return window.crypto.subtle.importKey(
        "raw",
        keyData,
        {
            name: "ECDH",
            namedCurve: "P-256",
        },
        true,
        []
    );
}

async function deriveSharedSecret(privateKey, publicKey) {
    return window.crypto.subtle.deriveBits(
        {
            name: "ECDH",
            public: publicKey,
        },
        privateKey,
        256
    );
}

async function generateAESKey(sharedSecret) {
    return window.crypto.subtle.importKey(
        "raw",
        sharedSecret,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    );
}

async function encryptMessage(key, message) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(message);

    const ciphertext = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encoded
    );

    const encryptedData = new Uint8Array(iv.length + ciphertext.byteLength);
    encryptedData.set(iv);
    encryptedData.set(new Uint8Array(ciphertext), iv.length);

    return btoa(String.fromCharCode.apply(null, encryptedData));
}

async function decryptMessage(key, encryptedMessage) {
    const encryptedData = Uint8Array.from(atob(encryptedMessage), (c) => c.charCodeAt(0));
    const iv = encryptedData.slice(0, 12);
    const ciphertext = encryptedData.slice(12);

    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        ciphertext
    );

    return new TextDecoder().decode(decrypted);
}

async function hybridEncrypt(receiverPublicKeyBase64, message) {
    const ephemeralKeyPair = await generateKeyPair();
    const ephemeralPublicKeyBase64 = await exportPublicKey(ephemeralKeyPair.publicKey);
    const receiverPublicKey = await importPublicKey(receiverPublicKeyBase64);
    const sharedSecret = await deriveSharedSecret(ephemeralKeyPair.privateKey, receiverPublicKey);
    const aesKey = await generateAESKey(sharedSecret);
    const encryptedMessage = await encryptMessage(aesKey, message);
    return {
        ephemeralPublicKey: ephemeralPublicKeyBase64,
        encryptedMessage: encryptedMessage,
    };
}

async function hybridDecrypt(privateKey, ephemeralPublicKeyBase64, encryptedMessage) {
    const ephemeralPublicKey = await importPublicKey(ephemeralPublicKeyBase64);
    const sharedSecret = await deriveSharedSecret(privateKey, ephemeralPublicKey);
    const aesKey = await generateAESKey(sharedSecret);
    return decryptMessage(aesKey, encryptedMessage);
}

export {
    generateKeyPair,
    exportPublicKey,
    importPublicKey,
    hybridEncrypt,
    hybridDecrypt,
};

export function combineEncryptedData(ephemeralPublicKey, encryptedMessage) {
    return `${ephemeralPublicKey}-${encryptedMessage}`;
}

export function splitEncryptedData(combinedEncryptedData) {
    const [ephemeralPublicKey, encryptedMessage] = combinedEncryptedData.split('-');
    return { ephemeralPublicKey, encryptedMessage };
}
