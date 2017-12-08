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
        var rect = canvas.getBoundingClientRect();
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
            base_image = new Image();           
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
});