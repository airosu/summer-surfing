"use strict";
// ------------------------------------------------------------
// Scroll to anchor
// ------------------------------------------------------------
function scrollToAnchor(target, offset) {
    if (offset === void 0) { offset = 0; }
    var distanceToTop = function (el) { return Math.floor(el.getBoundingClientRect().top); };
    var targetAnchor = document.querySelector(target);
    if (!targetAnchor)
        return;
    if (offset === null) {
        offset = 0;
    }
    var originalTop = distanceToTop(targetAnchor) + parseInt(offset);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
}
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
                console.log(offset);
                scrollToAnchor(targetLocation, offset);
            }
        });
    });
}
// Initialize event listeners
document.addEventListener('DOMContentLoaded', function () {
    addNavigationListeners();
});
