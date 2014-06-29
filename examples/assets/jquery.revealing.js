/**
 * revealing - Revealing.js
 * @version v0.1.0
 * @link https://github.com/dulaccc/revealing
 *
 * Copyright (c) 2014 Pierre Dulac
 * LICENSED MIT
 */
(function ($, window, document, undefined) {

    var pluginName = "revealing",
        defaults = {
            /**
             * Tokenizer method
             *
             * @param DOM Node element
             * @return Array of wrapped nodes
             */
            tokenizer: function(node) {
                if (node.nodeType === 3) {
                    return node.nodeValue.split('').map(function(s) {
                        return $('<span>'+s+'</span>');
                    });
                }

                return null;
            },
        },
        methods = {
            show: function(args) {
                this.css({"color": args["color"]});
                this.removeClass('reset hide').addClass('reveal');
            },
            hide: function(args) {
                this.removeClass('reset reveal').addClass('hide');
            },
            reset: function(args) {
                this.removeClass('hide reveal').addClass('reset');
            }
        };

    /**
     * Recursively inject IN PLACE <span></span> elements to wrap each letters
     */
    function injector(root, tokenizer) {
        if (tokenizer === undefined) {
            throw new Error("You need to specify a tokenizer method");
        }

        // split elements
        var tokens = tokenizer(root);
        if (tokens !== null) {
            return tokens;
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
            return mem.concat(injector(el, tokenizer));
        }, []);

        // replace html content with new nodes
        return $(root).html('').append.apply($(root), nodes);
    }

    // plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            // add the base animation class if not already present
            $(this.element).addClass('revealing');

            // split the elements
            this.tokenize();
        },
        tokenize: function() {
            injector(this.element, this.settings.tokenizer);
        }
    });

    // expose the plugin
    $.fn[pluginName] = function(method, options) {
        var defaults = {
                color: this.css("color")
            },
            options = options || {};

        if (typeof method === 'object') {
            options = method;
            method = undefined;
        }

        options = $.extend(defaults, options);

        // build instances
        this.each(function() {
            var instance = $.data(this, "plugin_" + pluginName);
            if (!instance) {
                instance = new Plugin(this, options);
                $.data(this, "plugin_" + pluginName, instance);
            }
        });

        // custom method
        if (method !== undefined) {
            if (!methods.hasOwnProperty(method)) {
                throw new Error("method " + method + " not supported by revealing.js");
            }

            methods[method].call(this, options);
        }

        return this;
    };

}(jQuery, window, document));
