/*
 * Revealing.js
 * 
 *
 * Copyright (c) 2014 Pierre Dulac
 * Licensed under the MIT license.
 */

(function ($) {

    /**
     * Recursively inject <span></span> elements to wrap each letters
     */
    function injector(root) {
        // text element
        if (root.nodeType === 3) {
            return root.nodeValue.split('').map(function(s) {
                return $('<span>'+s+'</span>');
            });
        }

        var els = [],
            nodes;

        // node element
        if (root.nodeType === 1) {
            els = root.childNodes;
        }

        // ensure its an array
        // NB: here we clearly drop support for IE8
        els = Array.prototype.slice.call(els);

        // recursively wrap text nodes
        nodes = els.reduce(function(mem, el) {
            return mem.concat(injector(el));
        }, []);

        // replace html content with new nodes
        return $(root).html('').append.apply($(root), nodes);
    }

    var methods = {
        show: function() {
            this.removeClass('reset').addClass('reveal');
        },
        hide: function() {
            this.removeClass('reset').removeClass('reveal');
        },
        reset: function() {
            this.addClass('reset').removeClass('reveal');
        }
    };

    $.fn.revealing = function(method) {

        if (method !== undefined) {
            if (!methods.hasOwnProperty(method)) {
                throw new Error("method " + method + " not supported by revealing.js");
            }

            methods[method].apply(this);
            return this;
        }

        return this.each(function() {
            injector(this);
        });
    };

}(jQuery));
