import { createResource, For, Show, Suspense } from "solid-js";
import axios from './axios';
import Message from "./Message";


const getMessages = async () => {
  const response = await axios.get('/getMessages');
  return response.data;
}

const formatUnixTime = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert Unix time to milliseconds
  const hours = date.getHours().toString().padStart(2, '0'); // Get hours and pad with zero if needed
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with zero if needed
  return `${hours}:${minutes}`;
}

function Home() {
  const [messages] = createResource(getMessages);

  return (
    <div class="flex flex-col items-center justify-center max-w-screen-md mx-auto gap-4">
      <Suspense fallback={<div dir="rtl">صبر کن پیاماتو بگیریم..</div>}>
        <Show when={messages() && messages().length > 0} fallback={<div dir="rtl">فعلا هیچ پیامی نداری!</div>}>
          <For each={messages()}>
            {(message) => (
              <Message content={message.text} time={formatUnixTime(message.date)} />
            )}
          </For>
        </Show>
        <div class="h-16"></div>
      </Suspense>
    </div>
  );
}

export default Home;
