import { decrypt } from "./cryptography/RSA";
import { createSignal } from "solid-js";

function Message(props) {
    const [decryptedMessage, setDecryptedMessage] = createSignal("");

    const decryptMessage = async (message) => {
        Telegram.WebApp.CloudStorage.getItem("privateKey", async (error, privateKey) => {
            if (error || !privateKey) {
                setDecryptedMessage("خطا در رمزگشایی!");
                return;
            }

            try {
                const decrypted = await decrypt(privateKey, message);
                if (decrypted === "") {
                    setDecryptedMessage("خطا در رمزگشایی!");
                } else {
                    setDecryptedMessage(decrypted);
                }
            } catch (e) {
                setDecryptedMessage("خطا در رمزگشایی!");
            }
        });
    };

    createEffect(() => {
        decryptMessage(props.content);
    });

    return (
        <div class="px-4 py-4 hover:bg-zinc-800 flex flex-col gap-2 border border-zinc-700 w-full rounded-md">
            <p class="text-base">{decryptedMessage()}</p>
            <span class="text-sm text-sky-300">{props.time}</span>
        </div>
    );
}

export default Message;
