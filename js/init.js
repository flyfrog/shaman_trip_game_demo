      function init(){

        // Init canvas
        canvas = document.getElementById("myCanvas");

win.h = canvas.height;
win.w = canvas.width;
   
win.lx = win.w/2/zoom;
win.ly = win.h/2/zoom;

        w = win.w;
        h = win.h;
        ctx = canvas.getContext("2d");
        ctx.lineWidth = 1/zoom;

        // Init world
        world = new p2.World();


        world.defaultContactMaterial.friction = 0.5;
        world.setGlobalStiffness(1e5);


        // Init materials
        var groundMaterial = new p2.Material(),
            characterMaterial = new p2.Material(),
            boxMaterial = new p2.Material();

// Add a character body
//:::::::::::::::::::::::::::::::::::::::::
characterShape = new p2.Rectangle(ja.width,ja.height);
ja.b = new p2.Body({
          mass: 1,
          position:[2,18],
          fixedRotation: true,
});


ja.b.addShape(characterShape);
world.addBody(ja.b);
characterShape.material = characterMaterial;

ja.b.damping = 0.1;
ja.fr  = 0;
ja.b.img = res.img_pers_run[ja.fr];
ja.b.angle = 3.14;
ja.b.id_ = "ja";

/* Create a concave body::::::::::::::
             concaveBody = new p2.Body({
                mass : 0,
                position:[ -2,8]
            });

            // Give a concave path to the body.
            // Body.prototype.fromPolygon will automatically add shapes at
            // proper offsets and adjust the center of mass.
            var path = [[-6, 4],
                        [-6, -2],
                        [15, -2],
                        [15, 15],
                        [0.5, 0.5]];
            concaveBody.fromPolygon(path);
            concaveBody.path = path;
            // Add the body to the world
        //    world.addBody(concaveBody);
//:::::::::::::::::::::::::::::::::::::::::;   

          lineBody = new p2.Body({
                mass: 0,
                position: [-1,0],
                angle: 0
                
            });
            lineShape = new p2.Line(5);
            lineBody.addShape(lineShape);
            lineShape.material = groundMaterial;
            world.addBody(lineBody);         
*/
// Add a ground plane:::::::::::::::::::::::::::
        planeShape = new p2.Plane();
        planeBody = new p2.Body({
        position:[0,-1]
        });
        planeBody.addShape(planeShape);
        world.addBody(planeBody);
        planeShape.material = groundMaterial;

// Add platforms:::::::::::::::::::::::::::::::::::::::::
        //var platformPositions = gora_gen(1);


        var platformPositions = [[2,2],[19,20]];
         var platformShape = new p2.Rectangle(1,30);

        for(var i=0; i<platformPositions.length; i++){
          var platformBody = new p2.Body({
            mass: 0, // Static
            position:platformPositions[i],angle: gr(44)
          });
          platformBody.type = p2.Body.KINEMATIC;
          platformBody.addShape(platformShape);
          world.addBody(platformBody);
          platforms.push(platformBody);
        }
        platformShape.material = groundMaterial;

// Add movable boxes :::::::::::::::::::::::::::::::::::::::::::
var boxPositions = [  [4,6],[2,1],[2,1],[2,1],[22,30],[22,30],[22,30],[22,30],[22,30],[22,30]],
boxShape = new p2.Rectangle(1,1);
        for(var i=0; i<boxPositions.length; i++){
          var boxBody = new p2.Body({
            mass: 1,
            position:boxPositions[i],
          });
          boxBody.addShape(boxShape);
          boxBody.img = res.box_img;
          boxBody.id_ = "$"+i;

          world.addBody(boxBody);

          boxes.push(boxBody);
        }//for
boxShape.material = boxMaterial;
//___________________________________________
//Add fruct
var fructPositions = []; // массив фруктов
for(var y=0;y<=22;y++){
fructPositions.push([-2,y+10]); // фруктогенератор
}
var fructShape = new p2.Circle(0.3);
        for(var i=0; i<fructPositions.length; i++){
          var fructBody = new p2.Body({
            mass: 1,
            position:fructPositions[i],
          });
          fructBody.addShape(fructShape);
          fructBody.img = res.fruct_img;
          fructBody.id_ = "apple"+i;
          fructBody.class_ = "apple";
          world.addBody(fructBody);

          fruct.push(fructBody);
        }//for
fructShape.material = boxMaterial;





// Init contactmaterials
        var groundCharacterCM = new p2.ContactMaterial(groundMaterial, characterMaterial,{
          friction : 0, // No friction between character and ground
        });
        var boxCharacterCM = new p2.ContactMaterial(boxMaterial, characterMaterial,{
          friction : 0, // No friction between character and boxes
        });
        var boxGroundCM = new p2.ContactMaterial(boxMaterial, groundMaterial,{
          friction : 0.6, // Between boxes and ground
        });
        world.addContactMaterial(groundCharacterCM);
        world.addContactMaterial(boxCharacterCM);
        world.addContactMaterial(boxGroundCM);

 

}//end init 