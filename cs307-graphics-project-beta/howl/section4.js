// =============================================================================
// Segment 4 - Hearth
// =============================================================================

// hearthArch: creates the hearth Arch
// three parameters: width (integer), depth (integer), height (integer)
//returns an Object3D
function hearthArch(width, depth, height){
    var arch = new THREE.Object3D();

    //make half the curve
    var doorDepthSeg = 1/3*depth*1/2;
    var topToBottom = [
        [ [0,100,-100],[50,100,-100],[75,100,-100],[100, 100,-100]],
        [ [0,70,-20], [21,70,-20], [42,70,-20],  [100,70,-20] ],
        [ [0,25,0], [20,25,0], [40,25,0], [70,25,0]],
        [ [0,0,0], [20,0,0], [40,0,0],[60,0,0]],
    ];

    var archGeom = new THREE.BezierSurfaceGeometry( topToBottom.reverse(), 10, 10 );
    var archMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.DoubleSide} );
    var archMesh = new THREE.Mesh(archGeom, archMaterial);

    var archMesh2 = archMesh.clone();
    archMesh2.scale.set(1,1,-1);
    archMesh2.position.z = -200;
    arch.add(archMesh);
    arch.add(archMesh2);

    arch.scale.set(-.5,1,.3);

    return arch;
}

//createFireProps: creates the hearth Arch
//one parameter: scaleObj (integer)
// returns an Object3D
function createFireProps(scaleObj){

    var allProps = new THREE.Object3D();

    function createPot(scaleFactor){
        var pot = new THREE.Object3D();

        //pot component; easier to create a composite object and scale up
        //with the bezier curve as the handle
        var potMat = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide });
        var potGeom = new THREE.SphereGeometry(10, 32, 32, 0, Math.PI * 2, 0, 2/3*Math.PI);
        var potMesh = new THREE.Mesh(potGeom,potMat);
        potMesh.rotation.z = Math.PI;
        potMesh.position.y = 10;

        //handle component, appropriated from some bezier curve work in class
        var connectorCP = [ [-4,3,0],
                    [-1,-1,0],
                    [1,-1,0],
                    [4,3,0] ];

        function addCurve(cp,color) {
            var geom = TW.createBezierCurve(cp,20);
            var mesh = new THREE.Line( geom,
                                       new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ));
            mesh.scale.set(2,3,2);
            mesh.rotation.x = Math.PI;
            mesh.position.y = 10*2.25;
            pot.add(mesh);
        }

        addCurve(connectorCP,0x000000);

        pot.add(potMesh);
        pot.scale.set(scaleFactor,scaleFactor,scaleFactor);
        return pot;
    }

    //createStand: creates the hearth Arch
    //one parameter: width (integer), height (integer)
    // returns an Object3D
    function createStand(width,height) {
          //create the object
            var stand = new THREE.Object3D();

            var standMat = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide });
            var vertGeom = new THREE.CylinderGeometry(width, width, height, 32, 32);
            var vertMesh = new THREE.Mesh(vertGeom,standMat);
            vertMesh.position.y = height/2;

            var horizMesh = vertMesh.clone();
            horizMesh.scale.set(1,.5,1);
            horizMesh.position.y = height/4;
            horizMesh.rotation.z = Math.PI/2;
            horizMesh.position.y = height/1.25;
            horizMesh.position.x = -height/8;

            stand.add(vertMesh);
            stand.add(horizMesh);

            return stand;
    }

    //this function was taken from another js file
    function createLog(radius, length){
          var logGeom = new THREE.CylinderGeometry( radius, radius, length, 32);
          var logMaterial = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide });
          var logMesh = new THREE.Mesh(logGeom, logMaterial);
          logMesh.rotation.z = Math.PI/2;
          return logMesh;
    }

    //adding and positioning the pot
    var w = 3;
    var h = 90;

    var potObj = createPot(1.5);
    potObj.position.y = h*.45;
    potObj.position.x = -h*.25;
    potObj.rotation.y = Math.PI/2;

    var standObj = createStand(w,h);

    //adding the log
    var lw = 10;
    var lh = 50;
    var logObj = createLog(lw,lh);
    logObj.position.y = lw;
    logObj.position.z = lh*.5;
    logObj.rotation.y = Math.PI/2;
    allProps.add(logObj);

    allProps.add(potObj);
    allProps.add(standObj);
    allProps.scale.set(scaleObj, scaleObj, scaleObj);

    allProps.scale.set(scaleObj, scaleObj, scaleObj);
    return allProps;
}

//makeHearthBase: make the hearth base
//parameters: height (integer), width (integer)
// returns an Object3D
function makeHearthBase(height, width){
        //make the parent object
        var hearthBase = new THREE.Object3D();

        var baseMaterial = new THREE.MeshPhongMaterial({ color: 0xF6F6F6, side: THREE.DoubleSide });

        //make the half circle base
        var roundGeom = new THREE.CylinderGeometry(width, width, height, 32, 32, false, 0, -Math.PI );
        var roundMesh = new THREE.Mesh(roundGeom, baseMaterial);

        roundMesh.scale.set (1.5,1,1);

        var blockGeom = new THREE.BoxGeometry(width,height,2*width);
        var blockMesh = new THREE.Mesh(blockGeom, baseMaterial);
        blockMesh.position.x = width/2;

        //make the props
        var potObjects = createFireProps(.5);
        potObjects.position.y = height/2;
        potObjects.position.z = -width/4;
        hearthBase.add(potObjects);


        var arch = hearthArch(200, 200, 200);
        arch.position.y = .5*height;
        arch.position.x = width;
        arch.position.z = width;
        hearthBase.add(arch);

        hearthBase.add(blockMesh);
        hearthBase.add(roundMesh);

        hearthBase.position.x = roomDim.width/2.5;
        hearthBase.position.y = height/2 +.01;
        hearthBase.position.z = roomDim.depth/3;

        hearthBase.scale.set(.7,.7,.7);
        return hearthBase;
}

// logBox: Creates Log Box besides hearth
// three parameters: width (integer), height (integer), depth (integer)
// returns an Object3D
function logBox(width, height, depth){
    //create the parent object
    var logBox = new THREE.Object3D();
    var logMaterial = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide });

    //createBox: create the outside Box
    //there parameters: width (integer), height (integer), depth (integer)
    // returns an Object3D
    function createBox(width, height, depth){

      //create the parent object
      var boxGeom = new THREE.BoxGeometry(width, height, depth);
      var materialArray = [];

      var side = [THREE.DoubleSide, THREE.DoubleSide, THREE.BackSide, THREE.DoubleSide, THREE.DoubleSide, THREE.DoubleSide];

      for(var i = 0; i < 6; i++) {
        materialArray.push(new THREE.MeshPhongMaterial({
                           color: 0x958351,
                           side: side[i],
          }));
        };
      var boxMaterial = new THREE.MeshFaceMaterial(materialArray);
      var boxMesh = new THREE.Mesh(boxGeom, boxMaterial);

      return boxMesh;
    };

    //createLog: creates individual logs
    //two parameters: radius, length
    // returns a mesh
    function createLog(radius, length){
          var logGeom = new THREE.CylinderGeometry( radius, radius, length, 32);
          var logMaterial = new THREE.MeshPhongMaterial( { color: 0x654321, side: THREE.DoubleSide });
          var logMesh = new THREE.Mesh(logGeom, logMaterial);
          logMesh.rotation.z = Math.PI/2;
          return logMesh;
    }

    //create box and logs
    var box = createBox(width, height, depth);
    var log1 = createLog(width/6, (4/5)*width);
    var log2 = createLog(width/6, (4/5)*width);
    var log3 = createLog(width/6, (4/5)*width);
    var log4 = createLog(width/6, (4/5)*width);
    var log5 = createLog(width/8, (4/5)*width);
    var log6 = createLog(width/8, (4/5)*width);

    //position logs
    log1.position.set(0, height/4, width/6);
    log2.position.set(0, height/4, -width/6);
    log3.position.set(0, height/2, width/6);
    log4.position.set(0, height/1.5, -width/12);
    log4.rotation.y = Math.PI/8;
    log4.rotation.z = Math.PI/2.5;
    log5.position.set(width/2-width/6, 0, depth/2 + width/6);
    log5.rotation.x = Math.PI/2;
    log5.rotation.y = Math.PI/2;
    log6.position.set(0, 0, depth/2 + width/6);
    log6.rotation.x = Math.PI/2;
    log6.rotation.y = -Math.PI/1.75;
    log6.rotation.z = Math.PI/1.75;

    //add box and logs to logBox object
    logBox.add(box);
    logBox.add(log1);
    logBox.add(log2);
    logBox.add(log3);
    logBox.add(log4);
    logBox.add(log5);
    logBox.add(log6);

    logBox.position.set(roomDim.width/2 - width/2 - 1, height/2, roomDim.depth/1.25);
    return logBox;
};
