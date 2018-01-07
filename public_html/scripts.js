"use strict";

class Coordinates{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
}

var actualTask = "";
var clicked = false;
var mc = new Coordinates();

$(document).ready(function(){  
    var canvas = $("#canvas2")[0];
    var rect = canvas.getBoundingClientRect();
    var ctx = canvas.getContext('2d');
    
    $('#drawLine').click(function(){
        console.log("Kliknie drawLine");
        actualTask = "drawLine";
    });   
    $('.grenade').click(function(){
        console.log("Granat!");
        if($(this).val() === "Flash" || $(this).val() === "Smoke" || $(this).val() === "HE"){
            console.log(`Kliknięto dodaj ${$(this).val()}`);
            actualTask = $(this).val();         
        }
        else console.log("Nie ma takiego granatu lub coś poszło nie tak.");  
    });
    $(window).on('load resize', function(){
        alert("resize");
        canvas = document.getElementById("canvas2");
        canvas.height = $("#canvas2").parent().height();
        canvas.width = $("#canvas2").parent().width();
        
    });
    
    $("#canvas2").on("mousemove", function(event){
        var rect = canvas.getBoundingClientRect();
    }, false); 
    
    $("#canvas2").on("click", function(event){
        var rect = $("#canvas2")[0].getBoundingClientRect();
        var ctx = $("#canvas2")[0].getContext('2d');

        if(actualTask === "drawLine"){
            if(clicked === false){ 
                clicked = true;               
                mc.x = event.clientX;
                mc.y = event.clientY;
                //console.log(`Event.clientX: ${event.clientX}, rect.left: ${rect.left}`);
                console.log(`Kliknieto: x = ${mc.x}, y = ${mc.y}`);
            }
            else {
                ctx.beginPath();
                ctx.moveTo(mc.x , mc.y);
                ctx.lineTo(event.clientX, event.clientY);
                console.log(`Narysowano kreskie z: x = ${mc.x}, y = ${mc.y} do ${event.clientX - rect.left} do ${event.clientY - rect.top}`);
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.lineWidth = 1;
                clicked = false;
            }
        }
        
        if(actualTask === "HE" || actualTask === "Flash" || actualTask === "Smoke"){
            var base_image = new Image();           
            switch (actualTask){
                case "HE":
                    base_image.src = 'icons/he.png';//img/base.png
                    console.log("granat" , event.clientX, event.clientY, canvas.height, canvas.width);
                    break;
                case "Flash":
                    base_image.src = 'icons/flash.png';//img/base.png
                    console.log("granat" , event.clientX, event.clientY);
                    break;
                    
                case "Smoke":
                    base_image.src = 'icons/smoke.png';//img/base.png
                    console.log("granat" , event.clientX, event.clientY);
                    break;                    
            }
            ctx.drawImage(base_image, event.clientX - rect.left, event.clientY);
        }      
    });
    
    $("#check").change(function(event){       
        if($("#check option:selected").val() === "dust2"){
            $("#canvas2").css("background-image", 'url("maps/dust2.jpg")');
        }
        else if($("#check option:selected").val() === "inferno"){
            $("#canvas2").css("background-image", 'url("maps/inferno.jpg")');
        }
        else if($("#check option:selected").val() === "mirage"){
            $("#canvas2").css("background-image", 'url("maps/mirage.jpg")');
        }
        else if($("#check option:selected").val() === "overpass"){
            $("#canvas2").css("background-image", 'url("maps/overpass.jpg")');
        }
        else if($("#check option:selected").val() === "train"){
            $("#canvas2").css("background-image", 'url("maps/train.jpg")');
        }
        else if($("#check option:selected").val() === "cache"){
            $("#canvas2").css("background-image", 'url("maps/cache.jpg")');
        }

        ctx.clearRect(0, 0, $("#canvas2").parent().height(), $("#canvas2").parent().width());      
    });
});

