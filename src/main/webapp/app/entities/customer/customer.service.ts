import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Customer } from './customer.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CustomerService {

    private resourceUrl = 'api/customers';

    constructor(private http: Http) { }

    create(customer: Customer): Observable<Customer> {
        const copy = this.convert(customer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(customer: Customer): Observable<Customer> {
        const copy = this.convert(customer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Customer> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(customer: Customer): Customer {
        const copy: Customer = Object.assign({}, customer);
        return copy;
    }
}
