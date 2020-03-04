"use strict";
// ------------------------------------------------------------
// Event Listeners
// ------------------------------------------------------------
// Navigation event listeners
function addNavigationListeners() {
    const navigations = document.querySelectorAll('[data-role="navigation"]');
    navigations.forEach((nav) => {
        nav.addEventListener('click', (event) => {
            event.preventDefault();
            const eventTarget = event.target;
            const targetValue = eventTarget.getAttribute('data-target');
            const targetOffset = eventTarget.getAttribute('data-offset');
            const targetLocation = `[data-location="${targetValue}"]`;
            if (!!targetValue) {
                const offset = targetOffset ? targetOffset : 0;
                scrollToAnchor(targetLocation, offset);
            }
        });
    });
}
// "Learn More" ctas event listeners
function addLearnMoreListeners() {
    const ctas = document.querySelectorAll('[data-js="readMore"]');
    ctas.forEach((cta) => {
        cta.addEventListener('click', (event) => {
            event.preventDefault();
            const body = document.querySelector('body');
            const eventTarget = event.target;
            const targetValue = eventTarget.getAttribute('data-target');
            const modal = document.querySelector(`[data-modal="${targetValue}"]`);
            if (!modal)
                return;
            if (body)
                body.classList.add('modal-open');
            modal.hidden = false;
        });
    });
}
// Modal close buttons listeners
function closeModal(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        const body = document.querySelector('body');
        const eventTarget = event.target;
        const modalParent = eventTarget.closest('[data-modal]');
        if (!modalParent)
            return;
        if (body)
            body.classList.remove('modal-open');
        modalParent.hidden = true;
    });
}
;
// Listener for modal close buttons
function closeModalListener() {
    const closeButtons = document.querySelectorAll('[data-action="close"]');
    const overlays = document.querySelectorAll('[data-js="modalOverlay"]');
    closeButtons.forEach((button) => closeModal(button));
    overlays.forEach((overlay) => closeModal(overlay));
}
function generateModal(name, tag) {
    getData().then((data) => {
        const article = data.find((article) => article.name === name);
        const template = `
            <div class="modal__container">
                <div class="modal__action modal__action--right">
                    <a class="modal__close-button" href="#" data-action="close"><i class="fas fa-times"></i></a>
                </div>
                <div class="info-block__subtitle info-block__subtitle--centered">${tag}</div>
                <h2 class="modal__title info-block__title info-block__title--underline">
                    <span class="info-block__title-span">${article.title}</span>
                </h2>
                <div class="modal__body info-block__description">
                    <div class="modal__paragraph-container" data-js="paragraphs"></div>
                    <div class="modal__action modal__action--left">
                        <div class="info-block__action info-block__action">
                            <a href="#" class="info-block__link" data-action="close">Return</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal__overlay" data-js="modalOverlay"></div>
        `;
        const container = document.querySelector('[data-js="modals"]');
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.setAttribute('data-modal', name);
        modal.hidden = true;
        modal.innerHTML = template;
        const paragraphContainer = modal.querySelector('[data-js="paragraphs"]');
        article.paragraphs.forEach((paragraph) => {
            const p = document.createElement('p');
            p.className = 'modal__paragraph info-block__paragraph';
            p.innerHTML = paragraph;
            if (!paragraphContainer)
                return;
            paragraphContainer.appendChild(p);
        });
        if (container)
            container.appendChild(modal);
        closeModalListener();
    });
}
async function getData() {
    try {
        const response = await fetch('../../articles.json');
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Something went wrong! ' + err);
    }
}
// ------------------------------------------------------------
// Subscribe Form
// ------------------------------------------------------------
function addFormListeners() {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const form = document.querySelector('[data-subscribe="form"]');
    const input = form.querySelector('[data-subscribe="input"]');
    const error = form.querySelector('[data-subscribe="error"]');
    if (!form)
        return;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (regEx.test(String(input.value).toLowerCase()) === false) {
            if (input.value == '') {
                if (error)
                    error.innerText = 'This field is required.';
                form.classList.add('subscribe__form--error');
            }
            else {
                error.innerText = 'Please enter a valid email address.';
                form.classList.add('subscribe__form--error');
            }
        }
        else {
            input.blur();
            input.value = '';
            error.innerText = '';
            form.classList.remove('subscribe__form--error');
        }
    });
}
// ------------------------------------------------------------
// Utils
// ------------------------------------------------------------
// Smooth scroll to anchors
function scrollToAnchor(target, offset = 0) {
    const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top);
    const targetAnchor = document.querySelector(target);
    if (!targetAnchor)
        return;
    if (!offset) {
        offset = 0;
    }
    const originalTop = distanceToTop(targetAnchor) + parseInt(offset);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
}
// ------------------------------------------------------------
// Initialize
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Generate modals
    generateModal('hero', 'Your');
    generateModal('locations', 'Find');
    generateModal('training', 'Get');
    generateModal('point', 'Info');
    // Add event listeners
    addNavigationListeners();
    addLearnMoreListeners();
    addFormListeners();
});
