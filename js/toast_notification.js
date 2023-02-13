const CONTAINER_QUOTE = document.getElementById('notification-container');

class createToastMessage{
    constructor(config){
        this.iconClass = config.iconClass;
        this.title = config.title;
        this.body = config.body;
        this.color = config.color;
        this.displayTime = config.displayTime || null;

        this.eventGroup_CreateToastNotification();
 
        //change_ propiedad _when_ evento
        // eventGroup_ grupo _For_ 

		if(this.displayTime){
            this.time_original = this.displayTime;
            this.time_remain = this.displayTime;
            this.time_percentage = 100;
			this.eventGroup_NotificationTimer();
        }

        this.remove_ToastNotification_When_Click();
    }

    // Events group
    eventGroup_CreateToastNotification(){
        this.createTabElements();
        this.addClassToTabElements();
        this.addContentToElements();
        this.joinTabToDocument();
    }

    eventGroup_NotificationTimer(){
        this.set_Timer_For_ToastNotification();
		this.change_Timer_When_Mouseout();
		this.change_Timer_When_Mouseover();
    }
    
    /*  Create a new tab (functions) */
    createTabElements(){
        // notification-tab
        this.notification_tab = document.createElement('div');

        // notification-tab__content-container
        this.notification_tab__content_container = document.createElement('div');

        // notification-tab__icon-container
        this.notification_tab__icon_container = document.createElement('div');

        // notification-tab__icon
        this.notification_tab__icon = document.createElement('div');

        // notification-tab__text-container
        this.notification_tab__text_container = document.createElement('div');

        // notification-tab__title
        this.notification_tab__title = document.createElement('div');

        // notification-tab__title (etiqueta <p>)
        this.notification_tab__title_content = document.createElement('p');

        // notification-tab__description
        this.notification_tab__description = document.createElement('div');

        // notification-tab__progressbar-container
        this.notification_tab__progressbar_container = document.createElement('div');

        // notification-tab__progressbar
        this.notification_tab__progressbar = document.createElement('span');
    }

    addClassToTabElements(){
        this.notification_tab.classList.add('notification-tab');
        this.notification_tab__content_container.classList.add('notification-tab__content-container');
        this.notification_tab__icon_container.classList.add('notification-tab__icon-container');
        this.notification_tab__icon.classList.add('notification-tab__icon');
        this.notification_tab__text_container.classList.add('notification-tab__text-container');
        this.notification_tab__title.classList.add('notification-tab__title');
        this.notification_tab__description.classList.add('notification-tab__description');
        this.notification_tab__progressbar_container.classList.add('notification-tab__progressbar-container');
        this.notification_tab__progressbar.classList.add('notification-tab__progressbar');
    }

    addContentToElements(){
        // set icon (class)
        this.notification_tab__icon.classList.add(this.iconClass);

        // title
        this.notification_tab__title_content.innerHTML = this.title;

        // body
        this.notification_tab__description.innerHTML = this.body;

        // color
        this.notification_tab__progressbar.style.background = this.color;
    }

    joinTabToDocument(){
        // Add notification-tab__progressbar to notification-tab__progressbar-container (Group 1)
        this.notification_tab__progressbar_container.appendChild(this.notification_tab__progressbar);

        // Add notification-tab__icon to notification-tab__icon-container (Group 2)
        this.notification_tab__icon_container.appendChild(this.notification_tab__icon);

        // Add <p> to notification-tab__title (Group 3)
        this.notification_tab__title.appendChild(this.notification_tab__title_content);

        // Add notification-tab__title to notification-tab__text-container
        this.notification_tab__text_container.appendChild(this.notification_tab__title);

        // Add notification-tab__description to notification-tab__text-container
        this.notification_tab__text_container.appendChild(this.notification_tab__description);

        // Add notification-tab__icon-container to notification-tab__content-container
        this.notification_tab__content_container.appendChild(this.notification_tab__icon_container);

        // Add notification-tab__text-container to notification-tab__content-container
        this.notification_tab__content_container.appendChild(this.notification_tab__text_container);

        // Add notification-tab__content-container to notification-tab
        this.notification_tab.appendChild(this.notification_tab__content_container);

        // Add notification-tab__progressbar-container to notification-tab
        this.notification_tab.appendChild(this.notification_tab__progressbar_container);

        // Add Layout 1 to queue
        CONTAINER_QUOTE.appendChild(this.notification_tab);

        // Paint (element) on queue
        this.notification_tab.clientHeight;
        
        // Add initial animation
        this.notification_tab.classList.add('notification-tab--initial-animation');
    }

    /* Add a timer for tab */
    set_Timer_For_ToastNotification(){
        this.displayTimeCounter = setInterval(() => {
            this.time_remain -= 100;
            // calculate percentage
            this.time_percentage = ((100 / this.time_original) * this.time_remain);
            this.notification_tab__progressbar.style.width = `${this.time_percentage}%`;

            // Stop timer
            if(this.time_remain === 0 || this.time_remain <= 0){
                clearInterval(this.displayTimeCounter);
                this.remove_ToastNotification();
            }
        }, 100);
    }

    /* Change the timer status */
    change_Timer_When_Mouseout(){
        this.notification_tab.addEventListener('mouseout', () => {
            this.set_Timer_For_ToastNotification();
        });
    }

    change_Timer_When_Mouseover(){
        this.notification_tab.addEventListener('mouseover', ()=>{
            this.time_remain = this.time_original;
            this.time_percentage = 100;
            this.notification_tab__progressbar.style.width = `${this.time_percentage}%`;
            clearInterval(this.displayTimeCounter);
        });
    }

    /* Remove tab (functions) */
    remove_ToastNotification(){
        // If timer exists
        if(this.displayTimeCounter){
            clearInterval(this.displayTimeCounter);
        }

        // Add class to animation
        this.notification_tab.classList.add('notification-tab--delete-tab');
        this.notification_tab__title.classList.add('notification-tab--delete-text');
        this.notification_tab__description.classList.add('notification-tab--delete-text');
        this.notification_tab__icon.classList.add('notification-tab--delete-icon');

        // Time out (Animation)
        this.timeToCleanUp = setTimeout(() => {
            this.notification_tab.remove();
            clearTimeout(this.timeToCleanUp);
        }, 250);

        delete this.createToastMessage;
    }

    remove_ToastNotification_When_Click(){
		this.notification_tab.addEventListener('click', ()=>{
            this.remove_ToastNotification();
        });
	}
}

// create new toast message
function newToastMessage(config){
    let newMessage = new createToastMessage(config);
}