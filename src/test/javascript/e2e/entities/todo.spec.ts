import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Todo e2e test', () => {

    let navBarPage: NavBarPage;
    let todoDialogPage: TodoDialogPage;
    let todoComponentsPage: TodoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Todos', () => {
        navBarPage.goToEntity('todo');
        todoComponentsPage = new TodoComponentsPage();
        expect(todoComponentsPage.getTitle()).toMatch(/backendApp.todo.home.title/);

    });

    it('should load create Todo dialog', () => {
        todoComponentsPage.clickOnCreateButton();
        todoDialogPage = new TodoDialogPage();
        expect(todoDialogPage.getModalTitle()).toMatch(/backendApp.todo.home.createOrEditLabel/);
        todoDialogPage.close();
    });

    it('should create and save Todos', () => {
        todoComponentsPage.clickOnCreateButton();
        todoDialogPage.setNameInput('name');
        expect(todoDialogPage.getNameInput()).toMatch('name');
        todoDialogPage.setStartTimeInput(12310020012301);
        expect(todoDialogPage.getStartTimeInput()).toMatch('2001-12-31T02:30');
        todoDialogPage.setEndTimeInput(12310020012301);
        expect(todoDialogPage.getEndTimeInput()).toMatch('2001-12-31T02:30');
        todoDialogPage.stateSelectLastOption();
        todoDialogPage.customerSelectLastOption();
        todoDialogPage.save();
        expect(todoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TodoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-todo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TodoDialogPage {
    modalTitle = element(by.css('h4#myTodoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    startTimeInput = element(by.css('input#field_startTime'));
    endTimeInput = element(by.css('input#field_endTime'));
    stateSelect = element(by.css('select#field_state'));
    customerSelect = element(by.css('select#field_customer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setStartTimeInput = function (startTime) {
        this.startTimeInput.sendKeys(startTime);
    }

    getStartTimeInput = function () {
        return this.startTimeInput.getAttribute('value');
    }

    setEndTimeInput = function (endTime) {
        this.endTimeInput.sendKeys(endTime);
    }

    getEndTimeInput = function () {
        return this.endTimeInput.getAttribute('value');
    }

    setStateSelect = function (state) {
        this.stateSelect.sendKeys(state);
    }

    getStateSelect = function () {
        return this.stateSelect.element(by.css('option:checked')).getText();
    }

    stateSelectLastOption = function () {
        this.stateSelect.all(by.tagName('option')).last().click();
    }
    customerSelectLastOption = function () {
        this.customerSelect.all(by.tagName('option')).last().click();
    }

    customerSelectOption = function (option) {
        this.customerSelect.sendKeys(option);
    }

    getCustomerSelect = function () {
        return this.customerSelect;
    }

    getCustomerSelectedOption = function () {
        return this.customerSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
