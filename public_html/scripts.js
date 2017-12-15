"use strict";

class MouseCords{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
}
var actualTask = "";
var clicked = false;
var mc = new MouseCords();

$(document).ready(function(){  
    var mc = new MouseCords();
    var canvas = $("#canvas2")[0];
    canvas.width = 1200;
    canvas.height = 1200;
    var rect = $("#canvas2")[0].getBoundingClientRect();
    var ctx = $("#canvas2")[0].getContext('2d');
    
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
    
    $("#canvas2").on("mousemove", function(event){
        var rect = $("#canvas2")[0].getBoundingClientRect();
//        console.log(`Drugi header! x: + ${event.clientX - rect.left} +  y: ${event.clientY - rect.top}`);
    }, false); 
    
    $("#canvas2").on("click", function(event){
        var rect = $("#canvas2")[0].getBoundingClientRect();
        var ctx = $("#canvas2")[0].getContext('2d');

        if(actualTask === "drawLine"){
            if(clicked === false){ 
                clicked = true;               
                mc.x = event.clientX - rect.left;
                mc.y = event.clientY - rect.top;
                console.log(`Kliknieto: x = ${mc.x}, y = ${mc.y}`);
            }
            else {
                ctx.beginPath();
                ctx.moveTo(mc.x, mc.y);
                ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
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
                    break;
                case "Flash":
                    base_image.src = 'icons/flash.png';//img/base.png
                    break;
                    
                case "Smoke":
                    base_image.src = 'icons/smoke.png';//img/base.png
                    break;                    
            }
            base_image.onload = function(){
                ctx.drawImage(base_image, event.clientX - rect.left, event.clientY - rect.top);
            };
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

        ctx.clearRect(0, 0, canvas.height, canvas.width);
        
    });
});