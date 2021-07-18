const URL_MAIN = "/";
tinymce.baseURL = "/tinymce/js/tinymce/";
tinymce.suffix = '.min';
tinymce.init({
    selector: "textarea.richTextBox",
    min_height: 600,
    plugins: [
        "advlist autolink link media image lists charmap print preview hr pagebreak",
        "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
        "table directionality emoticons paste fullscreen code autosave"
    ], //autosave => Confirm save when reload page
    //Custom link dofollow/nofollow
    rel_list: [
        {title: 'Dofollow', value: 'dofollow'},
        {title: 'Nofollow', value: 'nofollow'}
    ],
    paste_preprocess: function(plugin, args) { // Handle when paste
        args.content = args.content.replaceAll('dir="ltr"',''); //remove dir="ltr" when paste 
    },
    // paste_postprocess: function(plugin, args) { // Handle when paste (after DOM)
    //     console.log(args.node); // Print DOM
    //     args.node.setAttribute('id', '42');
    // },
    toolbar1: "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | styleselect",
    toolbar2: "insertfile | link unlink | image table | forecolor backcolor | preview fullscreen code | insertyoutube tableofcontent productslider",
    image_advtab: true ,  // Show image advanced tab
    relative_urls: false, // Show full url image
    remove_script_host : false, // Show full url image
    image_caption: true, //Enable Caption Image
    file_picker_callback : function(callback, value, meta) {
        var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
        var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;

        var cmsURL = URL_MAIN + 'laravel-filemanager?editor=' + meta.fieldname;
        if (meta.filetype == 'image') {
            cmsURL = cmsURL + "&type=Images";
        } else {
            cmsURL = cmsURL + "&type=Files";
        }

        tinyMCE.activeEditor.windowManager.openUrl({
            url : cmsURL,
            title : 'Filemanager',
            width : x * 0.9,
            height : y * 0.9,
            resizable : "yes",
            close_previous : "no",
            onMessage: (api, message) => {
                callback(message.content);
            }
        });
    }
});