// =============================================================================
// Segment 2 - Left Side Room
// =============================================================================

//tapestry: make the wall tapestry object
//three parameters: width (integer), height (integer), and texture (image file)
//does not return anything, adds the tapestry to the scene
function tapestry(width, height, texture){
    var tapGeom = new THREE.PlaneGeometry(width, height);
    var tapMaterial = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, side: THREE.DoubleSide, map: texture[2] });
    var tapMesh = new THREE.Mesh(tapGeom, tapMaterial)

    //for the texture mapping to work properly, add to the scene
    scene.add(tapMesh);

    //position tapestry
    tapMesh.rotation.y = Math.PI/2;
    tapMesh.position.set(-roomDim.width/2+0.1, roomDim.height/2, roomDim.depth/3);
};

//stool: make the stool
//one parameter: height (integer)
//returns Object3D
function stool(height){
    var stool = new THREE.Object3D();
    var stoolMaterial = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide });

    var seatGeom = new THREE.CylinderGeometry(height/2, height/2, height/12, 32, 32);
    var seatMesh = new THREE.Mesh(seatGeom, stoolMaterial);
    stool.add(seatMesh);

    var legOneGeom = new THREE.CylinderGeometry(height/12, height/12, height, 32, 32);
    var legOneMesh = new THREE.Mesh(legOneGeom, stoolMaterial);
    legOneMesh.position.x = height/2;
    legOneMesh.position.y = -height/2;
    legOneMesh.position.z = 0;
    legOneMesh.rotation.z = Math.PI/16;
    stool.add(legOneMesh);

    var legTwoGeom = new THREE.CylinderGeometry(height/12, height/12, height, 32, 32);
    var legTwoMesh = new THREE.Mesh(legTwoGeom, stoolMaterial);
    legTwoMesh.position.x = -height/2;
    legTwoMesh.position.y = -height/2;
    legTwoMesh.position.z = 0;
    legTwoMesh.rotation.z = -Math.PI/16;
    stool.add(legTwoMesh);

    var legThreeGeom = new THREE.CylinderGeometry(height/12, height/12, height, 32, 32);
    var legThreeMesh = new THREE.Mesh(legThreeGeom, stoolMaterial);
    legThreeMesh.position.x = 0;
    legThreeMesh.position.y = -height/2;
    legThreeMesh.position.z = height/2;
    legThreeMesh.rotation.x = -Math.PI/16;
    stool.add(legThreeMesh);

    var legFourGeom = new THREE.CylinderGeometry(height/12, height/12, height, 32, 32);
    var legFourMesh = new THREE.Mesh(legFourGeom, stoolMaterial);
    legFourMesh.position.x = 0;
    legFourMesh.position.y = -height/2;
    legFourMesh.position.z = -height/2;
    legFourMesh.rotation.x = Math.PI/16;
    stool.add(legFourMesh);

    //position the stool
    stool.position.x = -roomDim.width/5;
    stool.position.y = height;
    stool.position.z = roomDim.depth/2;

    return stool;

};

// beginning of code for white bottle
//modified from the coke bottle code in class

//props points for the bezier curves
var upper_cp = [ [0.5/2, 5],
                 [0.5/2, 3.0],
                 [1.5/2, 2.0],
                 [1.5/2, 1.5] ];

// middle curve, from upper bulge [above] to dent with diameter 1.25" at height 1.25"

middle_cp = [ [1.5/2,  1.5],
              [1.5/2,  1.5],
              [1/2, .4],
              [1.25/2, .3] ];

// lower curve, from dent to base, with a radius the same as the bulge

lower_cp = [ [1.25/2, .3],
             [1.25/2, .2],
             [1.5/2,  0.1],
             [1/2,  0] ];

var bottlePts = Array.prototype.concat(upper_cp, middle_cp, lower_cp);

//createWhiteBottle: creating the small white bottle to the left of the props
//no parameters
//returns Object3D
function createWhiteBottle(){
    //make the array for the points
    function makePoints (pts) {
       var points = [];
       for(var i = 0; i < pts.length; i++) {
           points.push(new THREE.Vector3(pts[i][0], pts[i][1], 0));
       }
       return points;
    }

    var bottlePoints = makePoints(bottlePts);

// create a spline curve to use for the lathe geometry

    var splineObj;

    function makeSplineObj (points) {
       var mat = new THREE.MeshBasicMaterial( {color: 0xff0000} );
       // var curve = new THREE.SplineCurve3(points);
       var curve1 = new THREE.CubicBezierCurve3(points[0],points[1],points[2],points[3]);
       var curve2 = new THREE.CubicBezierCurve3(points[4],points[5],points[6],points[7]);
       var curve3 = new THREE.CubicBezierCurve3(points[8],points[9],points[10],points[11]);
       var geom = new THREE.Geometry();
       // geom.vertices = curve.getPoints(50);
       geom.vertices = Array.prototype.concat( curve1.getPoints(10),
                                               curve2.getPoints(10),
                                               curve3.getPoints(10) );
       splineObj = new THREE.Line( geom, new THREE.LineBasicMaterial( { linewidth: 3, color: 0x0000ff }) );
    }

    makeSplineObj(bottlePoints);

// create a lathe geometry using the spline curve

    var latheObj;

    function makeLatheObj() {
       var geom = new THREE.LatheGeometry(splineObj.geometry.vertices);
       var mat1 = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide});
       latheObj = new THREE.Mesh(geom, mat1);
        return latheObj;
    }
    var bottle = makeLatheObj();
    bottle.scale.set(8,8,8);
    return bottle;

}

//createBook: make the book object (just one)
//three parameters: width (integer), height (integer), depth (integer)
//returns Object3D
function createBook(width,height,depth){
    //create the holders for the object
    var book = new THREE.Object3D();
    var bookCover = new THREE.Object3D();

    //make the book cover and binding
    var coverGeom = new THREE.BoxGeometry(width, height/5, depth);
    var coverMat = new THREE.MeshPhongMaterial({ color: 0x4c4225, side: THREE.DoubleSide });
    var coverMesh = new THREE.Mesh(coverGeom, coverMat);

    var coverMesh2 = coverMesh.clone();
    coverMesh2.position.y = 2/5*height + height/4;

    var sideGeom = new THREE.BoxGeometry(height/5, 3/4*height, depth);
    var sideMesh = new THREE.Mesh(sideGeom, coverMat);

    sideMesh.position.x = -width/2 + height/10;
    sideMesh.position.y = 3/8*height;

    //add the cover
    bookCover.add(sideMesh);
    bookCover.add(coverMesh);
    bookCover.add(coverMesh2);

    //make the pages inside
    var pageGeom = new THREE.BoxGeometry(.9*width, .60*height, .9*depth);
    var pageMat = new THREE.MeshPhongMaterial( { color: 0xdbdbd2, side: THREE.DoubleSide });
    var pageMesh = new THREE.Mesh(pageGeom, pageMat);

    //position the pages so they are inside the cover
    pageMesh.position.y = .5*.75*height;

    //add everything to the mesh
    book.add(bookCover);
    book.add(pageMesh);

    return book;
}

//createBox: make the box object (just one)
//three parameters: w1 (integer), h1 (integer), d1 (integer)
//return Object3D
function createBox(w1,h1,d1){
    var box = new THREE.Object3D();

    //make the box itself
    var boxGeom = new THREE.BoxGeometry(w1, h1, d1);
    var boxMat = new THREE.MeshPhongMaterial({ color: 0x56491f, side: THREE.DoubleSide });
    var boxMesh = new THREE.Mesh(boxGeom, boxMat);

    //make the lid
    var topGeom = new THREE.BoxGeometry(1.1*w1, .3*h1,1.1*d1);
    var topMesh = new THREE.Mesh(topGeom, boxMat);

    topMesh.position.y = .3/2*h1 + h1/2;
    box.add(boxMesh);
    box.add(topMesh);

    return box;
}

//createCandleHolder: make the candle holder object
//three parameters: height (integer), radiusCylinder (integer, this is of the stand)
//,radiusCup (integer, this is of the little dishes on the side)
//return Object3D 
function createCandleHolder(height,radiusCylinder,radiusCup){

    //create the holders for all the components of the candle holder
    var candleHolder = new THREE.Object3D();
    var prong = new THREE.Object3D();
    var line = new THREE.Object3D();
    var baseDetails = new THREE.Object3D();

    //create the materials
    var candleHolderMat = new THREE.MeshPhongMaterial({ color: 0x7c6b36, side: THREE.DoubleSide});
    var lineMat = new THREE.MeshPhongMaterial({ color: 0x7c6b36, linewidth: 100 });

    //make the center piece
    var candleHolderGeom = new THREE.CylinderGeometry(radiusCylinder, radiusCylinder, height, 32, 32);
    var candleHolderMesh = new THREE.Mesh(candleHolderGeom, candleHolderMat);

    //make the top dish
    var topCandleGeom = new THREE.ConeBufferGeometry( radiusCylinder, height, 32);
    var topCandleMesh = new THREE.Mesh(topCandleGeom, candleHolderMat);
    candleHolderMesh.position.y = height/2;
    topCandleMesh.position.y = height/4 + height;

    //base details
    var baseGeom = new THREE.TorusGeometry( 1.5*radiusCylinder, radiusCylinder, 16, 100 );
    var baseMesh = new THREE.Mesh( baseGeom, candleHolderMat);
    baseMesh.rotation.x = Math.PI/2;

    baseMesh2 = baseMesh.clone();
    baseMesh2.scale.set(.75,.75,.75);
    baseMesh2.position.y = radiusCylinder;
    baseMesh3 = baseMesh2.clone();
    baseMesh2.scale.set(.75,.75,.75);
    baseMesh3.position.y = radiusCylinder;

    baseDetails.add(baseMesh);
    baseDetails.add(baseMesh2);
    baseDetails.add(baseMesh3);

    //make the sides
    //there are two sections for the wires that hold up the dishes
    //controlPoints1 and controlPoints2 are the two sections
    var controlPoints1 = [
                      [0,5,0],
                      [1,2,0],
                      [2,.5,0],
                      [3,0,0]
                      ];
    var curveGeom1 = TW.createBezierCurve(controlPoints1,20);

    var curve1 = new THREE.Line( curveGeom1,lineMat);

    var controlPoints2 = [ [3,0,0],
                      [3.5,-.5,0],
                      [4,-.5,0],
                      [4.5,0,0] ];

    var curveGeom2 = TW.createBezierCurve(controlPoints2,20);

    var curve2 = new THREE.Line( curveGeom2, lineMat);

    var controlPoints3 = [[4.5,0,0],
                        [5,1,0],
                        [6,4,0],
                        [7,9,0]];

    var curveGeom3 = TW.createBezierCurve(controlPoints3,20);

    var curve3 = new THREE.Line(curveGeom3, lineMat);

    //make the holder for each side
    var smallHolderGeom = new THREE.SphereGeometry(radiusCup, 32, 32, 0, Math.PI * 2, 0, -Math.PI/2);
    var smallHolderMesh = new THREE.Mesh(smallHolderGeom, candleHolderMat);

    smallHolderMesh.rotation.z = Math.PI;
    var topHolder = smallHolderMesh.clone();
    topHolder.position.y = .87*(height*2);

    //add all the components to the holder we made in the beginning
    smallHolderMesh.position.y = 20;
    smallHolderMesh.position.x = 14;

    line.add(curve1);
    line.add(curve2);
    line.add(curve3);
    line.scale.set(2,2,0);
    prong.add(line);
    prong.add(smallHolderMesh);

    prong.position.y = height;
    prong.position.x = radiusCylinder/3;


    prong2 = prong.clone();
    prong2.scale.set(-1,1,1);
    prong2.position.x = -radiusCylinder/3;


    candleHolder.add(topHolder);
    candleHolder.add(candleHolderMesh);
    candleHolder.add(baseDetails);
    candleHolder.add(topCandleMesh);
    candleHolder.add(prong);
    candleHolder.add(prong2);

    return candleHolder;
}

//createLamp: make the lamp object
//one parameter: shadeRadius (integer)
//return Object3D
function createLamp(shadeRadius){
    //make the parent holder object
    var lamp = new THREE.Object3D();

    //make the shade
    var lampMat = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
    var lampShadeGeom = new THREE.SphereGeometry(shadeRadius, 32, 32, 0, Math.PI * 2, 0, Math.PI/2);
    var lampShadeMesh = new THREE.Mesh(lampShadeGeom, lampMat);

    //the bottom is basically another half circle
    lampBottomMesh = lampShadeMesh.clone();

    //make the stand
    var standGeom = new THREE.SphereGeometry(shadeRadius/2, 32, 32);
    var lampStandMesh = new THREE.Mesh(standGeom, lampMat);
    lampStandMesh.scale.set(.5,2,.5);

    //add the notch at the top
    var topGeom = new THREE.CylinderGeometry(shadeRadius/4, shadeRadius/4, shadeRadius/8, 32, 32);
    var topMesh = new THREE.Mesh(topGeom, lampMat);
    topMesh.position.y = shadeRadius;

    //add it all together
    topShade = topMesh.clone();
    topShade.position.y = 1.75*shadeRadius;

    lampShadeMesh.position.y = .75*shadeRadius;

    lamp.add(lampBottomMesh);
    lampBottomMesh.scale.set(.5,.5,.5);
    lampBottomMesh.position.y = -shadeRadius;

    lamp.add(topShade);
    lamp.add(topMesh);
    lamp.add(lampShadeMesh);
    lamp.add(lampStandMesh)

    return lamp;
}

//createBowl: make the bowl object
//five parameters: bowlRadius (integer),bheight (integer),
//toolRad1 (integer),toolRad2 (integer),theight (integer)
//return Object3D
function createBowl(bowlRadius,bheight,toolRad1,toolRad2,theight){
    //make the parent objects
    var bowl = new THREE.Object3D();
    var tool = new THREE.Object3D();

    //make the bowl as a half sphere that is double sided
    var bowlGeom = new THREE.SphereGeometry(bowlRadius, 32, 32, 0, Math.PI * 2, 0, Math.PI/2);
    var bowlMat = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide });
    var bowlMesh = new THREE.Mesh(bowlGeom, bowlMat);
    bowlMesh.rotation.z = Math.PI;

    //make the tool with a cylinder and two half spheres
    var toolMat = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
    var baseToolGeom = new THREE.CylinderGeometry(toolRad1, toolRad2, theight, 32, 32);
    var topToolGeom = new THREE.SphereGeometry(toolRad1, 32, 32, 0, Math.PI * 2, 0, Math.PI/2);
    var baseToolMesh = new THREE.Mesh(baseToolGeom,toolMat);
    var topToolMesh = new THREE.Mesh(topToolGeom, toolMat);

    //put it all together and position it properly
    baseToolMesh.position.y = theight/2;
    topToolMesh.position.y = theight;
    tool.add(topToolMesh);
    tool.add(baseToolMesh);

    //make the rotation so that the tool rests on the side of the bowl
    tool.rotation.z = 2/3*Math.PI + 1/10*Math.PI;
    tool.position.y = theight/4;
    tool.position.x = bowlRadius;

    bowl.add(bowlMesh);
    bowl.add(tool);

    return bowl;
}

//createStacked: create a subset of the final props
//three parameters: wbox (integer), hbox (integer), dbox (integer)
//everything will be placed relative to the box dimensions
//return Object3D
function createStacked(wbox,hbox,dbox){
    //create the parent object
    var subProps = new THREE.Object3D();

    //make the box
    var box = createBox(wbox,hbox,dbox);
    box.position.y = (3/2*hbox + hbox/2)/4;
    subProps.add(box);

    //make some books
    var book3 = createBook(dbox,hbox,wbox);

    book3.rotation.y = Math.PI/2;
    book3.position.y = (3/2*hbox + hbox/2)/4 + hbox/1.25;
    subProps.add(book3);

    var book4 = createBook(wbox/2,hbox,dbox);
    book4.position.y = (3/2*hbox + hbox/2)/4 + 2*hbox/1.25;
    book4.position.x = -dbox/2 + hbox/5;
    subProps.add(book4);

    return subProps;
}

//createProps: make all the subProps
//one parameter: list of parameters
//return Object3D
function createProps(list){
    //make props parent object
    var completeProps = new THREE.Object3D();
    completeProps.name = "complete props";

    //make some books on the side
    var book1 = createBook(list.w1,list.h1,list.d1);
    var book2 = createBook(list.w1,list.h1,list.d1);
    book2.rotation.x = -Math.PI/2;
    book2.rotation.z = Math.PI/2;

    book1.position.y = (list.h1/5)/2;

    book2.position.y = list.h1;
    book2.position.z = -list.d1;
    book2.position.x = list.w1;

    completeProps.add(book1);
    completeProps.add(book2);

    //make those sub props from earlier
    var props = createStacked(70,20,40);
    props.position.z = -list.d1;
    props.position.x = -list.wbox/2 + (list.w1/2 - list.h1/5);
    completeProps.add(props);

    //make the bottle using the modified coke code
    var bottle = createWhiteBottle();
    bottle.position.x = -list.wbox;
    bottle.position.y = .025*list.hbox;
    bottle.position.z = -list.dbox/2;
    completeProps.add(bottle);

    //make the lamp
    var lamp = createLamp(list.shadeRadius);
    lamp.position.y = list.shadeRadius + 1.6*list.h1;
    lamp.position.z = -list.d1;
    completeProps.add(lamp);

    //make the candleHolder
    var candleHolder = createCandleHolder(list.height,list.radiusCylinder,list.radiusCup);
    candleHolder.position.y = list.radiusCylinder + 2.25*list.h1;
    candleHolder.position.z = -list.d1;
    candleHolder.position.x = -1.25*list.w1;
    completeProps.add(list.candleHolder);

    //need to add bowl + spoons
    var bowl = createBowl(list.bowlRadius,list.bheight,list.toolRad1,list.toolRad2,list.theight);
    bowl.position.y = list.bowlRadius;
    bowl.position.x = 2*list.bowlRadius;
    completeProps.add(bowl);

    return completeProps;
}


//table: make all the table and props
//four parameters: width (integer), height (integer), depth (integer), list (list)
//return Object3D
function table(width, height, depth, list){
    // make the parent object
    var table = new THREE.Object3D();

    //for debugging purposes, name the object to see if it was added to the scene
    table.name = "table";
    var tableMaterial = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide });

    //make the table top
    var tableTopGeom = new THREE.BoxGeometry(width, height/12, depth, 32, 32);
    var tableTopMesh = new THREE.Mesh(tableTopGeom, tableMaterial);
    table.add(tableTopMesh);

    //make components of the legs
    var tableBarGeom = new THREE.BoxGeometry(width/12, height/5, depth, 32, 32);
    var tableBarMesh = new THREE.Mesh(tableBarGeom, tableMaterial);
    table.add(tableBarMesh);
    tableBarMesh.position.y= -height/3;

    //sub function to help with creating the leg geometries
    function tableLeg(height, depth){
      var leg = new THREE.Object3D();

      var topGeom = new THREE.RingGeometry(height/2-height/3, height/3, 32, 1, 0, Math.PI);
      var topMesh = new THREE.Mesh(topGeom, tableMaterial);
      topMesh.rotation.x = Math.PI;

      var bottomGeom = new THREE.RingGeometry(height/2-height/3, height/3, 32, 1, 0, Math.PI);
      var bottomMesh = new THREE.Mesh(bottomGeom, tableMaterial);
      bottomMesh.position.y = -height+height/3;

      leg.add(topMesh);
      leg.add(bottomMesh);

      return leg
    }

    var leftLeg = tableLeg(height, width);
    var rightLeg = tableLeg(height, width);

    leftLeg.position.z= depth/2;
    rightLeg.position.z= -depth/2;

    //add table legs
    table.add(leftLeg);
    table.add(rightLeg);

    //adding props
    var props = createProps(list);
    props.scale.set(.25,.25,.25);
    props.position.y = height/24;
    props.position.z = depth/6;
    props.position.x = width/5;
    props.rotation.y = Math.PI/2;
    table.add(props);

    //position table
    table.position.x = -roomDim.width/3;
    table.position.y = height-height/3;
    table.position.z = roomDim.depth/2;

    return table;
};
