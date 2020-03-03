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
            modal.removeAttribute('hidden');
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
        modalParent.setAttribute('hidden', 'true');
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
// ------------------------------------------------------------
// Modal Controllers
// ------------------------------------------------------------
function generateModal(name) {
    const template = `
        <div class="modal__container">
            <div class="modal__action modal__action--right">
                <a class="modal__close-button" href="#" data-action="close"><i class="fas fa-times"></i></a>
            </div>
            <div class="info-block__subtitle info-block__subtitle--centered">Your</div>
            <h2 class="modal__title info-block__title info-block__title--underline">
                <span class="info-block__title-span">Summer Escape</span>
            </h2>
            <div class="modal__body info-block__description">
                <p class="modal__paragraph info-block__paragraph"></p>
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
    modal.setAttribute('hidden', 'true');
    modal.innerHTML = template;
    if (container)
        container.appendChild(modal);
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
    generateModal('hero');
    generateModal('events');
    generateModal('training');
    generateModal('point');
    // Add event listeners
    addNavigationListeners();
    addLearnMoreListeners();
    closeModalListener();
});
