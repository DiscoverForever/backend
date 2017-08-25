import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BackendCustomerModule } from './customer/customer.module';
import { BackendTodoModule } from './todo/todo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BackendCustomerModule,
        BackendTodoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BackendEntityModule {}
