const { faker } = require('@faker-js/faker')

type Message = {
    id: string,
    from: string,
    subject: string,
    body: string,
    recieved: string,
}

function createMessage(): Message {
    const time = new Date(faker.date.past())
    return {
        id: faker.string.uuid(),
        from: faker.internet.email(),
        subject: faker.lorem.sentence(3),
        body: faker.lorem.text(),
        recieved: `${time.getHours()}:${time.getMinutes()} ${time.getDay() / 10 > 1 ? time.getDay() : '0' + time.getDay()}.${time.getMonth() / 10 > 1 ? time.getMonth() : '0' + time.getMonth()}.${time.getFullYear()}`
    }
}

type MessagesData = {
    status: 'ok',
    timestamp: string,
    messages: Message[],
}

const MESSAGES_DATA: MessagesData = {
    status: 'ok',
    timestamp: faker.date.anytime(),
    messages: faker.helpers.multiple(createMessage, { count: 5 })
}

module.exports = MESSAGES_DATA
