// =============================================================================
// Segment 1 - Ceiling
// =============================================================================

//chandelier: create the chandelier object
//one parameter: width (integer)
//returns an Object3D
function chandelier(width){
    var chandelier = new THREE.Object3D();
    var chandelierMaterial = new THREE.MeshPhongMaterial( { color: 0x726c58,
                                                            side: THREE.DoubleSide,
                                                            shininess: 100});

    //base chandelier ring
    var ringGeom = new THREE.TorusGeometry( width/2, width/12, 3, 100 );
    var ringMesh = new THREE.Mesh(ringGeom, chandelierMaterial);
    ringMesh.castShadow = true;
    ringMesh.receiveShadow = true;
    chandelier.add(ringMesh);

    //chandelier top
    var topGeom = new THREE.CylinderGeometry(width/5, width/5, width/16, 32, 32, false);
    var topMesh = new THREE.Mesh(topGeom, chandelierMaterial);
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    chandelier.add(topMesh);

    //candle: create chandelier candle holders
    //one parameter: width (integer)
    //returns a mesh
    function candle(width){
        var candleGeom = new THREE.CylinderGeometry(width/14, width/14, width/10, 32, 32, false);
        var candleMesh = new THREE.Mesh(candleGeom, chandelierMaterial);
        candleMesh.castShadow = true;
        candleMesh.receiveShadow = true;
        return candleMesh;
    }

    //string: create chandelier string
    //one parameter: height (integer)
    //returns a mesh
    function string(height){
        var stringGeom = new THREE.CylinderGeometry(0.5, 0.5, height, 32, 32);
        var stringMesh = new THREE.Mesh(stringGeom, chandelierMaterial);
        stringMesh.castShadow = true;
        stringMesh.receiveShadow = true;
        return stringMesh;
    }

    //add the various candles
    var candle1 = candle(width);
    var candle2 = candle(width);
    var candle3 = candle(width);
    var candle4 = candle(width);
    var candle5 = candle(width);
    var candle6 = candle(width);
    var candle7 = candle(width);
    var candle8 = candle(width);

    var string1 = string(width);
    var string2 = string(width);
    var string3 = string(width);
    var string4 = string(width);

    chandelier.add(candle1);
    chandelier.add(candle2);
    chandelier.add(candle3);
    chandelier.add(candle4);
    chandelier.add(candle5);
    chandelier.add(candle6);
    chandelier.add(candle7);
    chandelier.add(candle8);

    chandelier.add(string1);
    chandelier.add(string2);
    chandelier.add(string3);
    chandelier.add(string4);

    //Position chandelier elements
    ringMesh.rotation.x = Math.PI/2;
    topMesh.position.y = width-width/16;

    //cross
    candle1.position.set(width/2, width/16, 0);
    candle2.position.set(-width/2, width/16, 0);
    candle3.position.set(0, width/16, width/2);
    candle4.position.set(0, width/16, -width/2);

    //diagonals
    candle5.position.set(Math.cos(45)*(width/2 + width/6), width/16, Math.cos(45)*(width/2 + width/6));
    candle6.position.set(-Math.cos(45)*(width/2 + width/6), width/16, Math.cos(45)*(width/2 + width/6));
    candle7.position.set(Math.cos(45)*(width/2 + width/6), width/16, -Math.cos(45)*(width/2 + width/6));
    candle8.position.set(-Math.cos(45)*(width/2 + width/6), width/16, -Math.cos(45)*(width/2 + width/6));

    //strings
    string1.position.set(width/3, width/2, 0);
    string2.position.set(-width/3, width/2, 0);
    string3.position.set(0, width/2, width/3);
    string4.position.set(0, width/2, -width/3);
    string1.rotation.z = Math.PI/8;
    string2.rotation.z = -Math.PI/8;
    string3.rotation.x = -Math.PI/8;
    string4.rotation.x = Math.PI/8;

    //position chandelier
    chandelier.position.y = roomDim.height - width - width/16;
    chandelier.position.z = roomDim.depth/8;

    return chandelier;
};

//ceilingBeams: create the roof detailing object
//three parameters: width (integer), height (width), and depth(width) of each bar
//returns an Object3D

function ceilingBeams(width, height, depth){
    var ceiling = new THREE.Object3D();

    function beam(width, height, depth){
        var barGeom = new THREE.BoxGeometry(width, height, depth);
        var barMaterial = new THREE.MeshPhongMaterial( { color: 0x726c58, side: THREE.DoubleSide });

        var barMesh = new THREE.Mesh(barGeom, barMaterial);
        return barMesh;
    };

    //create bars
    var bar1 = beam(width, height, depth);
    var bar2 = beam(width, height, depth);
    var bar3 = beam(width, height, depth);
    var bar4 = beam(width, height, depth);
    var bar5 = beam(width, height, depth);
    var bar6 = beam(depth, height, width);

    //handling the double sized room depth
    var position = roomDim.depth;
    var space = depth*2;

    //position bar
    bar1.position.set(0, 0, -position/2);
    bar2.position.set(0, 0, -position/2 + 2*space);
    bar3.position.set(0, 0, -position/2 + 4*space);
    bar4.position.set(0, 0, -position/2 + 6*space);
    bar5.position.set(0, 0, -position/2 + 8*space);
    bar6.position.set(0, 0, position/2);

    //add bars to ceiling object
    ceiling.add(bar1);
    ceiling.add(bar2);
    ceiling.add(bar3);
    ceiling.add(bar4);
    ceiling.add(bar5);
    ceiling.add(bar6);

    //position ceiling object
    ceiling.position.y = roomDim.height - height/2;
    ceiling.position.z = depth/2;

    return ceiling;
};
