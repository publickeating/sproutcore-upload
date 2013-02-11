/*-------------------------------------------------------------------------------------------------
 - Project:   sproutcore-upload                                                                   -
 - Copyright: ©2013 Matygo Educational Incorporated operating as Learndot                         -
 - Author:    Joe Gaudet (joe@learndot.com) and contributors (see contributors.txt)               -
 - License:   Licensed under MIT license (see license.js)                                         -
 -------------------------------------------------------------------------------------------------*/
sc_require('views/upload_form');
sc_require('views/file_input_view');

/**
 * @class
 *
 * Basic file chooser
 *
 * @extends {SC.View}
 */
SC.FileChooserView = SC.View.extend({

    childViews: ['buttonView', 'labelView', 'form'],

    url: '',

    result: '',

    resultBinding: SC.Binding.oneWay('.form.result'),

    submitOnChange: YES,

    buttonTitle: 'Choose a File',

    showLabel: YES,

    submit: function () {
        this.get('form').submit();
    },

    init: function () {
        this.layout = {
            height: SC.Theme.find(SC.defaultTheme).buttonRenderDelegate[SC.REGULAR_CONTROL_SIZE].height,
        };
        sc_super();
    },

    buttonView: SC.ButtonView.extend({


        init: function () {
            this.layout = {
                top: 0,
                bottom: 0,
                width: 100
            };
            sc_super();
        },

        title: SC.outlet('parentView.buttonTitle'),
        isActiveBinding: SC.Binding.oneWay('.parentView.form.isActive'),
        isEnabledBinding: SC.Binding.oneWay('.parentView.form.isUploading').not()
    }),

    labelView: SC.LabelView.extend({
        isVisibleBinding: SC.Binding.oneWay('.parentView.showLabel'),
        valueBinding: SC.Binding.oneWay('.parentView.form.input.value'),
        layout: {
            right: 0,
            left: 110,
            height: 20,
            centerY: 0
        }
    }),

    form: SC.UploadForm.extend({
        submitOnChange: SC.outlet('parentView.submitOnChange')
    })
});