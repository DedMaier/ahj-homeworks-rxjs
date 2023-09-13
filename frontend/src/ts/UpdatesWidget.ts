export default class UpdatesWidget {
    constructor (readonly container: HTMLUListElement) {}

    addNewMessage (email: string, subject: string, time: string): void {
        this.container.appendChild(this.createNewMessage(email, subject, time))
    }

    private createNewMessage (email: string, subject: string, time: string): HTMLLIElement {
        const li = document.createElement('li')
        li.classList.add('updates__item')

        const spanEmail = document.createElement('span')
        spanEmail.classList.add('item__email')
        spanEmail.textContent = email
        li.appendChild(spanEmail)

        const spanSubject = document.createElement('span')
        spanSubject.classList.add('item__subject')
        spanSubject.textContent = subject
        li.appendChild(spanSubject)

        const spanTime = document.createElement('span')
        spanTime.classList.add('item__time')
        spanTime.textContent = time
        li.appendChild(spanTime)

        return li
    }
}