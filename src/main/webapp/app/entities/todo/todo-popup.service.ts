import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Injectable()
export class TodoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private todoService: TodoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.todoService.find(id).subscribe((todo) => {
                    todo.startTime = this.datePipe
                        .transform(todo.startTime, 'yyyy-MM-ddTHH:mm:ss');
                    todo.endTime = this.datePipe
                        .transform(todo.endTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.todoModalRef(component, todo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.todoModalRef(component, new Todo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    todoModalRef(component: Component, todo: Todo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.todo = todo;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
