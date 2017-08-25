import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Customer e2e test', () => {

    let navBarPage: NavBarPage;
    let customerDialogPage: CustomerDialogPage;
    let customerComponentsPage: CustomerComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle()).toMatch(/backendApp.customer.home.title/);

    });

    it('should load create Customer dialog', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage = new CustomerDialogPage();
        expect(customerDialogPage.getModalTitle()).toMatch(/backendApp.customer.home.createOrEditLabel/);
        customerDialogPage.close();
    });

    it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage.setUsernameInput('username');
        expect(customerDialogPage.getUsernameInput()).toMatch('username');
        customerDialogPage.setPasswordInput('password');
        expect(customerDialogPage.getPasswordInput()).toMatch('password');
        customerDialogPage.setNicknameInput('nickname');
        expect(customerDialogPage.getNicknameInput()).toMatch('nickname');
        customerDialogPage.setAvatarInput('avatar');
        expect(customerDialogPage.getAvatarInput()).toMatch('avatar');
        customerDialogPage.setAgeInput('5');
        expect(customerDialogPage.getAgeInput()).toMatch('5');
        customerDialogPage.sexSelectLastOption();
        customerDialogPage.setEmailInput('email');
        expect(customerDialogPage.getEmailInput()).toMatch('email');
        customerDialogPage.setMobilePhoneNumberInput('mobilePhoneNumber');
        expect(customerDialogPage.getMobilePhoneNumberInput()).toMatch('mobilePhoneNumber');
        customerDialogPage.save();
        expect(customerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerDialogPage {
    modalTitle = element(by.css('h4#myCustomerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    usernameInput = element(by.css('input#field_username'));
    passwordInput = element(by.css('input#field_password'));
    nicknameInput = element(by.css('input#field_nickname'));
    avatarInput = element(by.css('input#field_avatar'));
    ageInput = element(by.css('input#field_age'));
    sexSelect = element(by.css('select#field_sex'));
    emailInput = element(by.css('input#field_email'));
    mobilePhoneNumberInput = element(by.css('input#field_mobilePhoneNumber'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUsernameInput = function (username) {
        this.usernameInput.sendKeys(username);
    }

    getUsernameInput = function () {
        return this.usernameInput.getAttribute('value');
    }

    setPasswordInput = function (password) {
        this.passwordInput.sendKeys(password);
    }

    getPasswordInput = function () {
        return this.passwordInput.getAttribute('value');
    }

    setNicknameInput = function (nickname) {
        this.nicknameInput.sendKeys(nickname);
    }

    getNicknameInput = function () {
        return this.nicknameInput.getAttribute('value');
    }

    setAvatarInput = function (avatar) {
        this.avatarInput.sendKeys(avatar);
    }

    getAvatarInput = function () {
        return this.avatarInput.getAttribute('value');
    }

    setAgeInput = function (age) {
        this.ageInput.sendKeys(age);
    }

    getAgeInput = function () {
        return this.ageInput.getAttribute('value');
    }

    setSexSelect = function (sex) {
        this.sexSelect.sendKeys(sex);
    }

    getSexSelect = function () {
        return this.sexSelect.element(by.css('option:checked')).getText();
    }

    sexSelectLastOption = function () {
        this.sexSelect.all(by.tagName('option')).last().click();
    }
    setEmailInput = function (email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function () {
        return this.emailInput.getAttribute('value');
    }

    setMobilePhoneNumberInput = function (mobilePhoneNumber) {
        this.mobilePhoneNumberInput.sendKeys(mobilePhoneNumber);
    }

    getMobilePhoneNumberInput = function () {
        return this.mobilePhoneNumberInput.getAttribute('value');
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
