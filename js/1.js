window.onload=function(){var e=document.querySelector("input[type=text]"),n=document.getElementsByClassName("alert")[0];e.oninput=function(){""==e.value?n.className="alert alert-warning":n.className="alert alert-warning hidden"}};