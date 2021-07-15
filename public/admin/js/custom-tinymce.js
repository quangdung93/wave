//re init tiny mce
function tinymce_init_callbacks(editor)
{
    editor.remove();
    editor = null;
    tinymce.init({
        selector: "textarea.richTextBox",
        skin_url: $('meta[name="assets-path"]').attr('content') + '?path=js/skins/voyager',
        min_height: 400,
        plugins: [
            "link image lists preview",
            "visualblocks visualchars media wordcount",
            "table directionality emoticons paste fullscreen responsivefilemanager code"
        ], //autosave => Confirm save when reload page
        external_plugins: {
            'wordcount': 'tinymce/plugins/wordcount/plugin.min.js',
            'preview': 'tinymce/plugins/preview/plugin.min.js',
        },
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
        toolbar2: "| responsivefilemanager | link unlink | image table | forecolor backcolor | preview fullscreen code | insertyoutube tableofcontent productslider",
        image_advtab: true ,  // Show image advanced tab
        relative_urls: false, // Show full url image
        remove_script_host : false, // Show full url image
        image_caption: true, //Enable Caption Image
        // external_filemanager_path: URL_MAIN + "filemanager/",
        // filemanager_title:"File Manager" ,
        // external_plugins: { "filemanager" : URL_MAIN + "filemanager/plugin.min.js"},
    });
}