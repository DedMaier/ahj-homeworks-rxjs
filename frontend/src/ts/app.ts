import { Observable, switchMap, Subject, fromEvent, from, interval, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import UpdatesWidget from './UpdatesWidget';

function getRequest(url: string) {                                          // функция для отлова ошибки запроса, что бы не закрывался поток
    return new Observable(observer => {
        const controller = new AbortController()

        fetch(url, {
            signal: controller.signal
        })
        .then(res => res.json())
        .then(data => {
            observer.next(JSON.parse(data.status))
            observer.complete()
        })
        .catch(err => observer.error(err))

        return () => controller.abort()
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const allMessages: string[] = []
    const updatesContainer = document.querySelector('.updates') as HTMLUListElement

    const updatesWidget = new UpdatesWidget(updatesContainer)

    const fetchStream$ = interval(3000).pipe(
        switchMap(() => {
            return getRequest('http://localhost:7070/api/messages').pipe(
                map(value =>{
                    if (value && typeof(value) === 'object' && 'messages' in value) {
                        return value.messages
                    }
                }),
                map(value => {
                    if (value instanceof Array) {
                        return value.filter(item => {
                            if ('id' in item) {
                                if (allMessages.includes(item.id)) {
                                    return false
                                } else {
                                    allMessages.push(item.id)
                                    return true
                                }
                            }
                            return false
                        })
                    }
                }),
                catchError(() => {
                    return of({available: false})
                })
            )
        })
    )

    fetchStream$.subscribe(value => {
        if (value && value instanceof Array) {
            value.forEach(item => {
                updatesWidget.addNewMessage(item?.from, item?.subject, item?.recieved)
            })
        }
    })
})
