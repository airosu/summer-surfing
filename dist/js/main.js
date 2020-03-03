"use strict";
// ------------------------------------------------------------
// Scroll to anchor
// ------------------------------------------------------------
// Smooth scroll to anchors
function scrollToAnchor(target, offset) {
    if (offset === void 0) { offset = 0; }
    var distanceToTop = function (el) { return Math.floor(el.getBoundingClientRect().top); };
    var targetAnchor = document.querySelector(target);
    if (!targetAnchor)
        return;
    if (!offset) {
        offset = 0;
    }
    var originalTop = distanceToTop(targetAnchor) + parseInt(offset);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
}
// navigation event listeners
function addNavigationListeners() {
    var navigations = document.querySelectorAll('[data-role="navigation"]');
    navigations.forEach(function (nav) {
        nav.addEventListener('click', function (event) {
            event.preventDefault();
            var eventTarget = event.target;
            var targetValue = eventTarget.getAttribute('data-target');
            var targetOffset = eventTarget.getAttribute('data-offset');
            var targetLocation = "[data-location=\"" + targetValue + "\"]";
            if (!!targetValue) {
                var offset = targetOffset ? targetOffset : 0;
                scrollToAnchor(targetLocation, offset);
            }
        });
    });
}
// "Learn More" ctas event listeners
function addLearnMoreListeners() {
    var ctas = document.querySelectorAll('[data-js="readMore"]');
    ctas.forEach(function (cta) {
        cta.addEventListener('click', function (event) {
            event.preventDefault();
            var body = document.querySelector('body');
            var eventTarget = event.target;
            var targetValue = eventTarget.getAttribute('data-target');
            var modal = document.querySelector("[data-modal=\"" + targetValue + "\"]");
            if (!modal)
                return;
            if (body)
                body.classList.add('modal-open');
            modal.removeAttribute('hidden');
        });
    });
}
function closeModal(element) {
    element.addEventListener('click', function (event) {
        event.preventDefault();
        var body = document.querySelector('body');
        var eventTarget = event.target;
        var modalParent = eventTarget.closest('[data-modal]');
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
    var closeButtons = document.querySelectorAll('[data-action="close"]');
    var overlays = document.querySelectorAll('[data-js="modalOverlay"]');
    closeButtons.forEach(function (button) { return closeModal(button); });
    overlays.forEach(function (overlay) { return closeModal(overlay); });
}
// Initialize event listeners
document.addEventListener('DOMContentLoaded', function () {
    addNavigationListeners();
    addLearnMoreListeners();
    closeModalListener();
});
