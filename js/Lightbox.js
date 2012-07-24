/**
 * @singleton
 * @type {Object}
 */
aKa.Lightbox = {
    /**
     * @return {Boolean}
     * @private
     */
    _init : function (selector) {
        $(selector).click($.proxy(this.show, this)); //bind the scope to this class
        return false; // Avoid the browser following the link
    },

    /**
     *
     */
    show : function () {
        // Hime some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
        $('embed, object, select').css({ 'visibility' : 'hidden' });

        this._createMarkup();
    },

    _createMarkup : function() {
        // Apply the HTML markup and styles
        var bodyEl = $('body');
        bodyEl.append('<div id="lightbox-overlay"></div>');

        var overlay = $('#lightbox-overlay');
        overlay.css({ height : bodyEl.height() });
        overlay.click(this._hide);
    },

    _hide : function() {
        var overlay = $('#lightbox-overlay');

        overlay.fadeOut(function() {
            $(this).remove();
        });

        // Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
        $('embed, object, select').css({ 'visibility' : 'visible' });
    }
};