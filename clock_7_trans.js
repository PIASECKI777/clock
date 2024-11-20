var secondsMin = -20;
var secondsMax = 88;
var triangleBase = 8;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;

var datePos = radius*0.45
var dateWidth = 15

var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

var days = ['SUN','MON','TUE','WED','THU','FRI','SAT']

ctx.translate(radius, radius);

//radius = radius * 0.90

setInterval(drawClock, 50);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);

  ctx.beginPath();
  ctx.arc(0, 0, radius*0.04, 0, 2*Math.PI);
  ctx.fillStyle = '#777';
  ctx.fill();

  
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.02, 0, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);


 grad = ctx.createRadialGradient(0,0,radius*0.05, 0,0,radius);
 grad.addColorStop(0, 'rgb(37, 73, 90)');
// grad.addColorStop(0.5, 'red');
 grad.addColorStop(0.7, 'rgb(25, 48, 60)');
 grad.addColorStop(1, 'rgb(9,25,33)');
 ctx.fillStyle = grad;

// gradient drawing

 ctx.fillRect(0,0,radius,radius);
 ctx.fillRect(0,0,radius,-radius);
 ctx.fillRect(0,0,-radius,-radius);
 ctx.fillRect(0,0,-radius,radius);

  ctx.lineWidth = radius*0.05;
  ctx.stroke();


  // small circle in the center 
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.08, 0, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  
  // small rectangle for number(1-31)
  ctx.beginPath()
  ctx.moveTo(datePos,-dateWidth)
  ctx.lineTo(datePos+dateWidth*2,-dateWidth)
  ctx.lineTo(datePos+dateWidth*2,dateWidth)  
  ctx.lineTo(datePos,dateWidth)  
  ctx.lineTo(datePos,-dateWidth)
  ctx.lineWidth = 1;
  ctx.fillStyle = 'rgb(44, 87, 107)';
  ctx.fill();
  ctx.stroke()
  
  
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.fillStyle = "#ccc";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  
  smallang=2 * Math.PI / 60;
  for(num = 1; num < 13; num++){
    // where does this number belong?
    ang = num * Math.PI / 6;
    
    // rotate to the right angle
    ctx.rotate(ang);
    
    // translate the origin to 0 along and 85% of the radius away
    // remember we are at an angle :)
    ctx.translate(0, -radius*0.76)
        
    // rotate context back to normal so writing is square
    ctx.rotate(-ang);
    
    // draw some text
    ctx.fillText(num.toString(), 0, 0);
    
    // rotate angle again
    ctx.rotate(ang);
    
    // translate out to 0 85% again
    ctx.translate(0, radius*0.76)
            
    // draw big ticks
    ctx.lineWidth = 2;
    ctx.moveTo(radius,0);
    ctx.lineTo(radius-25,0);
    ctx.stroke();
    
    // draw small ticks
    for(tick = 1; tick < 5; tick++){
      ctx.rotate(smallang );
      ctx.lineWidth = 2;
      ctx.moveTo(radius,0);
      ctx.lineTo(radius-15,0);
      ctx.stroke();
    }
    ctx.rotate(-smallang * 4);
    
    // and then rotate angle to square again.
    ctx.rotate(-ang);    
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var milliseconds = now.getMilliseconds();
    var date = now.getDate();
    var day = now.getDay();
   
    var month = now.getMonth();
  //  console.log('day ', date, day, month);


    ctx.font = radius*0.1 + "px arial";
    ctx.fillStyle = "#aaa";
    ctx.fillText(days[day], - datePos , 0);
    ctx.fillText(months[month], datePos - dateWidth*1.8, 0); 
    ctx.fillText(date.toString(), datePos + dateWidth, 0);
  
  //  var month = now.getMonth();
    second = second+(milliseconds/1000);
  
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.08, 0);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.05, 0);
    // second
    second=(second*Math.PI/30);
    ctx.strokeStyle="black";
    drawTriangle(ctx, second, radius*(secondsMax/100), radius*0.1, - radius* ( secondsMin/100),triangleBase);

}

function drawHand(ctx, pos, length, width, offset, trianglebase) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.moveTo(0,offset);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);

}

function drawTriangle(ctx, pos, length, width, offset, trianglebase) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "square";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.beginPath();
    ctx.moveTo(0,-length);
    ctx.lineTo(trianglebase/2, offset);
    ctx.lineTo(-trianglebase/2,offset);
    ctx.fillStyle="#777";
    ctx.fill();
  
    // testing mondaine style second hand circle
    /*ctx.beginPath();  
    ctx.arc(0, -length+radius*0.05,radius*0.05, 0, 2*Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();*/
  
    ctx.rotate(-pos);
}

