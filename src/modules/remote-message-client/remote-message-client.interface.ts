import { Observable } from 'rxjs';
import { Message } from '../../db/entities/message';

export interface RemoteMessageClientFilterByIdInterface {
    id: number;
}

export interface RemoteMessageClientCreateDataInterface {
    text: string;
}

export interface RemoteMessageClientUpdateDataInterface {
    id: number;
    text: string;
}

export interface RemoteMessageClientServiceInterface {
    findOne(data: RemoteMessageClientFilterByIdInterface): Observable<Message>
    create(data: RemoteMessageClientCreateDataInterface): Observable<Message>
    update(data: RemoteMessageClientUpdateDataInterface): Observable<Message>
    delete(data: RemoteMessageClientFilterByIdInterface): Observable<Message>
}