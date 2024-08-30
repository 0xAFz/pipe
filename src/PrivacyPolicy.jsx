function PrivacyPolicy() {
    return (
        <div dir="rtl" class="flex flex-col justify-center max-w-screen-md mx-auto gap-4">
            <h1 dir="rtl" class="text-xl font-medium">حریم خصوصی</h1>
            <p dir="rtl" class="text-base">
                در ربات <a href="https://t.me/PipeChat_Bot" class="text-sky-500">t.me/PipeChat_Bot</a> تمامی اطلاعات شخصی کاربران از جمله پیام‌ها، عکس‌ها، ویدیوها، صداها و سایر محتواها به صورت رمزنگاری شده ذخیره و انتقال داده می‌شوند تا حریم خصوصی شما حفظ شود.
            </p>
            <p dir="rtl" class="text-base">
                توجه:‌ تمامی پیام‌های ارسال شده توسط کاربران به صورت خودکار بعد از ۳۰ دقیقه پاک می شوند.
            </p>

            <h1 dir="rtl" class="text-xl font-medium">جمع‌آوری اطلاعات</h1>
            <p dir="rtl" class="text-base">
                برای ارائه خدمات بهتر و حفظ امنیت کاربران، ما اطلاعات زیر را ذخیره می‌کنیم:
            </p>
            <br />
            <ul dir="rtl" class="list-disc list-inside">
                <li>شناسه عددی تلگرام (User ID)</li>
                <li>تاریخ ساخت حساب کاربری</li>
                <li>کلید عمومی (Public Key)</li>
                <li>شناسه تصادفی خصوصی (Private Random ID)</li>
            </ul>
            <br />
            <p dir="rtl" class="text-base">
                <strong>چرا این اطلاعات ذخیره می‌شوند؟</strong><br />
                - برای ارسال اعلان‌ها (نوتیفیکیشن‌ها) به کاربران از طریق ربات<br />
                - برای احراز هویت و تایید اعتبار کاربران از طریق تلگرام<br />
                - برای حفظ ناشناس بودن ارسال‌کننده پیام‌ها در حین استفاده از ربات<br />
            </p>

            <h1 dir="rtl" class="text-xl font-medium">قوانین و شرایط استفاده</h1>
            <p dir="rtl" class="text-base">
                استفاده از ربات <a href="https://t.me/PipeChat_Bot" class="text-sky-500">t.me/PipeChat_Bot</a> به معنای پذیرش شرایط ذخیره و استفاده از اطلاعات ذکر شده است.
                این ربات هیچ‌گونه مسئولیتی در قبال سوءاستفاده از خدمات ربات توسط کاربران ندارد.
            </p>

            <div class="h-32"></div>
        </div>
    );
}

export default PrivacyPolicy;