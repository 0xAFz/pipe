import { createResource } from "solid-js";
import { A } from "@solidjs/router";
import axios from './axios';

const getMe = async () => {
  const response = await axios.get('/getMe');
  return response.data;
}

function Me() {
  const [user] = createResource(getMe);

  const copyToClipboard = async () => {
    try {
      if (user() && user().private_id) {
        const userLink = `https://t.me/PipeChat_Bot?start=${user().private_id}`;
        await navigator.clipboard.writeText(userLink);
      } else {
        Telegram.WebApp.showAlert("User data is not available.");
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div onClick={copyToClipboard} class="active:bg-zinc-800 max-w-md mx-auto justify-between flex-row-reverse flex items-center border border-zinc-700 rounded-md px-8 py-3">
        <p>لینک ناشناس من</p>
        <button type="button" onClick={copyToClipboard} class="p-2 rounded bg-zinc-800 hover:bg-zinc-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
        </button>
      </div>

      <div class="mt-8 max-w-md border border-zinc-700 mx-auto flex items-center rounded-md px-8 py-8 gap-4">
        <A href="/deleteAccount" class="flex flex-row-reverse items-center gap-2 px-2 py-2 text-center bg-red-500 text-white rounded-md" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          حذف حساب کاربری
        </A>

        <A href="/privacyPolicy" class="flex flex-row-reverse items-center gap-2 px-2 py-2 text-center bg-slate-200 text-black rounded-md" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          حریم خصوصی
        </A>
      </div>
    </>
  );
}

export default Me;
