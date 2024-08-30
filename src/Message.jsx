import { createSignal, createEffect } from "solid-js";
import * as cryptoUtils from "./cryptography/cryptoUtils";

function Message(props) {
    const [decryptedMessage, setDecryptedMessage] = createSignal("");

    const decryptMessage = async (message) => {
        Telegram.WebApp.CloudStorage.getItem("privateKey", async (error, privateKey) => {
            if (error || !privateKey) {
                console.log(error);
                setDecryptedMessage("خطا در رمزگشایی!");
                return;
            }

            try {
                const { ephemeralPublicKey, encryptedMessage } = cryptoUtils.splitEncryptedData(message);
                const decryptedMessage = cryptoUtils.hybridDecrypt(privateKey, ephemeralPublicKey, encryptedMessage);

                if (decryptedMessage === "") {
                    console.log(decryptedMessage);
                    setDecryptedMessage("خطا در رمزگشایی!");
                } else {
                    setDecryptedMessage(decryptedMessage);
                }
            } catch (e) {
                console.log(e);
                setDecryptedMessage("خطا در رمزگشایی!");
            }
        });
    };

    createEffect(() => {
        decryptMessage(props.content);
    });

    return (
        <div class="px-4 py-4 hover:bg-zinc-800 flex flex-col gap-2 border border-zinc-700 w-full rounded-md">
            <p dir="rtl" class="text-base">{decryptedMessage()}</p>
            <span class="text-sm text-sky-300">{props.time}</span>
        </div>
    );
}

export default Message;
