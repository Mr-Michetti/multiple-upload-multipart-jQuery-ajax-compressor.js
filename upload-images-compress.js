//Get with jQuery function the image files, compress with compressor.js and call funcion to ajax upload
$('#finput').change(function(e){
    var data = new FormData();
    jQuery.each(jQuery('#finput')[0].files, function(i, file) {
        data.append('file-'+i, file);
        
        const file_ = e.target.files[i];
            
        if (!file_) {
          return;
        }

        new Compressor(file_, {
          quality: 0.6,
          success(result) {
            const formData = new FormData();
            
            formData.append('file', result, result.name);
            var caricamento =  upload_images(formData);
          },
          error(err) {
            console.log(err.message);
          },
        });
    });
  });
  
  // UPLOAD WITH Ajax AND jQuery
  function upload_images($files){
    $.ajax({  
      url:'url_to_upload_serverside',   
      method:"POST",  
      data:$files,  
      contentType: false,  
      cache: false,  
      processData:false,  
      dataType: "json",
      success:function(res)  
      {  
        console.log(res.success);
      },
      error: function(res){
          console.log(res.msg);
      }
    }); 
}
