/*-------------------------------------------------------------------------------------------------
 - Project:   sproutcore-upload                                                                   -
 - Copyright: ©2013 Matygo Educational Incorporated operating as Learndot                         -
 - Author:    Joe Gaudet (joe@learndot.com) and contributors (see contributors.txt)               -
 - License:   Licensed under MIT license (see license.js)                                         -
 -------------------------------------------------------------------------------------------------*/
sc_require('views/spinner_view');
SC.ImageUploadView = SC.View.extend(SC.UploadableViewDelegate, {

    childViews: ['spinnerView', 'uploadForm'],

    classNames: 'sc-image-upload-view',

    classNameBindings: ['isActive:active', 'hasValue:has-value'],

    displayProperties: ['value'],

    url: '',

    isActiveBinding: SC.Binding.oneWay('*uploadForm.isActive'),

    isEnabledBinding: SC.Binding.oneWay('*uploadForm.isEnabled'),

    resultBinding: SC.Binding.oneWay('*uploadForm.result'),

    hasValueBinding: SC.Binding.oneWay('.value').bool(),

    uploadOnChange: YES,

    isUploading: NO,

    render: function (context) {
        context.begin().addClass('icon').end();
    },

    update: function () {
        this.invokeLast(function () {
            var value = this.get('value');
            if (value && value.indexOf('undefined') === -1) {
                this.$().css({"background-image": "url('%@')".fmt(value)});
            }
        });
    },

    urlFromResult: function (result) {
        return result.filelink;
    },

    resultDidChange: function () {
        var result = this.get('result');
        if (result) {
            SC.imageQueue.loadImage(this.urlFromResult(result), this, function (imageUrl) {
                this.set('isUploading', NO);
                this.set('value', imageUrl);
            });
        }
    }.observes('result'),

    // **************************************************
    // Drop Support

    didCreateLayer: function () {
        if (window.FormData) {
            SC.Event.add(this.$(), "dragover", this, this._dragover);
            SC.Event.add(this.$(), "drop", this, this._drop);
        }
    },

    willDestroyLayer: function () {
        if (window.FormData) {
            SC.Event.remove(this.$(), "drop", this, this._drop);
            SC.Event.remove(this.$(), "dragover", this, this._dragover);
        }
    },

    _drop: function (e) {
        e.preventDefault();
        this._uploadFile(e.dataTransfer.files[0]);
    },

    _dragover: function (e) {
        e.preventDefault();
    },

    _uploadFile: function (file) {
        if (file.type.match(/image/)) {
            this.set('isUploading', YES);
            var fd = new FormData();
            fd.append('file', file);
            SC.Request.postUrl(this.get('url'), fd).notify(this, '_didUploadFile').send();
        }
    },

    _didUploadFile: function (response) {
        this.set('result', JSON.parse(response.get('body')));
    },

    // **************************************************
    // views

    uploadForm: SC.UploadForm.extend({
        uploadForm: SC.outlet('parentView.url'),
        isUploadingDidChange: function () {
            this.setPath('parentView.isUploading', YES);
        }.observes('isUploading'),
        accept: 'image/*',
        delegate: SC.outlet('parentView')
    }),

    spinnerView: SC.SpinnerView.extend({
        layout: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        isVisibleBinding: SC.Binding.oneWay('.parentView.isUploading')
    })
});