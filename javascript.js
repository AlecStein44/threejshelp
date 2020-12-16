 var obj = {
        heart: true,
        circle: false,
        square: false
    }

    function changeShape(shape, spe) {
        obj = shape
        //document.getElementById("image").src.length === 0 ? null : 
        if(spe === 'Heart') {
            handleHeart()
        } else if(spe === 'Circle') {
            console.log('ran')
            handleCircle()
        } else {
            handleSquare()
        }
        console.log(obj)
    }

    function handleImage(input) {
        let reader = new FileReader();
        reader.onload = function(event){
            
            let img = document.getElementById("image").src = event.target.result
            img.onload = function () {
                console.log('Image Uploaded')
            } 
            initCropper()
        }
        reader.readAsDataURL(input.files[0])
        
    };

    function initCropper() {

        let image = document.getElementById("image")
        console.log('started')
        let cropper = new Cropper(image, {
            aspectRatio: 1 / 1,
            crop: function(e) {
                let imgurl = cropper.getCroppedCanvas().toDataURL();
                let imgTwo = new Image();
                imgTwo.src = imgurl;
                //img.style.objectFit = "fill"
                imgTwo.id = "secondImg"
                imgTwo.onload = function () {
                    var texture = new THREE.Texture( this );
                    texture.needsUpdate = true;
                    if(obj.heart === true) {
                        handleHeart(texture)
                    } else if(obj.circle === true) {
                        handleCircle(texture)
                    } else {
                        handleSquare(texture)
                    }
                    //handleRender()
                    /*console.log(imgTwo)
                    contextTwo.drawImage(imgTwo, 0, 0, 1000, 1000 * imgTwo.height / imgTwo.width);*/
                }
                console.log(e.detail.x);
                console.log(e.detail.y);
            }
        })
    }

    function handleHeart(img) {
        document.getElementById("divRight").innerHTML = ""
        let renderer = new THREE.WebGLRenderer();
        document.getElementById("divRight").appendChild(renderer.domElement);
        let w = document.getElementById("divRight").clientWidth
        let h = 600
        renderer.setSize( w, h)
        let camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 3000 );
        const controls = new THREE.OrbitControls( camera, renderer.domElement );
        camera.position.set( 0, 0, 10 );
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        controls.update();
        let scene = new THREE.Scene();
        scene.background = new THREE.Color( 'grey' );
        light = new THREE.AmbientLight(0xffffff); 
        scene.add(light);

       
			

        const loader = new THREE.GLTFLoader();

        loader.load(
            // resource URL
            'models/heart_v1.glb',
            // called when the resource is loaded
            function ( gltf ) {

                let material = new THREE.MeshBasicMaterial( { map: img } );
        
                let model = gltf.scene || gltf.scenes[0];
                //model.scale.set(1000,1000,1000)
                model.traverse( function( object ) {

                    if ( object.isMesh ) object.material = material;
                
                } );
                scene.add(model)
                model.position.z = -10
                
        
            },
            // called while loading is progressing
            function ( xhr ) {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            function ( error ) {
                console.log(error)
                console.log( 'An error happened' );
        
            })

        scene.add(new THREE.AxesHelper(100))
        renderer.render(scene, camera)
    }

    function handleCircle(img) {
        document.getElementById("divRight").innerHTML = ""
        let renderer = new THREE.WebGLRenderer();
        document.getElementById("divRight").appendChild(renderer.domElement);
        renderer.setSize( 1000, 600)

        let camera = new THREE.PerspectiveCamera(35, 1000 / 600, 0.1, 3000 );
        let scene = new THREE.Scene();
        scene.background = new THREE.Color( '235, 64, 52' );

        

        let geometry = new THREE.CircleGeometry( 200, 200 );
        let material = new THREE.MeshBasicMaterial( { map: img } );
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -1000);
        scene.add(mesh);





        renderer.render(scene, camera)
    }

    function handleSquare(img) {
        document.getElementById("divRight").innerHTML = ""
        let renderer = new THREE.WebGLRenderer();
        document.getElementById("divRight").appendChild(renderer.domElement);
        renderer.setSize( 1000, 600)

        let camera = new THREE.PerspectiveCamera(35, 1000 / 600, 0.1, 3000 );
        let scene = new THREE.Scene();
        scene.background = new THREE.Color( '235, 64, 52' );

        

        let geometry = new THREE.BoxGeometry(300, 300, 300);
        let material = new THREE.MeshBasicMaterial( { map: img } );
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -1000);
        scene.add(mesh);





        renderer.render(scene, camera)
    }

    //initCropper()


$(document).ready(function(){

    
  
  });

