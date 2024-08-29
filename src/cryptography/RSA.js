import forge from 'node-forge'

export const generateKeyPair = async () => {
    const keys = await forge.pki.rsa.generateKeyPair({ bits: 4096, workers: 2 })
    const pubKey = forge.pki.publicKeyToPem(keys.publicKey)
    const privateKey = forge.pki.privateKeyToPem(keys.privateKey)

    return { privateKey, pubKey }
}

export const encrypt = async (pubKey, data) => {
    const encryptedMsg = forge.pki.publicKeyFromPem(pubKey).encrypt(data)
    return forge.util.bytesToHex(encryptedMsg)
}

export const decrypt = async (privateKey, encryptedData) => {
    return forge.pki.privateKeyFromPem(privateKey).decrypt(forge.util.hexToBytes(encryptedData))
}
