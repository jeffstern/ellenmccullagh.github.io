var url;
var names;

window.onload = function() { 
  url = localStorage.getItem("url");
  names = localStorage.getItem("names");
  if(url) {
    $("#SheetID").val(url);
  }
  if(names) {
    names = names.split(",");
  } else {
    init(url); 
  }

  $("#random").click(function() {
      var randomInt = getRandomInt(0,names.length-1);
      $("#resultdisplay").html(names[randomInt]);
  });

  $("#newsheet").click(function() {
      $("#resultdisplay").html("");
      var input = $("#SheetID").val();
      if(input.startsWith("https://docs.google.com/spreadsheets/")){
        init(input);
      }
      else {
        names = input.split(",");
        localStorage.setItem("url",names);
        localStorage.setItem("names",names);
      }
  });

};

function init(public_spreadsheet_url) {
  $('#random').attr('disabled','disabled');
  localStorage.setItem("url", public_spreadsheet_url);
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  names = [];
  for (var key in data) {
    console.log(names);
    names.push(data[key]['name']);
  }
  localStorage.setItem("names", names)

  $('#random').removeAttr('disabled');
  console.log(data);
}

function getRandomInt(min, max) {
  max ++;
  return Math.floor(Math.random() * (max - min)) + min;
}