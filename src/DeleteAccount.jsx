import { A } from "@solidjs/router";
import axios from './axios';

const deleteAccount = async () => {
    try {
        const response = await axios.delete('/deleteAccount');

        if (response.status === 404) {
            throw new Error('User not found');
        }

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || `Error: ${error.response?.status} ${error.response?.statusText}`;
        throw new Error(errorMessage);
    }
}

function DeleteAccount() {
    const handleDeleteAccount = async () => {
        try {
            const response = await deleteAccount();
            Telegram.WebApp.close();
        } catch (err) {
            Telegram.WebApp.showAlert(err.message);
        }
    };

    return (
        <>
            <div class="border border-color bg-section px-4 py-4 rounded mx-auto max-w-md flex justify-center flex-col gap-3">
                <p dir="rtl">با حذف حساب کاربری، تمام اطلاعات ذکر شده شما در (<A href="/privacyPolicy" class="text-sky-500">حریم‌خصوصی</A>) پاک می شود. آیا مطمئن هستید؟</p>
                <div class="mt-8 max-w-md mx-auto flex items-center justify-center rounded px-8 py-8 gap-4">
                    <button onClick={handleDeleteAccount} type="button" class="flex items-center gap-2 px-10 py-2 text-center bg-zinc-800/80 text-white rounded-md">
                        حذف
                    </button>

                    <A href="/me" class="flex primary items-center gap-2 px-10 py-2 text-center bg-slate-200 text-black rounded-md">
                        بیخیال
                    </A>
                </div>
            </div>
            <div class="h-32"></div>
        </>
    );
}

export default DeleteAccount;
