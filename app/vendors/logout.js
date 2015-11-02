$("#logout").on("click",function(){
     $.ajax({
      url: "/admin/logout",
      type: "GET",
      timeout:3000,
      error:function(rep){
        var repObj = rep.responseJSON;
        console.log(repObj.msg);
        console.log("ERROR");
      },
      success:function(rep){
        window.location=rep;
      }
    });
});