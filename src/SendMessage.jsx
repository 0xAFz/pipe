import { createSignal, createResource, Switch, Match, Suspense } from "solid-js";
import { useParams } from "@solidjs/router";
import axios from './axios';
import * as cryptoUtils from "./cryptography/cryptoUtils";

const getUser = async (privateID) => {
    try {
        const response = await axios.get(`/getUser/${privateID}`);

        if (response.status === 404) {
            console.error("User not found", response.status, response.statusText)
            throw new Error('User not found');
        }

        return response.data;
    } catch (error) {
        if (error.response && error.response.status !== 404) {
            const errorMessage = error.response?.data?.error || `Error: ${error.response?.status} ${error.response?.statusText}`;
            console.error(errorMessage)
            throw new Error(errorMessage);
        }
        throw error;
    }
}

const sendMessage = async (privateID, message) => {
    try {
        const response = await axios.post(`/sendMessage/${privateID}`, { "message": message }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            console.error("Failed to send message", response.status, response.statusText)
            throw new Error("Failed to send message");
        }

        return response.data;
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response?.data?.error || `Error: ${error.response?.status} ${error.response?.statusText}`;
            console.error(errorMessage)
            throw new Error(errorMessage);
        }
        throw error;
    }
}

function SendMessage() {
    const params = useParams();
    const [user] = createResource(params.privateID, getUser);
    const [message, setMessage] = createSignal("");
    const [sendStatus, setSendStatus] = createSignal("");
    const [isPending, setIsPending] = createSignal(false);

    const handleSendMessage = async () => {
        if (isPending()) return;
        
        if (!message().trim()) {
            setSendStatus("پیامت نمی‌تونه خالی باشه!");
            setTimeout(() => {
                setSendStatus("");
            }, 3000);
            return;
        }

        try {
            setIsPending(true);

            const { ephemeralPublicKey, encryptedMessage } = await cryptoUtils.hybridEncrypt(user().pubkey, message());
            const combinedData = cryptoUtils.combineEncryptedData(ephemeralPublicKey, encryptedMessage);

            const response = await sendMessage(params.privateID, combinedData);
            setMessage("");
            setSendStatus("پیامتو فرستادیم.");
        } catch (err) {
            setSendStatus("اوه، مثل اینکه یه مشکلی هست. متاسفانه نتونستیم پیامت رو به دستش برسونیم!")
        } finally {
            setTimeout(() => {
                setSendStatus("");
                setIsPending(false);
            }, 5000);
        }
    };

    return (
        <div class="max-w-screen-md mx-auto">
            <div dir="rtl" class="flex flex-col items-center justify-center shadow-[0_0_70px_theme('colors.sky.950')] p-4 rounded-lg gap-4">
                <Suspense fallback={<div dir="rtl">درحال پیدا کردن کاربر..</div>}>
                    <Switch>
                        <Match when={user.error}>
                            {user.error.message === 'User not found' ? (
                                <span dir="rtl">متاسفانه پیداش نکردیم :(</span>
                            ) : (
                                <span dir="rtl">اوه، یه مشکلی پیش اومده: {user.error.message}</span>
                            )}
                        </Match>
                        <Match when={user()}>
                            <p dir="rtl" class="text-base">پیامی که میخوای به <span class="text-sky-500">{params.privateID}</span> برسونیم رو بنویس..</p>
                            <textarea value={message()} onInput={(e) => setMessage(e.target.value)} dir="rtl" class="resize-none bg-transparent border border-zinc-600 focus:shadow-[0_0_4px_theme('colors.white')] rounded-md min-h-32 w-full ring-0 outline-0 px-2 py-1" placeholder="متن پیام.." name="message" id="message"></textarea>

                            <button onClick={handleSendMessage} type="button" class="bg-sky-600 w-full rounded px-4 py-2 active:bg-sky-700 transition">
                                ارسال
                            </button>

                            {sendStatus() && <p dir="rtl" class="text-sm text-center mt-4">{sendStatus()}</p>}
                        </Match>
                    </Switch>
                </Suspense>
            </div>
        </div>
    );
}

export default SendMessage;
