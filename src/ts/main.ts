// ------------------------------------------------------------
// Scroll to anchor
// ------------------------------------------------------------



// Smooth scroll to anchors
function scrollToAnchor( target:string, offset:any=0 ) {
    const distanceToTop = ( el:HTMLElement ) => Math.floor(el.getBoundingClientRect().top);
    const targetAnchor = document.querySelector( target );
    if ( !targetAnchor ) return;
    if ( !offset ) {
        offset = 0;
    }
    const originalTop = distanceToTop(targetAnchor as HTMLElement) + parseInt(offset);

    window.scrollBy( { top: originalTop, left: 0, behavior: 'smooth' } );
}



// navigation event listeners
function addNavigationListeners() {
    const navigations = document.querySelectorAll( '[data-role="navigation"]' );

    navigations.forEach( (nav) => {
        nav.addEventListener( 'click', (event) => {
            event.preventDefault();

            const eventTarget = event.target as HTMLElement;
            const targetValue = eventTarget.getAttribute( 'data-target' );
            const targetOffset = eventTarget.getAttribute( 'data-offset' );
            const targetLocation = `[data-location="${targetValue}"]`;

            if ( !!targetValue ) {
                const offset = targetOffset ? targetOffset : 0;
                scrollToAnchor( targetLocation, offset );
            }
        } );
    } );
}


// "Learn More" ctas event listeners
function addLearnMoreListeners() {
    const ctas = document.querySelectorAll( '[data-js="readMore"]' );

    ctas.forEach( (cta) => {
        cta.addEventListener( 'click', (event) => {
            event.preventDefault();

            const body = document.querySelector( 'body' );
            const eventTarget = event.target as HTMLElement;
            const targetValue = eventTarget.getAttribute( 'data-target' );
            const modal:HTMLElement|null = document.querySelector( `[data-modal="${targetValue}"]` );
            if (!modal) return;

            if (body) body.classList.add( 'modal-open' );
            modal.removeAttribute( 'hidden' );
        } );
    } );
}


function closeModal( element:Element|HTMLElement ) {
    element.addEventListener( 'click', (event) => {
        event.preventDefault();

        const body = document.querySelector( 'body' );
        const eventTarget = event.target as HTMLElement;
        const modalParent = eventTarget.closest( '[data-modal]' );
        if (!modalParent) return;

        if (body) body.classList.remove( 'modal-open' );
        modalParent.setAttribute( 'hidden', 'true' );
    } );
};

// Listener for modal close buttons
function closeModalListener() {
    const closeButtons = document.querySelectorAll( '[data-action="close"]' );
    const overlays = document.querySelectorAll( '[data-js="modalOverlay"]' );

    closeButtons.forEach( (button) => closeModal(button) );
    overlays.forEach( (overlay) => closeModal(overlay) );
}











// Initialize event listeners

document.addEventListener( 'DOMContentLoaded', () => {
    addNavigationListeners();
    addLearnMoreListeners();
    closeModalListener()
} );

