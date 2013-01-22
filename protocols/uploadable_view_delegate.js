// ==========================================================================
// Project:   SproutCore - Upload
// Copyright: ©2011 7x7 Software Inc. and contributors.
// License:   Licensed under MIT license
// ==========================================================================

/**
 @namespace

 Generic protocol for uploadable views

 @since SproutCore 1.0
 */
SC.UploadableViewDelegate = {

    /**
     Called before the browser opens its file dialog for the selected input.

     You can use this method to prevent the file dialog from opening.

     @param uploadableView {SC.FileFieldView} The file field view.
     @returns {Boolean} YES to allow the browser's file selection dialog to open.
     */
    uploadableViewShouldOpenFileSelect: function (uploadableView) {
        return YES;
    },

    uploadableViewDidOpenFileSelect: function (uploadableView) {

    },

    uploadableViewValueDidChange: function (uploadableView, value, previousValue) {},

    /**
     Called before the file field view mits its form.

     You can use this method to prevent mission, particularly when autoSubmit is true.

     @param uploadableView {SC.FileFieldView} The file field view.
     @returns {Boolean} YES to allow the file field view to mit.
     */
    uploadableViewShouldSubmit: function (uploadableView) {
        return YES;
    },

    /**
     Called before the file field view mits its form.

     @param uploadableView {SC.FileFieldView} The file field view.
     @returns {void}
     */
    uploadableViewWillSubmit: function (uploadableView) {

    },

    /**
     Called after the file field view mits its form, but before the upload completes.
     This is a useful time to start polling the server for progress if your server has
     been configured to support this.

     @param uploadableView {SC.FileFieldView} The file field view.
     @returns {void}
     */
    uploadableViewDidSubmit: function (uploadableView, uuid) {},

    /**
     Called after the upload completes. The result is the body element of the hidden iframe
     used to capture the response.  You will need to write a tiny bit of code to parse this
     result to match your server's response and determine the success or failure of the
     upload.

     For example, if the server returns a JSON encoded string, you may do something like:
     var parsedResult = JSON.parse(result.innerHTML);

     @param uploadableView {SC.FileFieldView} The file field view.
     @param result {HTMLBodyElement} The body element containing the server's response
     uploadableFiledView @returns {void}
     */
    uploadableViewDidComplete: function (uploadableView, result) {}

};
