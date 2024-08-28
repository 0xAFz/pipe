function Message(props) {
    return (
        <div class="px-4 py-4 hover:bg-zinc-800 flex flex-col gap-2 border border-zinc-700 w-full rounded-md">
            <p class="text-base">{ props.content }</p>
            <span class="text-sm text-sky-300">{ props.time }</span>
        </div>
    );
}

export default Message;