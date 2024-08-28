import { A } from "@solidjs/router";

function Error() {
    return (
        <div class="flex flex-col items-center justify-center max-w-screen-md mx-auto gap-4 min-h-screen">
            <h1 class="text-7xl -mt-34 border-b border-zinc-700">404</h1>
            <p class="text-xl">اینجا چیزی وجود نداره</p>
            <A href="/" class="flex flex-row-reverse items-center gap-2 px-10 py-2 text-center bg-slate-200 text-black rounded-md" type="button">
                بازگشت
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 stroke-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </A>
        </div>
    );
}

export default Error;