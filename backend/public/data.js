"use strict";
const { faker } = require('@faker-js/faker');
function createMessage() {
    const time = new Date(faker.date.past());
    return {
        id: faker.string.uuid(),
        from: faker.internet.email(),
        subject: faker.lorem.sentence(3),
        body: faker.lorem.text(),
        recieved: `${time.getHours()}:${time.getMinutes()} ${time.getDay() / 10 > 1 ? time.getDay() : '0' + time.getDay()}.${time.getMonth() / 10 > 1 ? time.getMonth() : '0' + time.getMonth()}.${time.getFullYear()}`
    };
}
const MESSAGES_DATA = {
    status: 'ok',
    timestamp: faker.date.anytime(),
    messages: faker.helpers.multiple(createMessage, { count: 5 })
};
module.exports = MESSAGES_DATA;
