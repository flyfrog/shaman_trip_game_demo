function poly_w_h(p){ //::::::::::::::::::POLY:::::::::::::::::::::
var w_h = {};
var minX=0,maxX=0,minY=0,maxY=0;
for(var i =0;i<p.length;i++){
if(p[i][0]<minX)minX=p[i][0];
if(p[i][0]>maxX)maxX=p[i][0];
if(p[i][1]<minY)minY=p[i][1];
if(p[i][1]>maxY)maxY=p[i][1];
 }
w_h.w = Math.abs(minX-maxX);
w_h.h = Math.abs(maxY-minY);
w_h.miny = minY;
w_h.minx = minX;
return w_h;
}
function drawPoly(body){
        var x = body.position[0]-ja.x,xc = body.position[0],
            y = body.position[1]-ja.y,yc = body.position[1],
            p = body.path ;
var hw = poly_w_h(p);
var compx = Math.abs(xc)/2+hw.minx;
var compy = Math.abs(yc)/2+hw.miny;
//D("eva").innerHTML = body;
 
ctx.translate(x-compx, y -compy);     // Translate to the center of the box
ctx.rotate(body.angle);  // Rotate to the box body frame    
ctx.fillStyle = '#f00';
ctx.beginPath();
ctx.moveTo(p[0][0],p[0][1]);
for(var i =0;i<p.length;i++){
ctx.lineTo(p[i][0],p[i][1]);
}
ctx.lineTo(p[0][0],p[0][1]);
ctx.closePath();
ctx.lineWidth = 0.1;
ctx.stroke();
//ctx.fill();
}//end poly  :::::::::::::::::::::::::::::::::::::::::::::::::::

function drawLine(b){// :::::::::::::::::::::::::::::::::::::::: 
        var x = b.position[0]-ja.x,
            y = b.position[1]-ja.y,
            s = b.shapes[0];
 
D("eva").innerHTML = JSON.stringify(s); 
//D("eva").innerHTML = body;
ctx.rotate(b.angle);  // Rotate to the box body frame     
ctx.translate(x-s.length/2,y );     // Translate to the center of the box

ctx.beginPath();
ctx.moveTo(0,0);

ctx.lineTo(s.length,0);
ctx.closePath();
ctx.lineWidth = 0.3;
ctx.stroke();

}//end drawLine :::::::::::::::::::::::::::::::::::::::::::::::::::


//end drawBox :::::::::::::::::::::::::::::::::::::::::::::
function drawBox(body){
        ctx.beginPath();
        var x = body.position[0]-ja.x,
            y = body.position[1]-ja.y,
            s = body.shapes[0];
        ctx.save();
        ctx.translate(x, y);     // Translate to the center of the box
        ctx.rotate(body.angle);  // Rotate to the box body frame
        
        if(typeof(body.img)=="undefined"){
        ctx.fillRect( -s.width/2, -s.height/2, s.width, s.height);
      }else{

      draw_img(body,x,y,s);
      }
        ctx.restore();
}//end drawBox :::::::::::::::::::::::::::::::::::::::::::::





//end drawBox :::::::::::::::::::::::::::::::::::::::::::::
function drawCircle(body){
        ctx.beginPath();
        var x = body.position[0]-ja.x,
            y = body.position[1]-ja.y,
            s = body.shapes[0];

        ctx.save();
        ctx.translate(x, y);     // Translate to the center of the box
        ctx.rotate(body.angle);  // Rotate to the box body frame
        if(typeof(body.img)=="undefined"){
       ctx.arc(0, 0, s.radius, 0, 2*Math.PI);
       ctx.fillStyle='red';
       ctx.fill();
      }else{
       ctx.drawImage(body.img,-s.radius,-s.radius,s.radius*2,s.radius*2);
      }
        ctx.restore();
}//end drawBox :::::::::::::::::::::::::::::::::::::::::::::

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function draw_img(body,x,y,s){//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// персонаж

if(typeof(body.id_)=="undefined"){
 ctx.drawImage(body.img,-s.width/2, -s.height/2, s.width, s.height);
}else{//для простых

if(body.id_=="ja"){ 
if(ja.wa==1)ctx.scale(-1, 1); // код шамана
ctx.drawImage(body.img,-s.width/2, -s.height/2, s.width, s.height+0.1);
}//конец кода щамана

if(body.id_!="ja"){  
ctx.drawImage(body.img,-s.width/2, -s.height/2, s.width, s.height);
}

}//ELSE

}//draw_img ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function drawLes(body){//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//--------------------------------------------------------------------
var 
x = (body.x*-1)+ja.x ,
y= (body.y*-1)+ja.y,
w= body.w,
h =body.h;
ctx.drawImage(body.img,x, y, w, h);

}//draw_img ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^