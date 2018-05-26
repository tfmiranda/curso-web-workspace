$(function() {
    const textArea = $('textarea[name="codigo"]');

    const editor = CodeMirror.fromTextArea($textArea[0], {
        lineNumbers: true
    });
});