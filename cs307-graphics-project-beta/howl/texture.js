//background: create the star background
//three parameters: height (integer), width (integer), texture (image file)
// returns nothing, adds the plane to the scene
function background(height, width, texture){
        // make plane to texture sky image
        var backGeom = new THREE.PlaneGeometry(width, height);
        var backMaterial = new THREE.MeshBasicMaterial({color: 0x00ffff, map: texture[1]});
        var backMesh = new THREE.Mesh(backGeom, backMaterial);

        scene.add(backMesh);
        backMesh.position.y = roomDim.height/2;
        backMesh.position.z = -roomDim.depth - 11;
};


// Texture Loading for the carpet, stars, tapestry, and door 
var globalTextures = [];
TW.loadTextures(["textures/carpet.jpg","textures/star.jpg", "textures/map.jpg", "textures/door.jpg"],
            function (textures) {
                globalTextures = textures;
                background(roomDim.height, roomDim.width, globalTextures);
                carpet(60, 50, globalTextures);
                tapestry(60,50, globalTextures);
                door(roomDim.width,roomDim.depth,roomDim.height, globalTextures);
            } );
