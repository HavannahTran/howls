// =============================================================================
// Segment 5 - Room Decore
// =============================================================================

// pan: make pan hanging on wall
// two parameters: width (integer), height (integer)
// returns an Object3D
function pan(width, height){
    var pan = new THREE.Object3D();
    var panMaterial = new THREE.MeshPhongMaterial( { color: 0x808080,
                                                     side: THREE.DoubleSide,
                                                     shininess: 100});

    // createDish: make dish for the pan
    // no parameters
    // returns a mesh
    function createDish(){
        dishGeom = new THREE.CylinderGeometry( width/2+2, width/2, 3, 32, 32, true );
        dishMesh = new THREE.Mesh(dishGeom, panMaterial);

        return dishMesh;
    };

    // createDishBottom: make dish bottom for the pan
    // no parameters
    // returns an mesh
    function createDishBottom(){
        dishBGeom = new THREE.CylinderGeometry( width/2-0.1, width/2-0.1, 1, 32, 32 );
        dishBMesh = new THREE.Mesh(dishBGeom, panMaterial);

        return dishBMesh;
    };

    //createHandle: make the handle for the pan
    // no parameters
    // returns a mesh
    function createHandle(){
        handleGeom = new THREE.CylinderGeometry( 1, 1, height, 32 );
        handleMesh = new THREE.Mesh(handleGeom, panMaterial);

        return handleMesh;
    };

    //create pan segments
    var dish = createDish();
    var dishB = createDishBottom();
    var handle = createHandle();

    //position and rotate the pan segments
    dishB.position.y = -1;
    handle.position.x = height/2 + width/2;
    handle.rotation.z = Math.PI/2;

    //add pan segments to whole pan object
    pan.add(dish);
    pan.add(dishB);
    pan.add(handle);

    //position pan whole
    pan.rotation.z = Math.PI/2;
    pan.position.x = roomDim.width/2-2;
    pan.position.y = roomDim.height/3;
    pan.position.z = roomDim.depth;

    return pan;
};

// carpet: create carpet by hearth
// three parameters: height (integer), width (integer), texture (integer)
// adds to scene for texturing
function carpet(height, width, texture){
    var carpetGeom = new THREE.PlaneGeometry(width, height);
    var carpetMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side:THREE.DoubleSide, map:texture[0]});
    var carpetMesh = new THREE.Mesh(carpetGeom, carpetMaterial);

    scene.add(carpetMesh);

    carpetMesh.rotation.x = Math.PI/2;
    carpetMesh.position.y = 0.1;
    carpetMesh.position.z = roomDim.depth/2;
};

// box: box by back wall
//three paramters: height (integer), width (integer), depth (integer)
// returns an Object3D
function box(height, width, depth){
    var box = new THREE.Object3D();
    var boxGeom = new THREE.BoxGeometry( width, height, depth, 32, 32, true );
    var boxMaterial = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide });
    var boxMesh = new THREE.Mesh(boxGeom, boxMaterial);

    boxMesh.position.y = height/2;
    box.add(boxMesh);

    var cushionGeom = new THREE.CylinderGeometry(depth/2, depth/2, width, 32, 32, false, 0, Math.PI);
    var cushionMat = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide });
    var cushionMesh = new THREE.Mesh(cushionGeom, cushionMat);

    box.add(cushionMesh);
    cushionMesh.scale.set(.25,1,1);
    cushionMesh.rotation.z = Math.PI/2;
    cushionMesh.position.y = height;

    box.position.x;
    box.position.y = height/20;
    box.position.z = -roomDim.depth/2 + depth/2;

    return box;
};

// chair: create chair on the carpet
// one paramater: height (integer)
// returns an Object3D
function chair(height){
    var chair = new THREE.Object3D();
    var chairMaterial = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide });

    // createChairBack: create chair back
    // no paramaters
    // returns an Object3D
    function createChairBack(){
        //Object3D to add to the components of the chair back
        var chairBack = new THREE.Object3D();

        var backLGeom = new THREE.BoxGeometry(height/10, height/2, height/10);
        var backLMesh = new THREE.Mesh(backLGeom, chairMaterial);
        chairBack.add(backLMesh);

        var backRGeom = new THREE.BoxGeometry(height/12, height/2, height/12);
        var backRMesh = new THREE.Mesh(backRGeom, chairMaterial);
        backRMesh.position.x = height/2;
        chairBack.add(backRMesh);

        var backTallGeom = new THREE.BoxGeometry(height/2, height/6, height/12);
        var backTallMesh = new THREE.Mesh(backTallGeom, chairMaterial);
        backTallMesh.position.x = height/4;
        backTallMesh.position.y = height/8;
        chairBack.add(backTallMesh);

        var backShortGeom = new THREE.BoxGeometry(height/2, height/12, height/12);
        var backShortMesh = new THREE.Mesh(backShortGeom, chairMaterial);
        backShortMesh.position.x = height/4;
        backShortMesh.position.y = -height/12;
        chairBack.add(backShortMesh);

        return chairBack;
    };

    // createChairSeat: create chair seat
    // no paramaters
    // returns a mesh
    function createChairSeat(){
        var seatGeom = new THREE.BoxGeometry(height/2 + height/12, height/12, height/2);
        var seatMesh = new THREE.Mesh(seatGeom, chairMaterial);

        return seatMesh
    };

    // createChairLegs: create chair legs
    // no paramaters
    // returns an Object3D
    function createChairLegs(){
        //Object3D for elements of the chair legs
        var chairLegs = new THREE.Object3D();

        //legs
        var legBackLeftGeom = new THREE.CylinderGeometry(height/24, height/24, height/2, 32, 32);
        var legBackLeftMesh = new THREE.Mesh(legBackLeftGeom, chairMaterial);
        legBackLeftMesh.rotation.x = Math.PI/16;
        chairLegs.add(legBackLeftMesh);

        var legBackRightGeom = new THREE.CylinderGeometry(height/24, height/24, height/2, 32, 32);
        var legBackRightMesh = new THREE.Mesh(legBackRightGeom, chairMaterial);
        legBackRightMesh.position.x = height/2;
        legBackRightMesh.rotation.x = Math.PI/16;
        chairLegs.add(legBackRightMesh);

        var legFrontLeftGeom = new THREE.CylinderGeometry(height/24, height/24, height/2, 32, 32);
        var legFrontLeftMesh = new THREE.Mesh(legFrontLeftGeom, chairMaterial);
        legFrontLeftMesh.position.z = height/2;
        legFrontLeftMesh.rotation.x = -Math.PI/16;
        chairLegs.add(legFrontLeftMesh);

        var legFrontRightGeom = new THREE.CylinderGeometry(height/24, height/24, height/2, 32, 32);
        var legFrontRightMesh = new THREE.Mesh(legFrontRightGeom, chairMaterial);
        legFrontRightMesh.position.x = height/2;
        legFrontRightMesh.position.z = height/2;
        legFrontRightMesh.rotation.x = -Math.PI/16;
        chairLegs.add(legFrontRightMesh);

        //bars
        var backBarGeom = new THREE.CylinderGeometry(height/24, height/24, height/2, 32, 32);
        var backBarMesh = new THREE.Mesh(backBarGeom, chairMaterial);
        backBarMesh.position.x = height/4;
        backBarMesh.rotation.x = Math.PI/2;
        backBarMesh.rotation.z = Math.PI/2;
        chairLegs.add(backBarMesh);

        var frontBarGeom = new THREE.CylinderGeometry(height/24, height/24, height/2, 32, 32);
        var frontBarMesh = new THREE.Mesh(frontBarGeom, chairMaterial);
        frontBarMesh.position.x = height/4;
        frontBarMesh.position.z = height/2;
        frontBarMesh.rotation.z = Math.PI/2;
        chairLegs.add(frontBarMesh);

        var leftBarGeom = new THREE.CylinderGeometry(height/24, height/24, height/2, 32, 32);
        var leftBarMesh = new THREE.Mesh(leftBarGeom, chairMaterial);
        leftBarMesh.position.z = height/4;
        leftBarMesh.rotation.x = Math.PI/2;
        chairLegs.add(leftBarMesh);

        var rightBarGeom = new THREE.CylinderGeometry(height/24, height/24, height/2, 32, 32);
        var rightBarMesh = new THREE.Mesh(rightBarGeom, chairMaterial);
        rightBarMesh.position.x = height/2;
        rightBarMesh.position.z = height/4;
        rightBarMesh.rotation.x = Math.PI/2;
        chairLegs.add(rightBarMesh);

        return chairLegs;
    };

    //create chair segments
    var chairBack = createChairBack();
    var chairSeat = createChairSeat();
    var chairLegs = createChairLegs();

    //position and rotate chair segments
    chairBack.rotation.x = -Math.PI/12;

    chairSeat.position.x = height/4;
    chairSeat.position.y = -height/4;
    chairSeat.position.z = height/4;

    chairLegs.position.y = -height/2;

    //add chair segments to whole chair object
    chair.add(chairBack);
    chair.add(chairSeat);
    chair.add(chairLegs);

    //position chair object
    chair.position.x = roomDim.width/12;
    chair.position.y = height*0.75;
    chair.position.z = roomDim.depth/2;
    chair.rotation.y = Math.PI/2;

    return chair;
};

// createClothedChair: create clothed chair
// three parameters: width (integer), height (integer), depth (integer)
// returns an Object3D
function createClothedChair(width,height,depth){
    var table = new THREE.Object3D();
    var tableMat = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide });

    //top of the table
    var tableTopGeom = new THREE.BoxGeometry(width,height,depth);
    var tableMesh = new THREE.Mesh(tableTopGeom,tableMat);
    tableMesh.position.y = height/2 + depth;
    table.add(tableMesh);

    //adding the legs
    var tableLegGeom = new THREE.BoxGeometry(height,depth,height);
    var tableLegMesh = new THREE.Mesh(tableLegGeom,tableMat);
    tableLegMesh.position.y = depth/2;
    tableLegMesh.position.x = -height/2 + width/2
    var tableLegMesh2 = tableLegMesh.clone();
    tableLegMesh2.position.x = -width/2 + height/2;

    table.add(tableLegMesh2);
    table.add(tableLegMesh);

    var whiteGeom = new THREE.CylinderGeometry(depth/2, depth/2, width, 32, 32, false, 0, Math.PI);
    var whiteMat = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide });
    var whiteMesh = new THREE.Mesh(whiteGeom,whiteMat);
    whiteMesh.scale.set(2,1.25,1.25);
    whiteMesh.position.y = depth/2;
    whiteMesh.position.y = depth + height - 2;
    whiteMesh.rotation.z = Math.PI/2;
    table.add(whiteMesh);

    table.position.z = - roomDim.depth/2 + depth/2 + 5;
    table.position.x = -roomDim.width/3 + width/2 + .01;

    return table;
}
