import { createSignal, createEffect } from "solid-js";
import * as cryptoUtils from "./cryptography/cryptoUtils";

const splitComponents = (combinedString) => {
    const [iv, encryptedAESKey, encryptedMessage] = combinedString.split('-');
    return { iv, encryptedAESKey, encryptedMessage };
}

function Message(props) {
    const [decryptedMessage, setDecryptedMessage] = createSignal("");

    const decryptMessage = async (message) => {
        Telegram.WebApp.CloudStorage.getItem("privateKey", async (error, privateKey) => {
            if (error || !privateKey) {
                console.log(error)
                setDecryptedMessage("خطا در رمزگشایی!");
                return;
            }

            try {
                const { iv, encryptedAESKey, encryptedMessage } = splitComponents(message);
                const decryptedAESKey = cryptoUtils.decryptAESKey(encryptedAESKey, privateKey);
                const decryptedText = cryptoUtils.decryptAES(encryptedMessage, decryptedAESKey, iv);

                if (decryptedText === "") {
                    console.log(decryptedText)
                    setDecryptedMessage("خطا در رمزگشایی!");
                } else {
                    console.log(decryptedText)
                    setDecryptedMessage(decryptedText);
                }
            } catch (e) {
                console.log(e)
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
