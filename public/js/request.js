function checkLocation(){
    var e = document.getElementById("location").value;
    if (e != "null"){
        document.getElementById("location").style = "color:black";
    }else{
        document.getElementById("location").style = "color:gray";
    }
}


function checkIssue(){
    var e = document.getElementById("issue").value;
    if (e != "null"){
        document.getElementById("issue").style = "color:black";
    }else{
        document.getElementById("issue").style = "color:gray";
    }

    switch (e) {
        case "1":
            document.getElementById("issue1").style = "display:block;";
            document.getElementById("issue2").style = "display:none;";
            document.getElementById("issue3").style = "display:none;";
            break;
        case "2":
            document.getElementById("issue1").style = "display:none;";
            document.getElementById("issue2").style = "display:block;";
            document.getElementById("issue3").style = "display:none;";
            break;   
        case "3":
            document.getElementById("issue1").style = "display:none;";
            document.getElementById("issue2").style = "display:none;";
            document.getElementById("issue3").style = "display:block;";
            break;
    }
}

