import { createSignal, createResource, Switch, Match, Suspense } from "solid-js";
import { useParams } from "@solidjs/router";
import axios from './axios';

const getUser = async (privateID) => {
    try {
        const response = await axios.get(`/getUser/${privateID}`);

        if (response.status === 404) {
            throw new Error('User not found');
        }

        return response.data;
    } catch (error) {
        if (error.response && error.response.status !== 404) {
            const errorMessage = error.response?.data?.error || `Error: ${error.response?.status} ${error.response?.statusText}`;
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
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || `Error: ${error.response?.status} ${error.response?.statusText}`;
        throw new Error(errorMessage);
    }
}

function SendMessage() {
    const params = useParams();
    const [message, setMessage] = createSignal("");
    const [user] = createResource(params.privateID, getUser);

    const handleSend = async () => {
        try {
            const response = await sendMessage(params.privateID, message());
            setMessage("");
            Telegram.WebApp.showAlert("OK");
        } catch (err) {
            Telegram.WebApp.showAlert(err.message);
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

                            <button onClick={handleSend} type="button" class="bg-sky-600 w-full rounded px-4 py-2 active:bg-sky-700 transition">
                                ارسال
                            </button>
                        </Match>
                    </Switch>
                </Suspense>
            </div>
        </div>
    );
}

export default SendMessage;
