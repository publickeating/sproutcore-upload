/*-------------------------------------------------------------------------------------------------
 - Project:   sproutcore-upload                                                                   -
 - Copyright: ©2013 Matygo Educational Incorporated operating as Learndot                         -
 - Author:    Joe Gaudet (joe@learndot.com) and contributors (see contributors.txt)               -
 - License:   Licensed under MIT license (see license.js)                                         -
 -------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------
 - Project:   Matygo Internal SproutCore                                                          -
 - Copyright: ©2012 Matygo Educational Incorporated operating as Learndot                         -
 - Author:    Joe Gaudet (joe@learndot.com) and contributors (see contributors.txt)               -
 - License:   Licensed under MIT license (see license.js)                                         -
 -------------------------------------------------------------------------------------------------*/

SC.SpinnerView = SC.View.extend({
    classNames: 'sc-spinner-view-container contain dark rounded',

    layout: {
        height: 60,
        width: 60,
        centerX: 0,
        centerY: 0
    },

    childViews: [ 'spinner' ],

    spinner: SC.View.extend({
        classNames: 'sc-spinner-view spin',
        currentNumber: 1,
        maxNumber: 12,
        interval: 83,
        timer: null,

        layout: {
            height: 42,
            width: 42,
            centerX: 0,
            centerY: 0
        },

        init: function () {
            var timer = SC.Timer.schedule({
                target: this,
                action: 'animate',
                interval: this.get('interval'),
                repeats: YES
            });
            this.set('timer', timer);

            sc_super();
        },

        isVisibleDidChange: function () {
            var timer = this.get('timer');
            timer.set('isPaused', !this.getPath('parentView.isVisible'));
        }.observes('.parentView.isVisible'),

        animate: function () {
            var self = this;
            var frame = this.requestAnimFrame();
            frame(function () {
                self.nextSlice(self);
            });
        },

        nextSlice: function (target) {
            var current = target.get('currentNumber');
            var max = target.get('maxNumber');

            // add new class && remove old class
            var numberToAdd = (current + 1) % max;
            target.$().addClass('spin-' + (numberToAdd + 1)).removeClass('spin-' + (current + 1));

            // set new current
            target.set('currentNumber', numberToAdd);
        },

        // shim layer with setTimeout fallback
        requestAnimFrame: function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        }
    })
});
