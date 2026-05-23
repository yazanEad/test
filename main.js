// التعامل مع حدث إرسال نموذج الدخول
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  // التحقق من صحة البيانات
  if (email.trim() === "" || password.trim() === "") {
    alert("يرجى ملء جميع الحقول المطلوبة");
    return;
  }

  // محاكاة عملية الدخول
  console.log("البريد الإلكتروني:", email);
  console.log("كلمة المرور:", password);
  console.log("تذكرني:", remember);

  // يمكنك إضافة طلب إلى الخادم هنا
  alert("تم الدخول بنجاح: " + email);
});
