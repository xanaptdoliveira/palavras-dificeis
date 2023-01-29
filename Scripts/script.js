
var CurrentGame = parseInt(gameCached);

var Currentrow = 1;


let tipsArray = [
    ["ALVISSARAS", "Prémio dado a quem apresenta objetos perdidos ou ao que dá uma notícia agradável.", "Expressão usada para exprimir contentamento por uma boa notícia.", "./Images/1.png", "Recompensa", "Epitimologia: árabe vulgar al-bixra, do árabe al-buxra", "Dão-se __ a quem encontrar o cão cinzento."],
    ["MENDACIOSO", "Aquele que mente.", "Enganador; Falso.", "./Images/2_1.png", "./Images/2_2.png", "Ninguém seria capaz em acreditar num discurso tão __.", "Aquele conhecido ex-presidente é __."],
    ["ZOOMORFICO", "Desenhos e gravuras que representam  animais.", "Rima com Idiomórfico.", "./Images/3_1.jpg", "./Images/3_2.png", "O seu aspecto__ assusta qualquer um.", "Relativo à zoomorfia."]
];

let tipsTitleArray = [
    ["", "", "", "", "Sinónimo:", "Epitimologia:", ""],
    ["", "Sinónimos", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];


// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    document.location.href = 'mainView.html';
  }
}


//Start Page
SetupJoinInputs()




StartGame(tipsArray[CurrentGame - 1][0]);

var GameOverImage = "./Images/perdeu"+CurrentGame+".png";
var GameOverImageGanhou = "./Images/ganhou.png";




// Start The game
function StartGame(palavraChave) {

    console.log("Palavra secreta: " + palavraChave);
    
    ClearInputs();
    NewRow();


}


function NewRow() {

    if (Currentrow < 7) {
        SelectHint();

        EnableInput();

        ChangeTip();

        var restam= 6-Currentrow;
        if(restam == 1)
        {
            $("#restamPistas").text("Resta " + restam +" pista");

        }
        else
        {
        $("#restamPistas").text("Restam " + restam +" pistas");
        }

        Currentrow++;
    }
    else {
        // CurrentGame++;
        // Currentrow = 1;
        // ClearInputs();
        // StartGame(tipsArray[CurrentGame - 1][0]);

        $(".modal-content").css("background-image","url(" + GameOverImage +  ")");
        modal.style.display = "block";
        
    }
}

function ChangeTip() {

    var tip = tipsArray[CurrentGame - 1][Currentrow];
    var tipTitle = tipsTitleArray[CurrentGame - 1][Currentrow];

    $("#TipContent").text("");
    $("#TipContentTitle").text("");
    $("#toImage").css("background-image", "none");

    if (tip.endsWith("png") || tip.endsWith("jpg")) {

        $("#toImage").css("background-image", "url(" + tip + ")");

    }
    else {
        $("#TipContent").text(tip);
        $("#TipContentTitle").text(tipTitle);


        $('#TipContent').css('background-image', 'none');
    }
}


function Submeter() {

    const word = tipsArray[CurrentGame - 1][0].toLowerCase();

    var CurrentrowTemp = Currentrow - 1;

    let inputsIdentifier = "#row" + CurrentrowTemp + " input";
    let inputs = $(inputsIdentifier);



    let toExit = 0;

    let t = 0;
    inputs.each(function () {

        var input = $(inputs[t]);
        let value = input.val();

        if (value == "") {
            
            toExit = 1;
            
        }

        t++;

    });

    if(toExit == 1)
    return;

    let i = 0;

    var letrasCorretas = 0;

    inputs.each(function () {

        

        var input = $(inputs[i]);
        let value = input.val().toLowerCase();



        if (value === word[i]) {
            input.addClass("PreenchidoRight");
            letrasCorretas++;

        } else if (word.includes(value)) {
            input.addClass("PreenchidoSemiRight");
        } else {
            input.addClass("PreenchidoWrong");
            setLetterDone(value);
        }

        i++;

    });

    if (letrasCorretas == 10) 
    {

        $(".modal-content").css("background-image","url(" + GameOverImageGanhou +  ")");

        modal.style.display = "block";

    } 



    NewRow();
}


function setLetterDone(letter)
{


var search = $( ".FooterSquare" ).filter( function ()
{
    return $( this ).text().toLowerCase().indexOf( letter.toLowerCase() ) >= 0;
}).first(); 




search.addClass("footerDisapear");

}



function ClearInputs() {

    $(':input').val('');
    $(':input').removeClass("PreenchidoWrong");
    $(':input').removeClass("PreenchidoSemiRight");
    $(':input').removeClass("PreenchidoRight");

    $('.FooterSquare').removeClass("footerDisapear");
    
}

function EnableInput() {


    for (let i = 1; i < 7; i++) {
        let inputsIdentifier = "#row" + i + " input";
        let inputsIdentified = $(inputsIdentifier);

        if (i == Currentrow)
            inputsIdentified.prop("disabled", false);
        else
            inputsIdentified.prop("disabled", true);

    }


}


function SelectHint() {
    let i = 1;
    $("[id^='hint']").each(function () {
        if (i < Currentrow)
            $(this).attr("class", "MissingTriesSquarePast");
        if (i == Currentrow)
            $(this).attr("class", "MissingTriesSquareCurrent");
        if (i > Currentrow)
            $(this).attr("class", "MissingTriesSquareEmpty");
        i++;
    });
}

function SetupJoinInputs() {

    $(function () {

        $('#row1 input').joinInputs();
        $('#row2 input').joinInputs();
        $('#row3 input').joinInputs();
        $('#row4 input').joinInputs();
        $('#row5 input').joinInputs();
        $('#row6 input').joinInputs();

    });
}


$(document).keypress(function(event){
	
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		Submeter();
	}
	
});