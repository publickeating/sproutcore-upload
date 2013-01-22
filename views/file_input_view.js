/*-------------------------------------------------------------------------------------------------
 - Project:   sproutcore-upload                                                                   -
 - Copyright: ©2013 Matygo Educational Incorporated operating as Learndot                         -
 - Author:    Joe Gaudet (joe@learndot.com) and contributors (see contributors.txt)               -
 - License:   Licensed under MIT license (see license.js)                                         -
 -------------------------------------------------------------------------------------------------*/

SC.FileInputView = SC.View.extend(SC.Control, {
    classNames: 'sc-file-field-input-view'.w(),

    layout: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },

    tagName: 'input',

    name: 'files[]',

    type: 'file',

    acceptsFirstResponder: YES,

    multiple: 'false',

    value: 'No File Selected',

    isEnabled: YES,

    attributeBindings: ['name', 'type', 'multiple', 'accept'],

    accept: '',

    // This helper gets us isEnabled functionality from the SC.Control mixin
    $input: function () {
        return this.$();
    },

    didCreateLayer: function () {
        SC.Event.add(this.$()[0], 'change', this, this.change);

        // IE is stupid
        if (SC.browser.isIE) {
            this.$()[0].onfocus = function (evt) {
                evt.target.blur();
                evt.target.click();
                evt.target.click();
            };
        }
    },

    change: function () {
        var value = this.$().val();
        // Scrub "C:\fakepath" from value. Some browsers (notably IE and Chrome) use this to mask the
        // actual path to the file for security reasons.  More here:
        // http://acidmartin.wordpress.com/2009/06/09/the-mystery-of-cfakepath-unveiled/
        if (SC.typeOf(value) === SC.T_STRING && value.indexOf("C:\\fakepath\\") === 0) {
            value = value.slice("C:\\fakepath\\".length);
        }
        this.set('value', value);
    },

    mouseDown: function (evt) {
        if (!this.get('isEnabled')) return YES;
        evt.allowDefault();
        this.set('isActive', YES);
        return YES;
    },

    mouseUp: function (evt) {
        if (!this.get('isEnabled')) return YES;
        evt.allowDefault();
        this.set('isActive', NO);
        return YES;
    }

});