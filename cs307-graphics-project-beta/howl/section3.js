// =============================================================================
// Segment 3 - Room Base
// =============================================================================

//room: creates room object with given room dimensions
//three parameters: width (integer), depth (integer), height (integer)
//returns an Object3D
function room(width, depth, height){
    //whole room object
    var wholeRoom = new THREE.Object3D();

    /* Floor * seg 1, seg 2, seg 3*/
    var floorMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, color: 0x726c58});
    //seg 1
    var floorGeom1 = new THREE.PlaneGeometry(2/3*width, depth);
    var floorMesh1 = new THREE.Mesh(floorGeom1, floorMaterial);
    floorMesh1.rotation.x = Math.PI/2;

    wholeRoom.add(floorMesh1);
    floorMesh1.position.x =-1/6*width;

    //seg 2
    var floorGeom2 = new THREE.PlaneGeometry(1/6*width, depth/2);
    var floorMesh2 = new THREE.Mesh(floorGeom2, floorMaterial);
    floorMesh2.rotation.x = Math.PI/2;

    wholeRoom.add(floorMesh2);
    floorMesh2.position.x =+1/4*width;
    floorMesh2.position.z =+depth/4;

    //seg 3
    var floorGeom3 = new THREE.PlaneGeometry(1/6*width, depth);
    var floorMesh3 = new THREE.Mesh(floorGeom3, floorMaterial);
    floorMesh3.rotation.x = Math.PI/2;

    wholeRoom.add(floorMesh3);
    floorMesh3.position.x =+(width/2 - width/12);


    /* Ceiling */
    var ceilingGeom = new THREE.PlaneGeometry(width, depth);
    var ceilingMesh = new THREE.Mesh(ceilingGeom, floorMaterial);

    ceilingMesh.rotation.x = Math.PI/2;

    wholeRoom.add(ceilingMesh);
    ceilingMesh.position.y = height;

    //expanding the size of the room
    ceilingMesh2 = ceilingMesh.clone();
    wholeRoom.add(ceilingMesh2);
    ceilingMesh2.position.y = height;
    ceilingMesh2.position.z = depth;

    /*adding more floor*/
    floorMeshExtend = ceilingMesh.clone();
    wholeRoom.add(floorMeshExtend);
    ceilingMesh2.position.y = 0;
    floorMeshExtend.position.z = depth;

     /* Left Wall */
    var lWallGeom = new THREE.PlaneGeometry(depth, height, 32 );
    var lWallMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, color: 0xd1c4a3});
    var lWallMesh = new THREE.Mesh(lWallGeom, lWallMaterial);

    lWallMesh.rotation.x = Math.PI/2;
    lWallMesh.rotation.y = Math.PI/2;
    lWallMesh.rotation.z = Math.PI/2;

    wholeRoom.add(lWallMesh);

    lWallMesh.position.x = -width/2;
    lWallMesh.position.y = height/2;

    //double the size of the room
    lWall2Mesh = lWallMesh.clone();

    wholeRoom.add(lWall2Mesh);

    lWall2Mesh.position.x = -width/2;
    lWall2Mesh.position.y = height/2;
    lWall2Mesh.position.z = depth;


    /* Right Wall */
    var rWallMesh = new THREE.Mesh(lWallGeom, lWallMaterial);

    rWallMesh.rotation.x = Math.PI/2;
    rWallMesh.rotation.y = Math.PI/2;
    rWallMesh.rotation.z = Math.PI/2;

    wholeRoom.add(rWallMesh);
    rWallMesh.position.x = width/2;
    rWallMesh.position.y = height/2;

    //double the size of the room
    rWall2Mesh = rWallMesh.clone();

    wholeRoom.add(rWall2Mesh);

    rWall2Mesh.position.x = width/2;
    rWall2Mesh.position.y = height/2;
    rWall2Mesh.position.z = depth;

    /* Back Wall - Divided into 7 segments to accomodate Window and Door */

    //seg1
    var seg1Geom = new THREE.PlaneGeometry(width/4, height, 32 );
    var seg1Material = new THREE.MeshPhongMaterial({color: 0xd1c4a3, side: THREE.DoubleSide});
    var seg1Mesh = new THREE.Mesh(seg1Geom, seg1Material);

    wholeRoom.add(seg1Mesh)
    seg1Mesh.position.x = -width/2 + width/8;
    seg1Mesh.position.y = height/2;
    seg1Mesh.position.z = -depth/2;

    //seg2
    var seg2Geom = new THREE.PlaneGeometry(width/4, height/3, 32 );
    var seg2Material = new THREE.MeshPhongMaterial({color: 0xd1c4a3, side: THREE.DoubleSide});
    var seg2Mesh = new THREE.Mesh(seg2Geom, seg2Material);

    wholeRoom.add(seg2Mesh)
    seg2Mesh.position.x = -width/8;
    seg2Mesh.position.y = height/2 + height/3;
    seg2Mesh.position.z = -depth/2;

    //needed to double the size of the room

    //seg3 - Window Object (Box Geometry)
    function makeWindow(height,width,depth, textures){
        var winGeom = new THREE.Object3D();
        var winMat = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide });

        var windowGeom = new THREE.BoxGeometry(width/4,height/3,depth/4);
        var materialArray = [];

        var side = [THREE.BackSide, THREE.BackSide, THREE.BackSide, THREE.BackSide, THREE.BackSide, THREE.FrontSide];

        for(var i = 0; i < 6; i++) {
          materialArray.push(new THREE.MeshPhongMaterial({
                                 color: 0xd1c4a3,
                                 side: side[i],
          }));
        };

        var windowMaterial = new THREE.MeshFaceMaterial(materialArray);
        var windowMesh = new THREE.Mesh(windowGeom, windowMaterial);

        var barThickness = height/20;
        var barWidth = width/4;
        var barHeight = height/3;

        //window cross
        var barHGeom = new THREE.PlaneGeometry(barWidth, barThickness);
        var barVGeom = new THREE.PlaneGeometry(barThickness, barHeight);

        var barTopMesh = new THREE.Mesh(barHGeom, winMat);
        var barBotMesh = new THREE.Mesh(barHGeom, winMat);
        var barLeftMesh = new THREE.Mesh(barVGeom, winMat);
        var barRightMesh = new THREE.Mesh(barVGeom, winMat);
        var barHMesh = new THREE.Mesh(barHGeom, winMat);
        var barVMesh = new THREE.Mesh(barVGeom, winMat);
        winGeom.add(windowMesh);

        winGeom.add(barTopMesh);
        barTopMesh.position.y = barHeight/2 - barThickness/2;
        barTopMesh.position.z = -depth/8;

        winGeom.add(barBotMesh);
        barBotMesh.position.y = - barHeight/2 + barThickness/2;
        barBotMesh.position.z = -depth/8;

        winGeom.add(barLeftMesh);
        barLeftMesh.position.x = - barWidth/2 + barThickness/2;
        barLeftMesh.position.z = -depth/8;

        winGeom.add(barRightMesh);
        barRightMesh.position.x = barWidth/2 - barThickness/2;
        barRightMesh.position.z = -depth/8;

        winGeom.add(barHMesh);
        barHMesh.position.z = -depth/8;

        winGeom.add(barVMesh);
        barVMesh.position.z = -depth/8;

        return winGeom;
        };

    var win = makeWindow(height,width,depth);

    wholeRoom.add(win);
    win.position.x= -width/8;
    win.position.y= height/2;
    win.position.z= -(depth/2 + depth/8) ;

    //seg4
    var seg4Geom = new THREE.PlaneGeometry(width/4, height/3, 32 );
    var seg4Material = new THREE.MeshPhongMaterial({color: 0xd1c4a3, side: THREE.DoubleSide});
    var seg4Mesh = new THREE.Mesh(seg4Geom, seg4Material);

    wholeRoom.add(seg4Mesh)
    seg4Mesh.position.x = -width/8;
    seg4Mesh.position.y = height/2 - height/3;
    seg4Mesh.position.z = -depth/2;

    //seg5
    var seg5Geom = new THREE.PlaneGeometry(width/6, height, 32 );
    var seg5Material = new THREE.MeshPhongMaterial({color: 0xd1c4a3, side: THREE.DoubleSide});
    var seg5Mesh = new THREE.Mesh(seg5Geom, seg5Material);

    wholeRoom.add(seg5Mesh)
    seg5Mesh.position.x = width/12;
    seg5Mesh.position.y = height/2;
    seg5Mesh.position.z = -depth/2;

    //seg6 - Bezier Curve above doorway
    var sqW = width/18;
    var sqH = height/4;
    var topToBottom = [
        [ [0,0,0],  [sqW,0,0],  [sqW*2,0,0],  [sqW*3,0, 0] ],
        [ [0,-sqH,0], [sqW,-sqH,0],  [sqW*2,-sqH,0],  [sqW*3, -sqH, 0] ],
        [ [0,-sqH*2,0], [sqW,-sqH*2,0],  [sqW*2,-sqH*2,0],  [sqW*3, -sqH*2, 0] ],
        [ [0,-sqH*3,0], [sqW,-sqH*3+sqH/2,0], [sqW*2,-sqH*3+sqH/2,0], [sqW*3, -sqH*3, 0] ],
    ];

    var seg6Geom = new THREE.BezierSurfaceGeometry( topToBottom.reverse(), 10, 10 );
    var seg6Material  = new THREE.MeshPhongMaterial( { color: 0xd1c4a3, side: THREE.DoubleSide } )
    var seg6Mesh = new THREE.Mesh( seg6Geom, seg6Material );

    wholeRoom.add(seg6Mesh);
    seg6Mesh.position.x = 1/6*width;
    seg6Mesh.position.y = 1/4*height + (2*height*(3/8));
    seg6Mesh.position.z = -1/4*width;

    //seg7
    var seg7Geom = new THREE.PlaneGeometry(width/6, height, 32 );
    var seg7Material = new THREE.MeshPhongMaterial({color: 0xd1c4a3, side: THREE.DoubleSide});
    var seg7Mesh = new THREE.Mesh(seg7Geom, seg7Material);

    wholeRoom.add(seg7Mesh)
    seg7Mesh.position.x = width/2 - width/12;
    seg7Mesh.position.y = height/2;
    seg7Mesh.position.z = -depth/2;

    return wholeRoom;
};

//door: make the doorway including the arc element of the door and texture
//four parameters: width (integer), depth (integer), height (integer), textures (image file)
//returns an Object3D
function door(width, depth, height, textures){
    var wholeDoor = new THREE.Object3D();

    //door arch (Bezier)
    var sqW = width/18;
    var sqH = height/4;
    var drop = height/12;

    var doorDepthSeg = 1/3*depth*1/2;
    var topToBottom = [
        [ [0, 0 - 3*drop ,0],              [1*sqW, sqH/2 - 3*drop ,0],              [2*sqW, sqH/2 - 3*drop ,0],               [3*sqW, 0 - 3*drop, 0] ],
        [ [0, 0 - 2*drop ,1*doorDepthSeg], [1*sqW, sqH/2 - 2*drop ,1*doorDepthSeg], [2*sqW, sqH/2 - 2*drop ,1*doorDepthSeg],  [3*sqW, 0 - 2*drop, 1*doorDepthSeg] ],
        [ [0, 0 - 1*drop ,2*doorDepthSeg], [1*sqW, sqH/2 - 1*drop ,2*doorDepthSeg], [2*sqW, sqH/2 - 1*drop , 2*doorDepthSeg], [3*sqW, 0 - 1*drop, 2*doorDepthSeg] ],
        [ [0, 0 - 0*drop ,3*doorDepthSeg], [1*sqW, sqH/2 - 0*drop ,3*doorDepthSeg], [2*sqW, sqH/2 - 0*drop ,3*doorDepthSeg],  [3*sqW, 0 - 0*drop, 3*doorDepthSeg] ],
    ];

    var archGeom = new THREE.BezierSurfaceGeometry( topToBottom.reverse(), 10, 10 );
    var archMaterial = new THREE.MeshPhongMaterial( { color: 0xd1c4a3, side: THREE.DoubleSide } );
    var archMesh = new THREE.Mesh(archGeom, archMaterial);

    scene.add(archMesh);
    archMesh.position.x = 1/6*width;
    archMesh.position.y = 1/4*height;
    archMesh.position.z = -depth;


    //door decoration
    var topToBottom1 = [
        [ [0,0,0],  [sqW,0,0],  [sqW*2,0,0],  [sqW*3,0, 0] ],
        [ [0,-sqH,0], [sqW,-sqH,0],  [sqW*2,-sqH,0],  [sqW*3, -sqH, 0] ],
        [ [0,-sqH*2,0], [sqW,-sqH*2,0],  [sqW*2,-sqH*2,0],  [sqW*3, -sqH*2, 0] ],
        [ [0,-sqH*3,0], [sqW,-sqH*3+sqH/2,0], [sqW*2,-sqH*3+sqH/2,0], [sqW*3, -sqH*3, 0] ],
    ];

    var wArchGeom = new THREE.BezierSurfaceGeometry( topToBottom1.reverse(), 10, 10 );
    var wArchMaterial = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide } );
    var wArchMesh = new THREE.Mesh(wArchGeom, wArchMaterial);

    wArchMesh.position.x = 1/6*width;
    wArchMesh.position.y = 1/4*height + (2*height*(3/8)) - 35;
    wArchMesh.position.z = -depth;
    scene.add(wArchMesh);

    //door knob
    var knob = new THREE.Object3D();

    var knobGeom = new THREE.CylinderGeometry(sqW/16,sqW/16, sqH/8, 32 );
    var knobMat = new THREE.MeshPhongMaterial( { color:0x3d3d3d, side: THREE.DoubleSide } );
    var knobMesh = new THREE.Mesh(knobGeom, knobMat);

    knobMesh.rotation.x = Math.PI/2;
    knobMesh.rotation.z = Math.PI/2;

    knobMesh.position.x = 1/5*width;
    knobMesh.position.y = 1/80*height - 20 ;
    knobMesh.position.z = -depth + 1;

    scene.add(knobMesh);
    
    // door
    var topToBottom2 = [
        [ [0,-sqH,0],[sqW,-sqH,0], [sqW*2,-sqH,0], [sqW*3,-sqH, 0] ],
        [ [0,-sqH,0],   [sqW,-sqH,0],     [sqW*2,-sqH,0],    [sqW*3, -sqH, 0] ],
        [ [0,-sqH*2,0], [sqW,-sqH*2,0],   [sqW*2,-sqH*2,0],  [sqW*3, -sqH*2, 0] ],
        [[0,-sqH*2,0], [sqW,-sqH*2,0],   [sqW*2,-sqH*2,0],  [sqW*3, -sqH*2, 0]]
    ];

    var doorGeom = new THREE.BezierSurfaceGeometry( topToBottom2.reverse(), 10, 10 );
    var doorMaterial  = new THREE.MeshPhongMaterial( { color: 0xd1c4a3, side: THREE.DoubleSide, map: textures[3] } )
    var doorMesh = new THREE.Mesh( doorGeom, doorMaterial );

    //brown window mesh
    var doorMaterialWindow  = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide } )
    var doorMeshWindow = new THREE.Mesh(doorGeom, doorMaterialWindow);

    scene.add(doorMeshWindow);
    doorMeshWindow.position.x = 1/6*width;
    doorMeshWindow.position.y = 1/4*height + 1;
    doorMeshWindow.position.z = -depth - 10;


    var windowBarGeom = new THREE.PlaneGeometry(2,10);
    var windowBarMesh = new THREE.Mesh(windowBarGeom, doorMaterialWindow);

    windowBarMesh.position.x = 1/3.5*width;
    windowBarMesh.position.y = 1/20*height;
    windowBarMesh.position.z = -depth;

    var windowBarMesh2 = windowBarMesh.clone();
    windowBarMesh2.position.x = 1/3.5*width - 5;

    var windowBarMesh3 = windowBarMesh2.clone();
    windowBarMesh3.position.x = 1/3.5*width - 10;

    var windowBarMesh4 = windowBarMesh3.clone();
    windowBarMesh4.position.x = 1/3.5*width - 15;

    var windowBarMesh5 = windowBarMesh4.clone();
    windowBarMesh5.rotation.z = Math.PI/2;
    windowBarMesh5.position.y =+5;
    windowBarMesh5.scale.set(1,10,1);

    scene.add(windowBarMesh5);
    scene.add(windowBarMesh4);
    scene.add(windowBarMesh3);
    scene.add(windowBarMesh2);
    scene.add(windowBarMesh);

    scene.add(doorMesh);
    doorMesh.position.x = 1/6*width;
    doorMesh.position.y = 1/4*height;
    doorMesh.position.z = -depth;

    //helper function to make triangles on the sides
    function makeTriangle(A1, A2, A3, B1, B2, B3, C1, C2, C3){
        var geom = new THREE.Geometry();
        var v1 = new THREE.Vector3(A1,A2,A3);
        var v2 = new THREE.Vector3(B1,B2,B3);
        var v3 = new THREE.Vector3(C1,C2,C3);

        geom.vertices.push(v1);
        geom.vertices.push(v2);
        geom.vertices.push(v3);

        geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geom.computeFaceNormals();

        var geomMaterial  = new THREE.MeshPhongMaterial( { color: 0xd1c4a3, side: THREE.DoubleSide } )

        var mesh = new THREE.Mesh( geom, geomMaterial);
        return mesh;
    }

    var lTriangle = makeTriangle(0,depth/3,0,0,0,0,depth/2,0,0);
    lTriangle.rotation.y = Math.PI/2;

    scene.add(lTriangle);

    lTriangle.position.x =+width/6;
    lTriangle.position.z =-depth/2;

    var rTriangle = lTriangle.clone();

    scene.add(rTriangle);

    rTriangle.position.x =+width/3;
    rTriangle.position.z =-depth/2;
}

//steps: make the steps for the room in the doorframe
//three parameters: width (integer), height (integer), depth (integer)
//returns an Object3D
function steps(width,height,depth){
    var wholeSteps = new THREE.Object3D;

    var genMaterial  = new THREE.MeshPhongMaterial( { color: 0xd1c4a3, side: THREE.DoubleSide } );

    //bottom
    var bottomGeom = new THREE.PlaneGeometry(width/6,depth);
    var bottomMesh = new THREE.Mesh(bottomGeom, genMaterial);

    bottomMesh.rotation.x = Math.PI/2;
    wholeSteps.add(bottomMesh);

    bottomMesh.position.x =+1/4*width;
    bottomMesh.position.z =-depth/2;
    bottomMesh.position.y=-height/4;

    //left wall
     var lWallGeom = new THREE.PlaneGeometry(depth,height/4);
     var lWallMesh = new THREE.Mesh(lWallGeom, genMaterial);

     lWallMesh.rotation.y = Math.PI/2;
     wholeSteps.add(lWallMesh);

     lWallMesh.position.x =+1/4*width - width/12;
     lWallMesh.position.z = -depth/2;
     lWallMesh.position.y=-height/8;

     //right wall
     var rWallGeom = new THREE.PlaneGeometry(depth,height/4);
     var rWallMesh = new THREE.Mesh(lWallGeom, genMaterial);

     rWallMesh.rotation.y = Math.PI/2;
     wholeSteps.add(rWallMesh);

     rWallMesh.position.x =+1/4*width + width/6 - width/12;
     rWallMesh.position.z = -depth/2;
     rWallMesh.position.y=-height/8;

     //back
     var backGeom = new THREE.PlaneGeometry(width/6,height/4);
     var backMesh = new THREE.Mesh(backGeom, genMaterial);

     wholeSteps.add(backMesh);

     backMesh.position.x =+1/4*width;
     backMesh.position.y=-height/8;

    // makeStairs: create stairway
    // two parameters: height (int), depth (int)
    // returns an Object3D
     function makeStairs(height, depth){
        var steps = new THREE.Object3D();
        var stepMaterial = new THREE.MeshPhongMaterial( {color: 0xd1c4a3} );

        for (i = 0; i < 8; i++){
            var newHeight = height/4 - (i*height/32);
            var stepGeom = new THREE.BoxGeometry(-.01+width/6, newHeight, 3/32*depth);
            var stepMesh = new THREE.Mesh( stepGeom, stepMaterial );
            steps.add(stepMesh);
            stepMesh.position.y=+newHeight/2;
            stepMesh.position.z =+i*3/32*depth;
        }
        steps.rotation.y = Math.PI;
        wholeSteps.add(steps);
        steps.position.x =+(width/6 + width/12);
        steps.position.y =-(-.01+height/4);
    }
    makeStairs(roomDim.height, roomDim.depth);
    return wholeSteps;
}

/* Back Wall Decorations */

// createRailing: create stairway Railing
// no parameters
// returns an Object3D
function createRailing(){
    var bothRails = new THREE.Object3D();

    //createOneRailing: make one vertical bar for the railing
    //four parameters: height (integer), width (integer), depth (integer), longWidth (integer)
    function createOneRailing(height, width, depth, longWidth){
        //make the parent object
        var Railing = new THREE.Object3D();
        var RailMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, side: THREE.DoubleSide });

        //createTop: make top railing
        //two parameters: height (integer), width (integer)
        //returns an Object3D
        function createTop (height,width){
            var top = new THREE.Object3D();

            //railing
            var columnGeom = new THREE.CylinderGeometry(width/40, width/40, height, 32, 32, false);
            var columnMesh = new THREE.Mesh(columnGeom, RailMaterial);

            //make the horizontal rails
            for (var i = 0; i < 10; i++){
                var clone = columnMesh.clone();
                top.add(clone);
                clone.position.x = i*width/40 + i*3/32*depth;
            }

            //top
            var columnGeom2 = new THREE.CylinderGeometry(width/40, width/40, height + width, 32, 32, false);
            var columnMesh2 = new THREE.Mesh(columnGeom2, RailMaterial);

            columnMesh2.rotation.z = Math.PI/2;
            columnMesh2.position.y = height/2;
            columnMesh2.position.x = (height + width)/2;

            top.add(columnMesh2);

            return top;
        }

        //createSide: make side railing
        //three parameters: height (integer), width (integer), depth (integer)
        // returns an Object3D
        function createSide(height,width, depth){
            //create the parent object
            var sideRail = new THREE.Object3D();

            //make all the vertical poles
            for (i = 0; i < 10; i++){
                var newHeight = 4*(height/4 - (i*height/32));
                var newColGeom = new THREE.CylinderGeometry(width/40, width/40, height + width/20, 32, 32, false);
                var newColMesh = new THREE.Mesh(newColGeom, RailMaterial);

                newColMesh.position.y=+newHeight/2;
                newColMesh.position.z =+(i*width/40 + i*3/32*depth);
                sideRail.add(newColMesh);
            }

            //create the top of the bottome rail
            var colGeomTop = new THREE.CylinderGeometry(width/40, width/40, height + width, 32, 32, false);
            var colGeomMesh = new THREE.Mesh(colGeomTop,RailMaterial);
            colGeomMesh.position.z = (height + width)/2.25;
            colGeomMesh.rotation.x = -Math.PI/2.75;
            colGeomMesh.position.y = height/1.25;

            sideRail.add(colGeomMesh);
            return sideRail;
        }

        var top = createTop(height, width);
        Railing.add(top);

        var side = createSide(height, width, depth);
        side.rotation.y = Math.PI/2;
        side.position.y = -.75*depth;
        Railing.add(side);

        return Railing;
    }

    var railing = createOneRailing(30,20,40);

    railing.rotation.y = Math.PI/2;
    railing.position.x = roomDim.width/6;
    railing.position.y = roomDim.height/20;
    railing.position.z = -roomDim.depth/14;

    var railing2 = railing.clone();
    railing2.position.x = 2*roomDim.width/6;

    bothRails.add(railing);
    bothRails.add(railing2);

    return bothRails;
};

// createSpinner: create stairway Railing
// two parameters: height (integer), width (integer)
// returns an Object3D
//there are a number of helper functions inside createSpinner
function createSpinner(height, width){
    var wholeSpinner = new THREE.Object3D;

    var SpinnerNotch = new THREE.Object3D();
    var Spinner = new THREE.Object3D();
    var spinMaterial = new THREE.MeshPhongMaterial( { color: 0xF6F6F6, shininess: 1000, side: THREE.DoubleSide });

    // createSpin: create the pan bottom
    // two parameters: height (integer), width (integer)
    // returns mesh
    function createSpin(width,height){
        var spinGeom = new THREE.CylinderGeometry(width, width, height, 32, 32, false );
        var spinMesh = new THREE.Mesh(spinGeom, spinMaterial);
        return spinMesh;
    }

    // createSpinExtend: create the top of the pan
    // two parameters: width (integer), height (integer)
    // returns a mesh
    function createSpinExtend(width,height){
        var spinExtendGeom = new THREE.ConeBufferGeometry(width, height, 32, 32, false );
        var spinExtendMesh = new THREE.Mesh(spinExtendGeom, spinMaterial);
        return spinExtendMesh;
    }

    // createTop: create the notch on top of the pan
    // two parameters: width (integer), height (integer)
    // returns a mesh
    function createTop(width,height){
        var topGeom = new THREE.CylinderGeometry(width/8, width/8, height/5, 32, 32, false );
        var topMaterial = new THREE.MeshPhongMaterial( { color: 0xD2D2D2, side: THREE.DoubleSide });
        var topMesh = new THREE.Mesh(topGeom, topMaterial);
        return topMesh;
    }

    // createNotch: create the top notch that holds the spinner to the wall
    // two parameters: height (integer), width (integer)
    // returns an Object3D
    function createNotch(height,width){
        var notch = new THREE.Object3D();
        notchGeom = new THREE.CylinderGeometry( width/5, width/5, width, 32, 32, false );
        notchMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, side: THREE.DoubleSide });
        notchMesh = new THREE.Mesh(notchGeom, notchMaterial);

        sphereGeom = new THREE.SphereGeometry(width/3, 32, 32);
        sphereMesh = new THREE.Mesh(sphereGeom, notchMaterial);

        sphereMesh.position.y = width/2;

        notch.add(notchMesh);
        notch.add(sphereMesh);

        return notch;
    }

    // createHand: create the handle
    // two parameters: height (integer), width (integer)
    // returns a mesh
    function createHand(height,width){
        handGeom = new THREE.CylinderGeometry( width/8, width/8, 2.5*width, 32, 32, false );
        handMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, side: THREE.DoubleSide });
        handMesh = new THREE.Mesh(handGeom, handMaterial);

        return handMesh;
    }

    // create the spinner objects
    var spin = createSpin(width,height);
    var spinExtend = createSpinExtend(width,height);
    var notch = createNotch(width,height);
    var top = createTop(width,height);
    var hand = createHand(height,width);

    // position objects
    spinExtend.position.y = height;
    notch.position.z = -5/4*width;
    notch.rotation.x = Math.PI/2;

    top.position.y = 1.5*height;

    hand.position.z = 5/4*width;
    hand.rotation.x = Math.PI/2;

    //add the spinner components to the spinner
    SpinnerNotch.add(spin);
    SpinnerNotch.add(spinExtend);
    SpinnerNotch.add(hand);
    SpinnerNotch.add(top);

    //rotate the spinner's handle
    SpinnerNotch.rotation.y = -Math.PI/4;

    //add the notch to the top
    Spinner.add(notch);
    Spinner.add(SpinnerNotch);

    Spinner.position.z = - roomDim.depth/2;
    Spinner.position.y = roomDim.height/3;
    Spinner.position.x = roomDim.width/2.75;
    Spinner.rotation.x = Math.PI/2;

    return Spinner;
};
