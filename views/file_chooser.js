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

    submit: function () {
        this.get('form').submit();
    },

    buttonView: SC.ButtonView.extend({

        layout: {
            height: SC.Theme.find(SC.defaultTheme).buttonRenderDelegate[SC.REGULAR_CONTROL_SIZE].height,
            width: 100,
            centerY: 0
        },

        title: 'Choose a File',
        isActiveBinding: SC.Binding.oneWay('.parentView.form.isActive'),
        isEnabledBinding: SC.Binding.oneWay('.parentView.form.isUploading').not()
    }),

    labelView: SC.LabelView.extend({
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