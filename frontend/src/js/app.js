import { Observable, switchMap, interval, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import UpdatesWidget from './UpdatesWidget';
function getRequest(url) {
    return new Observable(observer => {
        const controller = new AbortController();
        fetch(url, {
            signal: controller.signal
        })
            .then(res => res.json())
            .then(data => {
            observer.next(JSON.parse(data.status));
            observer.complete();
        })
            .catch(err => observer.error(err));
        return () => controller.abort();
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const allMessages = [];
    const updatesContainer = document.querySelector('.updates');
    const updatesWidget = new UpdatesWidget(updatesContainer);
    const fetchStream$ = interval(3000).pipe(switchMap(() => {
        return getRequest('http://localhost:7070/api/messages').pipe(map(value => {
            if (value && typeof (value) === 'object' && 'messages' in value) {
                return value.messages;
            }
        }), map(value => {
            if (value instanceof Array) {
                return value.filter(value => {
                    if ('id' in value) {
                        if (allMessages.includes(value.id)) {
                            return false;
                        }
                        else {
                            allMessages.push(value.id);
                            return true;
                        }
                    }
                    return false;
                });
            }
        }), catchError(err => {
            console.log(err);
            return of({ available: false });
        }));
    }));
    fetchStream$.subscribe(value => {
        if (value && value instanceof Array) {
            value.forEach(item => {
                updatesWidget.addNewMessage(item === null || item === void 0 ? void 0 : item.from, item === null || item === void 0 ? void 0 : item.subject, item === null || item === void 0 ? void 0 : item.recieved);
            });
        }
    });
});
