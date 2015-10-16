$("#connect,#register").submit(function( event ) {
    event.preventDefault();
    var data ={};

    $(event.target.elements).each(function(index){
       data[this.name] = this.value;
      });
    var temp = Object.keys(data);
    var url = "/login";
    var type = undefined;
    if(temp.indexOf("registerBtn")!=-1){
      type = "post";
    }else if(temp.indexOf("connectBtn")!=-1){
      type = "get";
    }
    console.log(data);

    $.ajax({
      url: url,
      type:type,
      data: data,
      timeout:3000,
      success : function(rep){

        console.log(rep);
        window.location = rep;
        console.log("success");
      },
      error:function(rep){
        var repObj = rep.responseJSON;
        console.log(repObj.msg);
        console.log("ERROR");

      }
    });
  // Get some values from elements on the page:
  // // Send the data using post
  // var posting = $.post( url, { user: email , pass : password} );
  // // Put the results in a div
  // posting.done(function( data ) {
  //   console.log(data);
  // });
});