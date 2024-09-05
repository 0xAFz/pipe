import { createSignal, createResource, Suspense, Show, For, onCleanup, onMount } from "solid-js";
import axios from './axios';
import Message from "./Message";

const getMessages = async () => {
  const response = await axios.get('/getMessages');
  return response.data;
};

const formatUnixTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

function Home() {
  const [messages, { mutate }] = createResource(getMessages);
  const [newMessageAnimation, setNewMessageAnimation] = createSignal(false);

  const getUpdates = async () => {
    try {
      const response = await axios.get('/getUpdates?timeout=60');
      if (response.status === 200 && response.data.length > 0) {
        setNewMessageAnimation(true);
        mutate(prevMessages => [...response.data, ...prevMessages]);
      }
    } catch (error) {
      console.error("Error polling updates:", error);
    } finally {
      getUpdates();
    }
  };

  onMount(() => {
    messages();
    getUpdates();
  });

  onCleanup(() => {
    setNewMessageAnimation(false);
  });

  return (
    <div class="flex flex-col items-center justify-center max-w-screen-md mx-auto gap-4">
      <Suspense fallback={<div dir="rtl">صبر کن پیاماتو بگیریم..</div>}>
        <Show when={messages()?.length > 0} fallback={<div dir="rtl">فعلا هیچ پیامی نداری!</div>}>
          <For each={messages()}>
            {(message, index) => (
              <Message
                key={message.message_id}
                content={message.text}
                time={formatUnixTime(message.date)}
                class={`${index() === 0 && newMessageAnimation()
                  ? "animate-slideIn"
                  : index() !== 0 && newMessageAnimation()
                    ? "animate-slideDown"
                    : ""
                  }`}
              />
            )}
          </For>
        </Show>
      </Suspense>
      <div class="h-16"></div>
    </div>
  );
}

export default Home;
