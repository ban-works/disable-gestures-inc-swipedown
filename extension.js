/**
 * Disable Gestures inc. demaximizing window on  swipe down
 *
 * Gnome extension that disables the built in gestures, inc. demaximizing window on  swipe down. Useful for kiosks and touch screen apps where they may interfere.
 *
 * Thanks to Matt Bell 2016 who provided the base extension disable-gestures
 * Thanks to StackExchange (superuser.com) question #1542018 response by alex
 */

// When the extension is enabled, disable the gestures
function enable() {
    global.stage.get_actions().forEach(a => a.enabled = false);

    let disableDemaximizingWindow = () => {
        global.stage.get_actions().forEach(a => { if (a != this) a.enabled = false;});
    }
    focusWindow = global.display.connect('notify::focus-window', disableDemaximizingWindow);
    inFullScreenChanged = global.display.connect('in-fullscreen-changed', disableDemaximizingWindow);
}

// When the extension is disabled, enable the gestures
function disable() {
	global.stage.get_actions().forEach(a => a.enabled = true);
    global.display.disconnect(focusWindow);
    global.display.disconnect(inFullScreenChanged);
}
