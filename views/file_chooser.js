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

    uploadingText: 'Uploading',

    showLabel: YES,

    submit: function () {
        this.get('form').submit();
    },

    init: function () {
        sc_super();
        this.adjust('height', SC.Theme.find(SC.defaultTheme).buttonRenderDelegate[this.get('controlSize')].height);
    },

    buttonLayout: {
        top: 0,
        bottom: 0,
        width: 140
    },

    labelLayout: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 140
    },

    buttonView: SC.ButtonView.extend({
        layout: SC.outlet('parentView.buttonLayout'),
        controlSize: SC.outlet('parentView.controlSize'),
        icon: 'cloud-upload',
        title: function () {
            return this.get('isUploading') ? this.getPath('parentView.uploadingText') : this.getPath('parentView.buttonTitle');
        }.property('isUploading'),
        isUploadingBinding: SC.Binding.oneWay('.parentView.form.isUploading'),
        isActiveBinding: SC.Binding.oneWay('.parentView.form.isActive'),
        isEnabledBinding: SC.Binding.oneWay('.isUploading').not()
    }),

    labelView: SC.LabelView.extend({
        layout: SC.outlet('parentView.labelLayout'),
        controlSize: SC.outlet('parentView.controlSize'),
        isVisibleBinding: SC.Binding.oneWay('.parentView.showLabel'),
        valueBinding: SC.Binding.oneWay('.parentView.form.input.value')
    }),

    form: SC.UploadForm.extend({
        submitOnChange: SC.outlet('parentView.submitOnChange')
    })
})
;