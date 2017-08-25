import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Todo } from './todo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TodoService {

    private resourceUrl = 'api/todos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(todo: Todo): Observable<Todo> {
        const copy = this.convert(todo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(todo: Todo): Observable<Todo> {
        const copy = this.convert(todo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Todo> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.startTime = this.dateUtils
            .convertDateTimeFromServer(entity.startTime);
        entity.endTime = this.dateUtils
            .convertDateTimeFromServer(entity.endTime);
    }

    private convert(todo: Todo): Todo {
        const copy: Todo = Object.assign({}, todo);

        copy.startTime = this.dateUtils.toDate(todo.startTime);

        copy.endTime = this.dateUtils.toDate(todo.endTime);
        return copy;
    }
}
