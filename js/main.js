const BTN_TEST = document.getElementById('btn-test');

const ICON_CLASS = [
    'notification-tab__icon--alert',
    'notification-tab__icon--information',
    'notification-tab__icon--cross',
    'notification-tab__icon--check',
    'notification-tab__icon--cloud',
    'notification-tab__icon--internet',
    'notification-tab__icon--no-internet',
    'notification-tab__icon--download',
    'notification-tab__icon--message',
    'notification-tab__icon--bell',
    'notification-tab__icon--pin',
    'notification-tab__icon--reload'
    ];

const COLOR = [
                '#551d8b',
                '#BCCD2A',
                '#53AA13',
                '#13AA8F',
                '#1373AA',
                '#1335AA',
                '#5A13AA',
                '#AA13A3',
                '#AA134E',
                '#AA1313'
            ];

BTN_TEST.addEventListener("click", function(){
    const config = {
        iconClass: randomValue(ICON_CLASS),
        title: "Notificación",
        body: "<p>Mensaje normal, <span>bold</span></p>",
        color: randomValue(COLOR),
        displayTime: 3000
    };

    newToastMessage(config);
});

function randomValue(array){
    let random = Math.floor(Math.random() * array.length);
    let value = array[random];
    return value;
}