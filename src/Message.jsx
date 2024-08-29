import { decryptMessage } from "./cryptography/ECC";

function Message(props) {
    const decrypt = async (message) => {
        const pk = Telegram.WebApp.CloudStorage.getItem("privateKey");
        if (pk === "") {
            return "خطا در رمزگشایی!"
        }
        const decrypted = await decryptMessage(pk, message);
        if (decrypted === "") {
            return "خطا در رمزگشایی!"
        }
        return decrypted;
    }

    return (
        <div class="px-4 py-4 hover:bg-zinc-800 flex flex-col gap-2 border border-zinc-700 w-full rounded-md">
            <p class="text-base">{decrypt(props.content)}</p>
            <span class="text-sm text-sky-300">{props.time}</span>
        </div>
    );
}

export default Message;