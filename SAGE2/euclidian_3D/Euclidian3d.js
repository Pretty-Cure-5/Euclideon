"use strict";

/* global THREE */

/**
 * WebGL 3D application, inherits from SAGE2_WebGLApp
 *
 * @class Euclidian3d
 */
var Euclidian3d = SAGE2_WebGLApp.extend({
   
   init: function(data) {

   this.build(data);
  
   },
   
   
   
	build: function(data){

    	this.SAGE2Init("div", data);
		
        this.resizeEvents = "continuous";
		
		
	    this.moving=0;
        this.element.id = "div" + data.id;
		console.log(data.id);
		
		this.coOef =55;
        this.frame  = 0;
        this.width  = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.windowHalfX=this.width/2;
        this.windowHalfY=this.height/2;
        var fieldOfView=45;
        var aspectRatio=this.width/this.height;
        var nearPlane=1;
        var farPlane=100000;
        var cameraZ=farPlane/3;
        var fogHex=0x000000;
        var fogDensity=0.5007;
        this.materials=[];
        this.particles=null;
        this.mouseX=0;
        this.mouseY=0;
		this.maxFPS=24;
        this.dragging = false;
        this.camera   = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
       
       // this.scene.fog=new THREE.FogExp2(fogHex, fogDensity);
        this.geometry=new THREE.Geometry();

        this.dataxyz = datamenuXYZ[4];
        this.particleCount=Object.keys(this.dataxyz).length;

                 //this.camera = new THREE.PerspectiveCamera(45, this.width/this.height, 1, 5000);
                 //camera postitions
                this.posX = this.camera.position.x + 0;
                this.posY = this.camera.position.y + 0;
                this.posZ = this.camera.position.z + 0;
	
	            this.camera.position.set(this.posX, this.posY, this.posZ);
				
				this.camera.position.set(this.coOef-this.coOef,this.coOef*3.2,(-2));
				//this.camera.lookAt(20, 20, 20);
				//this.camera.lookAt(this.scene.position);

		
        //controls
        this.orbitControls = new THREE.OrbitControls(this.camera, this.element);
		//this.orbitControls.maxPolarAngle = Math.PI / 2;
		this.orbitControls.minDistance = 0;
		this.orbitControls.maxDistance = 5000;
		this.scrollAmount=0;
		this.orbitControls.autoRotate  = true;
		this.orbitControls.zoomSpeed   = 1.0;
		this.speed = 0;
		this.orbitControls.autoRotateSpeed = this.speed; 
       
	   
	   //scene
	    this.scene    = new THREE.Scene();
		
		var big=0;
		 //adding floor
		        var floorspace = new THREE.BoxGeometry(this.coOef*3.5, 0, this.coOef*2.5);
		        var floorcolor = new THREE.Color("#E7FEFF");
	            var floorMaterial = new THREE.MeshBasicMaterial({color: floorcolor});
		        var floor = new THREE.Mesh(floorspace, floorMaterial);
		
		        floor.castShadow = false;
	            floor.position.x = 0; 
		        floor.position.y = 0;
		        floor.position.z = 0;
		  //     this.scene.add(floor);

            for (var i=0;i<this.particleCount;i++) {
           
     		//console.log(i);
            var coOrd=this.dataxyz[i];
            var vertex = new THREE.Vector3();
			this.vertexTop = new THREE.Vector3();
			this.vertexBottom = new THREE.Vector3();
			
			
			vertex.x = coOrd[0] * this.coOef;
            vertex.y = (coOrd[2] * this.coOef-this.coOef*2.5)*-1;
            vertex.z = coOrd[1] * this.coOef;
			
			//vertex.x = coOrd[0] * this.coOef;
            //vertex.y = (coOrd[2] * this.coOef);
            //vertex.z = coOrd[1] * this.coOef;
			
			
            this.vertexTop.x = vertex.x;
            this.vertexTop.y = vertex.y*.999;
            this.vertexTop.z = vertex.z;
			
			
			
			this.vertexBottom.x = vertex.x;
            this.vertexBottom.y = vertex.y*1.01;
            this.vertexBottom.z = vertex.z;
			
			
           
			var Y=vertex.y;
			var X=vertex.x;
			var Z=vertex.z;		
			if (i>2){
			var OLDY= (this.dataxyz[i-1][2]*this.coOef-(this.coOef*2.5))*-1;
			var OLDX= (this.dataxyz[i-1][0]*this.coOef);
			var OLDZ= (this.dataxyz[i-1][1]*this.coOef);
		    }
		
		   if (i<this.particleCount-1){
		   var NEWY= (this.dataxyz[i+1][2]*this.coOef-(this.coOef*2.5))*-1;
		   var NEWX= (this.dataxyz[i+1][0]*this.coOef);
		    var NEWZ= (this.dataxyz[i+1][1]*this.coOef);
		    }
			
			//console.log(0x00308F/this.dataxyz[i][2]);
		
		    var hexString=0x00308F/this.dataxyz[i][2]*5;
		
			/*
			if (Y<this.coOef*.37){
			hexString=0x00308F;
			}
			else if (Y<this.coOef*.50){
			hexString=0x008000;
			}
			else if (Y<this.coOef*.70){
			hexString=0xFAEA00;
			}
			else if (Y<this.coOef*5){
			hexString=0x008000;
			}
			
				if ((Y+2<OLDY||Y-2>NEWY)&&(X+1<OLDX||X-1>NEWX&&Z+1<OLDZ||Z-1>NEWZ)){
					
					hexString=0xAA007F;
				}
				
				if(X+1<OLDX&&X-1>NEWX||Z+1<OLDZ&&Z-1>NEWZ){
				
				hexString=0xE7FEFF;
				}
			
			
		*/
		   
				var vertexColor = new THREE.Color(hexString);
		   
		   

				var limit1=100;
				var limit2=5;
				
			
				//if((vertex.y>limit2)&&(vertex.y<limit1)) {
				
					if (coOrd[2]<big){
					
					big = coOrd[2];
					
					}
					
				    this.geometry.vertices.push(this.vertexTop);
				    this.geometry.colors.push(vertexColor);
				    this.geometry.vertices.push(this.vertexBottom);
				    this.geometry.colors.push(vertexColor);
					this.geometry.vertices.push(vertex);
					this.geometry.colors.push(vertexColor);
				
					if(Y<this.coOef*1.1){
					var TG=0;
					/*while (Y>0){
					var vertexToground = "vtx"+TG;
					TG++;
					Y=Y-(this.coOef*.02);
					this.vertexToground= new THREE.Vector3();
					this.vertexToground.x=vertex.x;
					this.vertexToground.y= Y;
					this.vertexToground.z=vertex.z;
					this.geometry.vertices.push(this.vertexToground);
				    this.geometry.colors.push(vertexColor);
					
					
									}*/
				
								}
				
			
								//	}
			
		
			
		}
	

        console.log("the highest point is" + big );
        var Size = this.coOef*0.01;//this.parameters[i][1];
        
        this.particles = new THREE.PointCloud(this.geometry, new THREE.PointCloudMaterial({size: Size, vertexColors:true, opacity:0.7}));
       
		this.particles.rotation.x = 0;//Math.random() * 6;
        this.particles.rotation.y = 0;//Math.random() * 6;
        this.particles.rotation.z = 0;//Math.random() * 6;
        this.scene.add(this.particles);
		
        this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(new THREE.Color(0xc0c0c0,1.0));//0xC0C0C0
        this.renderer.setSize(this.width, this.height);
        this.element.appendChild(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);
		
		this.controls.addButton({type: "fastforward", position: 7, identifier: "Spin+"});
		this.controls.addButton({type: "rewind", position: 8, identifier: "Spin-"});
		this.controls.addButton({type: "new", position: 4, identifier: "MenuGui"});
        this.controls.finishedAddingControls();
						
		this.menugui=this.menugui(data);
    },
	
	menugui: function(data)   {
	   
	this.menu = document.createElement('div'); 
	this.menu.id = "menuEuclidian"
	this.menu.className = "menu";
    this.menu.style.position = "absolute";
	this.menu.style.width    = "25%";
	this.menu.style.height   = "45%";
	this.menu.style.top      = "10px";
	this.menu.style.left     = "30px";
	this.menu.style.backgroundColor = "rgba(200,215,205,0.9)";
	this.menu.style.border   = "none";
	this.menu.style.zIndex   = "9901";
	this.menu.dragging       = true;
	this.menu.style.display = "none";

	this.title = document.createElement("H1");
	this.title.style.position = "relative";
	this.title.style.left ="15%";
	this.title.style.color = "rgba(0,0,255,0.5)";
	this.title.text = document.createTextNode("Menu Options");
	this.title.appendChild(this.title.text);
	//this.menu.appendChild(this.title);
	
	var modeldetail =["Name: Festo3",
	"ID: BeSpacedFesto03",
	"Location: Factory",
	"Date: 01 October 2016",
	"Max-Distance: 10 M",
	"Description: Side view of the bottle section"]
	
	
	for(var m=0;m<6;m++){
		
	this.details = document.createElement("H2");
	this.details.style.position = "relative";
	this.details.style.left     = "12px";
	this.details.style.border   = "1px solid #CCCCFF";
	this.details.style.top      = "3px";
	this.details.style.left     = "5px";
	this.details.style.color    = "rgba(2,5,5,3)";
	this.details.text = document.createTextNode(modeldetail[m]);
	this.details.appendChild(this.details.text);
	this.details.onclick='menuguiHideShow(date)';
	this.menu.appendChild(this.details);
			
		
	}
	
	this.menu.appendChild(this.title);
	
	
	   this.control = new function () {
            this.exportScene = function (data) {
                var exporter = new THREE.OBJExporter();
                var sceneJson = JSON.stringify(exporter.parse(this.scene));
                localStorage.setItem('this.scene', sceneJson);
            };

            this.clearScene = function (data) {
               this.manualdraw(data);	
			   console.log("clearScene");
			   //this.init(data);
			   // this.build(data);
            };

            this.importScene = function (data) {
                var json = (localStorage.getItem('scene'));
                var sceneLoader = new THREE.OBJLoader();

                sceneLoader.parse(JSON.parse(json), function (e) {
                    this.scene = e.this.scene;
                }, '.');
            }
        };
	
	
	
	this.gui = document.createElement("div");
	this.gui.gu = new dat.GUI( { autoPlace: false });
	
	//this.gui.domElement.id = 'gui';

       this.gui.gu.add(this.control,"exportScene");
       this.gui.gu.add(this.control,"clearScene");
       this.gui.gu.add(this.control,"importScene");
	
	this.menu.appendChild(this.gui.gu.domElement);
	
	 this.element.appendChild(this.menu);
	 	console.log("the menu has loaded");
   },
   
   
    menuguiHideShow: function(data) {
		
		if(this.menu.style.display=="none"){
			this.menu.style.display = "block";
			}
			else{this.menu.style.display = "none";}
						//this.menugui(data);
						
						this.manualdraw(data);						
						break;
		
		
    },

    load: function(date) {
		
		
    },

	//draw is continuous
    draw: function(date) {
		
		//this.firstTime=Date.now();
		
		if(this.speed!=0){
		setTimeout( function(){
	   
		},1000/30);
		 this.orbitControls.update();//this is for the <<spin>>
		this.renderer.render(this.scene, this.camera);
		 //this.refresh(date);
		}
		//this.lastTime=Date.now();
		//console.log(this.lastTime-this.firstTime);
		},
		
		   manualdraw: function(date) {
		
		this.renderer.render(this.scene, this.camera);
		
		
		},
			
			

    resize: function(date) {
        this.width  = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.renderer.setSize(this.width, this.height);
        this.refresh(date);
    },

    event: function(eventType, position, user_id, data, date) {
        if(eventType==="pointerPress" && (data.button==="left")) {
			
			if (this.menu){
				console.log("clickj");
			}
			if(this.menu.style.display=="none"){
				
            this.orbitControls.mouseDown(position.x,position.y,0);
			console.log(this.camera.position);
			this.dragging=true;
            this.refresh(date);
			
			}
			
        }
		
		
		else if (eventType==="pointerMove" && this.dragging)
		{
			this.orbitControls.update();
		    this.renderer.render(this.scene, this.camera);
			this.orbitControls.mouseMove(position.x,position.y);
			this.refresh(date);
		}
		
		else if (eventType === "pointerRelease" && (data.button === "left")) {
				this.dragging = false;
			}
			
		else if(eventType==="pointerScroll"){
			
			this.scrollAmount = data.wheelDelta;
			console.log("scrolling");
			console.log(this.scrollAmount/10);	
			this.orbitControls.scale((this.scrollAmount/10)*-1);
			this.manualdraw(data);
			
			//this.refresh(date);
			
			
   // var wDelta = this.wheelDelta < 0 ? 'down' : 'up';
    
			/*
			this.orbitControls.update();
		    this.renderer.render(this.scene, this.camera);
			this.orbitControls.addEventListener('change', this.renderer.render);
            this.refresh(date);
			*/
		}	
		
		
		else if (eventType==="widgetEvent")
		{
			switch (data.identifier) {
			
			case "Spin+":
			//this.menugui(data);
		             	this.speed++;
						this.orbitControls.autoRotateSpeed = this.speed;
						break;
            case "Spin-":
						this.speed--;
						this.orbitControls.autoRotateSpeed = this.speed;
						break;	
			case "MenuGui":
			console.log("new menu load");
			
			if(this.menu.style.display=="none"){
			this.menu.style.display = "block";
			}
			else{this.menu.style.display = "none";}
						//this.menugui(data);
						
						this.manualdraw(data);						
						break;				
			default:
						console.log("No handler for:", data.identifier);
						return;
			
			}
			
			this.refresh(date);
		}
    }
	
	
});
