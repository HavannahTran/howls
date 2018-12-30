// =============================================================================
// Lighting
// =============================================================================

//addLighting: add the ambient and directional light to the scene
//returns nothing
function addLighting(){
    //ambient
    var ambLight = new THREE.AmbientLight(0x2e78f7, .2);
    scene.add(ambLight)
    
    //directional
    var directionalLight = new THREE.DirectionalLight(0x3dc8ff, 0.25);
    directionalLight.position.set(0.5, 0.5, 1);
    scene.add(directionalLight);
    
}
addLighting();
