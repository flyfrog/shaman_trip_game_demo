function render(){//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// обнудение 
suma.position = 0 ;
ctx.clearRect(0,0,win.w,win.h);
ctx.save();


        ctx.translate(w/2, h/2);  // Translate to the center
        ctx.scale(zoom, -zoom);   // Zoom in and flip y axis

        // Draw all bodies
        ctx.strokeStyle='none';

        ctx.fillStyle='green';
//>>>>>>>>>>>>>>>>>

        drawPlane();

//LES************
ctx.rotate(180*Math.PI/180);
        for(var i=0; i<les.length; i++){
          drawLes(les[i]);
        }
ctx.rotate(180*Math.PI/180);
//************

        for(var i=0; i<platforms.length; i++){
          drawBox(platforms[i]);
        }

        ctx.fillStyle='red';
        drawBox(ja.b);
        for(var i=0; i<boxes.length; i++){
          drawBox(boxes[i]);
        }


        for(var i=0; i<fruct.length; i++){
        drawCircle(fruct[i]);
        }


//-------------------------------------------
     //   ctx.translate(w/2, h/2);  // Translate to the center
if(suma.bag.length>0){
        for(var i = 0; i<suma.bag.length;i++){

          draw_suma( i);

        }//for
      }//if

// все что не движится -------------------------
//drawPoly(concaveBody);
//drawLine(lineBody);
        // Restore transform
        ctx.restore();

}//end  render $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$