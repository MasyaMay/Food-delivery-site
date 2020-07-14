import {closeModal, showModal} from './modal';
import {postData} from '../services/services';

function forms() {
    //Forms
    const forms = document.querySelectorAll('form');
    const spinner = document.createElement('div');
    const  modal = document.querySelector('.modal');

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            loadMessage(form);
            const formData = new FormData(form);
            const obj = {};
            formData.forEach((item, i) => {
                obj[i] = item;
            });

            const json = JSON.stringify(obj);
            postData('http://localhost:3000/requests', json)      
            .then(data => {              
                showMessage('Спасибо! Скоро мы с вами свяжемся');
            })
            .catch(() => {
                showMessage('Что-то пошло не так...');
            })
            .finally(()  => {
                form.reset();
            });

        });
    }

    function showMessage(text) {
        spinner.remove();
        showModal(modal);
        const modalDialog = document.querySelector('.modal__dialog');
        closeModal(modalDialog);
        const statusMessage = document.createElement('div');
        statusMessage.classList.add('modal__dialog', 'modal__content', 'modal__title');
        statusMessage.textContent = text;
        modal.append(statusMessage);
        showModal(statusMessage);
        setTimeout(() => {
            statusMessage.remove();
            showModal(modalDialog);
            closeModal(modal);
        }, 2000);
    }

    function loadMessage(form) {
        spinner.classList.add('spinner');
        form.insertAdjacentElement('afterend', spinner);
    }
}

export default forms;
