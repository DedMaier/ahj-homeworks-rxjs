export default class UpdatesWidget {
    constructor(container) {
        this.container = container;
    }
    addNewMessage(email, subject, time) {
        this.container.appendChild(this.createNewMessage(email, subject, time));
    }
    createNewMessage(email, subject, time) {
        const li = document.createElement('li');
        li.classList.add('updates__item');
        const spanEmail = document.createElement('span');
        spanEmail.classList.add('item__email');
        spanEmail.textContent = email;
        li.appendChild(spanEmail);
        const spanSubject = document.createElement('span');
        spanSubject.classList.add('item__subject');
        spanSubject.textContent = subject;
        li.appendChild(spanSubject);
        const spanTime = document.createElement('span');
        spanTime.classList.add('item__time');
        spanTime.textContent = time;
        li.appendChild(spanTime);
        return li;
    }
}
