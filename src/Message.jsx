import { createSignal, createEffect } from "solid-js";
import * as cryptoUtils from "./cryptography/cryptoUtils";

function Message(props) {
    const [decryptedMessage, setDecryptedMessage] = createSignal("درحال رمزگشایی..");

    const decryptMessage = async (message) => {
        Telegram.WebApp.CloudStorage.getItem("privateKey", async (error, privateKey) => {
            if (error || !privateKey) {
                console.error('Failed to get private key', error);
                setDecryptedMessage("خطا در رمزگشایی!");
                return;
            }

            try {
                const privateKeyObj = await cryptoUtils.importPrivateKey(privateKey);
                const { ephemeralPublicKey, encryptedMessage } = cryptoUtils.splitEncryptedData(message);
                const decryptedMessage = await cryptoUtils.hybridDecrypt(privateKeyObj, ephemeralPublicKey, encryptedMessage);

                if (decryptedMessage === "") {
                    setDecryptedMessage("خطا در رمزگشایی!");
                } else {
                    setDecryptedMessage(decryptedMessage);
                }
            } catch (e) {
                console.error('Error occurred:', e.message);
                setDecryptedMessage("خطا در رمزگشایی!");
            }
        });
    };

    createEffect(() => {
        decryptMessage(props.content);
    });

    return (
        <div class={`max-w-screen-md mx-auto transition w-full px-4 py-4 hover:bg-zinc-900 flex flex-col gap-2 bg-section border border-color rounded-md ${props.class}`}>
            <p dir="rtl" class="text-base">{decryptedMessage()}</p>
            <span class="text-sm primary-fg">{props.time}</span>
        </div>
    );
}

export default Message;
