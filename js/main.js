// selectedImageSrc: ده متغير هيخزن رابط الصورة اللي المستخدم هيختارها.
// selectedImageName: ده متغير هيخزن اسم الصورة اللي المستخدم هيختارها.
// currentMainImageIndex: ده متغير هيخزن الفهرس (الرقم) بتاع الصورة الرئيسية اللي المستخدم اختارها عشان يعرف نغيرها ولا لأ.

{
    let selectedImageSrc = ''; // بيخزن رابط الصورة اللي المستخدم هيختارها
    let selectedImageName = ''; // بيخزن اسم الصورة اللي المستخدم هيختارها
    let currentMainImageIndex = null; // بيخزن الفهرس (الرقم) بتاع الصورة الرئيسية المختارة
}


//mainPlayerImageContainer هنا، الكود بيعمل مستمع أحداث لكل صورة في .
// currentMainImageIndex لما المستخدم يضغط على صورة معينة، الفهرس بتاع الصورة بيتخزن في .
//من كل الصور ويضيفه للصورة اللي تم الضغط عليها عشان يبين إن هي الصورة المختارة. "active" اللي اسمه  class الكود كمان بيشيل الـ 

{
    document.querySelectorAll('#mainPlayerImageContainer .player img').forEach((img, index) => {
        // بيدور على كل صورة في ال container الرئيسي ويعملها مستمع أحداث
        img.addEventListener('click', () => {
            currentMainImageIndex = index; // لما تضغط على صورة، بيسجل الفهرس بتاعها
            document.querySelectorAll('#mainPlayerImageContainer img').forEach(img => img.classList.remove('active'));
            // بيشيل الـclass "active" من كل الصور
            img.classList.add('active'); // بيضيف الـclass "active" للصورة اللي تم الضغط عليها
        });
    });
}




//options-players هنا، الكود بيضيف مستمع أحداث لكل صورة في الـ .
// disabled لما المستخدم يضغط على صورة، الكود بيتأكد إن الصورة مش 
//  (مش معطلة) عشان يسمح له يختارها.

{
    document.querySelectorAll('.options-players img').forEach(img => {
        // بيدور على كل صورة في الـ options-players ويعملها مستمع أحداث
        img.addEventListener('click', () => {
            if (!img.classList.contains('disabled')) {
                // بيتأكد إن الصورة مش "disabled" عشان يسمح بالاختيار
                selectedImageSrc = img.src; // بيخزن رابط الصورة اللي تم اختيارها
                selectedImageName = img.getAttribute('data-name'); // بيخزن اسم الصورة اللي تم اختيارها
                document.querySelectorAll('.options-players img').forEach(img => img.classList.remove('selected'));
                // بيشيل الـclass "selected" من كل الصور
                img.classList.add('selected'); // بيضيف الـclass "selected" للصورة اللي تم اختيارها
            }
        });
    });
}



//"Save changes" هنا، الكود بيعمل مستمع أحداث للزرار .
// لما تضغط على الزرار، الكود بيتأكد إنك اخترت صورة وإنك حددت فهرس لصورة رئيسية.
//"active" اللي اسمه  class بعد كده، الكود بيغير الصورة الرئيسية للصورة المختارة الجديدة ويشيل منها الـ 
// الكود كمان بيغير اسم اللاعب (أو اسم اللي جوه الصورة) للاسم الجديد اللي المستخدم اختاره.
// الصورة المختارة بعد كده بتتعطل عشان ما ينفعش تختارها تاني.
// في الآخر، الكود بيفضي المتغيرات اللي خزن فيها المعلومات، ويخفي المودال (الشاشة اللي كانت مفتوحة).

{
    document.getElementById('saveChangesButton').addEventListener('click', () => {
        if (selectedImageSrc && currentMainImageIndex !== null) {
            // بيتأكد إن فيه صورة مختارة وإن الفهرس بتاع الصورة الرئيسية موجود
            const mainImage = document.querySelectorAll('#mainPlayerImageContainer .player img')[currentMainImageIndex];
            // بيحدد الصورة الرئيسية اللي هيتغير محتواها
            mainImage.src = selectedImageSrc; // بيغير رابط الصورة الرئيسية للصورة المختارة
            mainImage.classList.remove('active'); // بيشيل الـclass "active" من الصورة

            const playerNameContainer = mainImage.nextElementSibling; // بيجيب العنصر اللي بعد الصورة (اللي هو اسم اللاعب)
            playerNameContainer.textContent = selectedImageName; // بيغير اسم اللاعب للاسم المختار

            document.querySelector(`.options-players img[src="${selectedImageSrc}"]`).classList.add('disabled');
            // بيعطل الصورة اللي تم اختيارها عشان ما تتكرر
            selectedImageSrc = ''; // بيفضي المتغير اللي بيخزن رابط الصورة
            selectedImageName = ''; // بيفضي المتغير اللي بيخزن اسم الصورة
            currentMainImageIndex = null; // بيفضي الفهرس بتاع الصورة الرئيسية
            $('#exampleModal').modal('hide'); // بيخفي المودال بعد الحفظ
        }
    });
}






// إضافة مستمع أحداث للزر Save changes_2
document.getElementById('saveChangesButton_2').addEventListener('click', () => {
    if (selectedImageSrc && currentMainImageIndex !== null) {
        const mainImage = document.querySelectorAll('#mainPlayerImageContainer .player img')[currentMainImageIndex];
        mainImage.src = selectedImageSrc;
        mainImage.classList.remove('active');

        const playerNameContainer = mainImage.nextElementSibling;
        playerNameContainer.textContent = selectedImageName;

        // تعطيل الصورة المختارة
        document.querySelector(`.options-players img[src="${selectedImageSrc}"]`).classList.add('disabled');
        // إعادة تعيين المتغيرات
        selectedImageSrc = '';
        selectedImageName = '';
        currentMainImageIndex = null;
        // إخفاء المودال
        $('#exampleModal').modal('hide');
    }
});

// إضافة مستمع أحداث للزر Save changes_3
document.getElementById('saveChangesButton_3').addEventListener('click', () => {
    if (selectedImageSrc && currentMainImageIndex !== null) {
        const mainImage = document.querySelectorAll('#mainPlayerImageContainer .player img')[currentMainImageIndex];
        mainImage.src = selectedImageSrc;
        mainImage.classList.remove('active');

        const playerNameContainer = mainImage.nextElementSibling;
        playerNameContainer.textContent = selectedImageName;

        // تعطيل الصورة المختارة
        document.querySelector(`.options-players img[src="${selectedImageSrc}"]`).classList.add('disabled');
        // إعادة تعيين المتغيرات
        selectedImageSrc = '';
        selectedImageName = '';
        currentMainImageIndex = null;
        // إخفاء المودال
        $('#exampleModal').modal('hide');
    }


});

// إضافة مستمع أحداث للزر Save changes_4
document.getElementById('saveChangesButton_4').addEventListener('click', () => {
    if (selectedImageSrc && currentMainImageIndex !== null) {
        const mainImage = document.querySelectorAll('#mainPlayerImageContainer .player img')[currentMainImageIndex];
        mainImage.src = selectedImageSrc;
        mainImage.classList.remove('active');

        const playerNameContainer = mainImage.nextElementSibling;
        playerNameContainer.textContent = selectedImageName;

        // تعطيل الصورة المختارة
        document.querySelector(`.options-players img[src="${selectedImageSrc}"]`).classList.add('disabled');
        // إعادة تعيين المتغيرات
        selectedImageSrc = '';
        selectedImageName = '';
        currentMainImageIndex = null;
        // إخفاء المودال
        $('#exampleModal').modal('hide');
    }


});


// إضافة مستمع أحداث للزر Save changes_5
document.getElementById('saveChangesButton_5').addEventListener('click', () => {
    if (selectedImageSrc && currentMainImageIndex !== null) {
        const mainImage = document.querySelectorAll('#mainPlayerImageContainer .player img')[currentMainImageIndex];
        mainImage.src = selectedImageSrc;
        mainImage.classList.remove('active');

        const playerNameContainer = mainImage.nextElementSibling;
        playerNameContainer.textContent = selectedImageName;

        // تعطيل الصورة المختارة
        document.querySelector(`.options-players img[src="${selectedImageSrc}"]`).classList.add('disabled');
        // إعادة تعيين المتغيرات
        selectedImageSrc = '';
        selectedImageName = '';
        currentMainImageIndex = null;
        // إخفاء المودال
        $('#exampleModal').modal('hide');
    }


});



