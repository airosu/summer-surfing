// ------------------------------------------------------------
// Scroll to anchor
// ------------------------------------------------------------



function scrollToAnchor( target:string, offset:any=0 ) {
    const distanceToTop = ( el:HTMLElement ) => Math.floor(el.getBoundingClientRect().top);
    const targetAnchor = document.querySelector( target );
    if ( !targetAnchor ) return;
    if ( offset === null ) {
        offset = 0;
    }
    const originalTop = distanceToTop(targetAnchor as HTMLElement) + parseInt(offset);

    window.scrollBy( { top: originalTop, left: 0, behavior: 'smooth' } );
}




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
                console.log(offset);
                scrollToAnchor( targetLocation, offset );
            }
        } );
    } );
}




// Initialize event listeners

document.addEventListener( 'DOMContentLoaded', () => {
    addNavigationListeners();
} );

