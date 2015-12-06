$("form").submit(function(e){
    event.preventDefault();
    var data ={};

    $(event.target.elements).each(function(index){
       data[this.name] = this.value;
    });

    var $that = $(this);
    var url, type;
    if($that.data('url')!==undefined)
        url = $that.data('url');
    else
        return console.log("data-url missing");

    type = this.method;

    $.ajax({
      url: url,
      type:type,
      data: data,
      timeout:3000,
      success : function(rep){
        console.log(rep);
        //window.location = rep;
        console.log("success");
      },
      error:function(rep){
        var repObj = rep.responseJSON;
        console.log(repObj.msg);
        console.log("ERROR");

      }
    });
});
