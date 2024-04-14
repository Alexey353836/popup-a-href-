"use strict"

function popups() {
    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');/*Для фиксированыйх*/ 
    const timeout = 200;
    const applicationFormContainer = document.querySelectorAll('.application-form__container');
    const  form = document.querySelectorAll('.form');
    const closeForm = document.querySelectorAll('.close-form');

    let curentPopup;
    let unlock = true;

    // Открыть попап
    if (popupLinks.length > 0){
        for (let index = 0; index < popupLinks.length; index++){
            const popupLink = popupLinks[index];
            popupLink.addEventListener('click', function(e) {
                const popupName = popupLink.getAttribute('href').replace('#','');
                curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            });
        }
    }
    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.application-form.open');
            if (popupActive){
                // popupClose(popupActive, false);
                popupClose(popupActive, false);
            }else{
                bodyLock();  
            }
            curentPopup.classList.add('open');
        }
    }

    //Закрыть попап
    function popupClosesss(e) {
        const popupActive = document.querySelector('.application-form.open');
        if (popupActive){
            popupClose(popupActive, false);
            bodyUnlock();
        }
    }
    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnlock();
            }
        }
    }
    function closeForms (e) {
        const targets = e.target;
        applicationFormContainer.forEach(element => {
            if (targets === element) {
                popupClosesss();
            }
        });
        form.forEach(element => {
            if (targets === element) {
                popupClosesss();
            }
        }); 
    }
    closeForm.forEach(element => {
        element.addEventListener('click', popupClosesss);
    });
    applicationFormContainer.forEach(element => {
        element.addEventListener('click', closeForms)
    });

    // Блокировать попап
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');
        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout);
    }

    // Функция разблокировать попап
    function bodyUnlock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for ( let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout)
    }

}
popups();