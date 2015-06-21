/**
 * revealing - Revealing.js
 * @version v0.1.0
 * @link https://github.com/dulaccc/revealing
 *
 * Copyright (c) 2015 Pierre Dulac
 * LICENSED MIT
 */
'use strict';

(function(window, document, undefined) {
    var defaultOptions;

    defaultOptions = {
        className: 'revealing',
        
        /**
         * Tokenizer method
         *
         * @param DOM Node element
         * @return Array of wrapped nodes
         */
        tokenizer: function(node) {
            if (node.nodeType === 3) {
                return node.nodeValue.split('').map(function(s) {
                    return '<span>'+s+'</span>';
                });
                // return node.nodeValue.replace(/\w/g, '<span>$&</span>');
            }

            return null;
        }
    };

    // check for collision
    if (window.Revealing !== undefined) {
        throw new Error("The global name Revealing is already assigned, it's a collision !");
    }

    /**
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */
    function mergeOptions(obj1, obj2) {
        var obj3 = {},
            attrname;
        for (attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }

    function addClassName(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    }

    function removeClassName(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

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
            nodes = [];

        // node element
        if (root.nodeType === 1) {
            els = root.childNodes;
        }

        // recursively wrap text nodes
        Array.prototype.forEach.call(els, function(el) {
            nodes = nodes.concat(injector(el, tokenizer));
        });

        // replace html content with new nodes
        root.innerHTML = '';
        nodes.forEach(function(el) {
            if (el.nodeType === 1) {
                root.innerHTML += el.outerHTML;
            } else if (el.nodeType === 3) {
                root.innerHTML += el.nodeValue;
            } else {
                root.innerHTML += el;
            }
        });
        return root;
    }

    var Revealing = function(element, options) {
        this.element = element;
        this.settings = mergeOptions(defaultOptions, options);
        this.init();
    };

    Revealing.prototype.init = function() {
        // add the base animation class if not already present
        addClassName(this.element, this.settings.className);

        // split the elements
        this.tokenize();
    };

    Revealing.prototype.tokenize = function() {
        injector(this.element, this.settings.tokenizer);
    };

    // public methods
    Revealing.prototype.show = function() {
        removeClassName(this.element, 'reset');
        addClassName(this.element, 'reveal');
    };

    Revealing.prototype.reset = function() {
        removeClassName(this.element, 'reveal')
        addClassName(this.element, 'reset');
    };

    // expose the class
    window.Revealing = Revealing;

})(window, document);
