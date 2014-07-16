var joker=""

var formulaic = {
  
  validate: function(choricete){
    for (var i = 0, len = choricete.length; i < len; i++) {
      if($.inArray(choricete[i], allowed) == -1) return false;
    };
    return true;
  },
  
  callServer: function(chinumber){
    table= server.computa(chinumber);
    if (table!=null){
      $("input#sourcestring").val("");
      $("#expo").html("");
      $("#expo").append(table)
    }else{
      $("#expo").html("<div id='intro'>Something went horribly wrong. Please post bellow the Chinese number that you tried so we can search for the \'bug\'.</div>");
    }
  },
	
	turn_on_form: function(){
		$("input#mysubmit").click(function(){
		  $("table#tabulary > tbody > tr").remove();
		  chinumber= $("input#sourcestring").val();
		  if (formulaic.validate(chinumber)){
		    formulaic.callServer(chinumber)
		  } else {
		    console.log("WRONG INPUT");
		    $("#expo").html("<div id='intro'><p>I am sorry, the input string \'"+chinumber+"\' is not recognized. Only the following characters are valid:</p><p>"+allowed.toString()+"</p></div>");
		  }
		})
	}
}

$(function () {
	formulaic.turn_on_form();	
})

