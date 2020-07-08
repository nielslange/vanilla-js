// Define duration.
const duration = 5;
let timer;

/**
 * Define constructor pattern
 *
 * @param {String} selector The selector of the target element.
 * @param {String} options The options of the component.
 */
const Rue = function ( selector, options ) {
	this.elem = document.querySelector( selector );
	this.data = options.data;
	this.template = options.template;
};

/**
 * Define render function
 */
Rue.prototype.render = function () {
	this.elem.innerHTML = this.template( this.data );
};

/**
 * Define interval to count down
 */
const countdown = function () {
	// Decrease time by 1 second;
	app.data.time--;

	// Check of the timer should be stopped.
	stopTimer();

	// Update the UI.
	app.render();
};

/**
 * Start the timer
 */
const startTimer = function () {
	// Reset the app data.
	app.data.time = duration;

	// Render the initial UI.
	app.render();

	// Start the countdown timer.
	timer = setInterval( countdown, 1000 );
};

/**
 * Stop the timer
 */
const stopTimer = function () {
	if ( 0 < app.data.time ) return;
	clearInterval( timer );
};

/**
 * Handle click events
 *
 * @param {Object} event The event object.
 */
const clickHandler = function ( event ) {
	// Only run, if the restart button was clicked.
	if ( ! event.target.hasAttribute( 'data-restart-timer' ) ) return;

	// Start the timer.
	startTimer();
};

/**
 * Create the timer component
 *
 * @param {Object} selector The selector of the target element.
 */
const app = new Rue( '#app', {
	// Define data.
	data: {
		time: duration,
	},

	// Define functions.
	template: function ( props ) {
		// Show restart button, if timer is done.
		if ( 1 > props.time ) {
			return '⏰ <p><button class="btn btn-primary" data-restart-timer>Restart timer</button></p>';
		}

		// Show the current time, if the timer is still running.
		return props.time;
	},
} );

// Start the timer.
startTimer();

// Listen to click events.
document.addEventListener( 'click', clickHandler );
