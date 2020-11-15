
AFRAME.registerComponent('clock-component', {
schema: {
  ClockType: {type:'string', default:'analog' },
  SecHandColor: {type: 'color', default: '#A00'},
  MinHandColor: {type: 'color', default: '#000'},
  HrHandColor: {type: 'color', default: '#000'},
  ClockColor: {type: 'color', default: '#000'}
},

init: function () {
  
  console.log("type:"+this.data.ClockType);
  var data = this.data;
  var el = this.el;
  this.paused= false;
    
  Outer = new THREE.Object3D();
  Center = new THREE.Object3D();
  Inner = new THREE.Object3D();
  Backcover= new THREE.Object3D();

  var texture = new THREE.TextureLoader().load( 'dial1.jpg' );
  var ClinderGeo = new THREE.CylinderGeometry( 1.75, 1.75,0.1 , 32 );
  var CylinderMat ;
  
  CylinderMat= new THREE.MeshBasicMaterial( {map:texture} );
  
     
  var CylinderMesh = new THREE.Mesh(ClinderGeo, CylinderMat);
  CylinderMesh.rotateX((90* Math.PI)/180);
   CylinderMesh.rotateY((90* Math.PI)/180);
  CylinderMesh.name="cylinder";
  

  var ClinderGeo2 = new THREE.CylinderGeometry( 2, 2,0.2 , 32 );
  var CylinderMat2 = new THREE.MeshBasicMaterial( {color: this.data.ClockColor } );
  var CylinderMesh2 = new THREE.Mesh(ClinderGeo2, CylinderMat2);
  CylinderMesh2.rotateX((90* Math.PI)/180);
  CylinderMesh2.position.z-=0.15;

  var TorusGeo = new THREE.TorusBufferGeometry( 2, 0.1, 16, 100 );
  var TorusMaterial = new THREE.MeshPhongMaterial( { color: this.data.ClockColor  } );
  var TorusMesh = new THREE.Mesh(TorusGeo, TorusMaterial);
  TorusMesh.name="torus";
 
  Outer.add(CylinderMesh);
  Inner.add(TorusMesh);
  
  Backcover.add(CylinderMesh2);
  var parentgroup = new THREE.Object3D();
  parentgroup.add(Outer);
  parentgroup.add(Backcover);
  parentgroup.add(Inner);


  var CenterGeo = new THREE.CylinderGeometry( 0.18, 0.18, 0.4 , 32 );
  var CenterMat = new THREE.MeshPhongMaterial( { color: this.data.ClockColor} );
  var CenterMesh = new THREE.Mesh(CenterGeo, CenterMat);
  CenterMesh.rotateX((90* Math.PI)/180);

  Center.add(CenterMesh);

  parent1 = new THREE.Object3D();
  parent2 = new THREE.Object3D();
  parent3 = new THREE.Object3D();



//Hour , minutes and seconds hands
var pivot1 = new THREE.Object3D();
var pivot2 = new THREE.Object3D();
var pivot3 = new THREE.Object3D();

parent1.add(pivot1);
parent2.add(pivot2);
parent3.add(pivot3);

var SecGeo = new THREE.BoxGeometry( 0.08, 1.4, 0.3 );
var SecMaterial = new THREE.MeshBasicMaterial( {color: this.data.SecHandColor} );
var mesh1 = new THREE.Mesh( SecGeo, SecMaterial );

var HrGeo = new THREE.BoxGeometry( 0.18, 0.6, 0.3 );
var HrMaterial = new THREE.MeshBasicMaterial( {color: this.data.HrHandColor} );
var mesh2 = new THREE.Mesh( HrGeo, HrMaterial );

var MinGeo = new THREE.BoxGeometry( 0.12, 0.95, 0.3 );
var MinMaterial = new THREE.MeshBasicMaterial( {color: this.data.MinHandColor } );
var mesh3 = new THREE.Mesh( MinGeo, MinMaterial);

mesh1.position.y = 0.9;
mesh2.position.y = 0.6;
mesh3.position.y = 0.8;

pivot1.add( mesh1 );
pivot2.add( mesh2 );
pivot3.add( mesh3 );


parentgroup.add(parent2);
parentgroup.add(parent3);
parentgroup.add(parent1);
parentgroup.add(Center);






el.setObject3D("Clock", parentgroup);
},
tick : function()
{ 
  if(!this.paused && this.data.ClockType=="analog")
  {this.GetCurrentTime();
  var hrs = this.hr* ((Math.PI / 2)/3);
  var mins= this.min* ((Math.PI / 2)/15);
  parent1.rotation.setFromVector3(new THREE.Vector3(0, 0 ,-this.sec* ((Math.PI / 2)/15)));
  parent2.rotation.setFromVector3(new THREE.Vector3(0, 0 ,-hrs-((((Math.PI / 2)/3)*this.min)/60)));
  parent3.rotation.setFromVector3(new THREE.Vector3(0, 0 ,-mins-((((Math.PI / 2)/15)*this.sec)/60)));
  }

}, pause: function () {
    this.paused=true;
},
play: function () {
  this.paused=false;
},

GetCurrentTime: function(){
 var d = new Date();
  //var dd = d.getDate();
  //var mm = d.getMonth()+1; //January is 0!
  //var yyyy = d.getFullYear(); 
 // console.log(mm + '/' + dd + '/' + yyyy);
  //console.log("Hr:"+d.getHours()+" Min:"+d.getMinutes()+" Sec:"+d.getSeconds());
  this.sec= d.getSeconds();
  this.min= d.getMinutes();
  this.hr = d.getHours();
},
remove: function () {
  this.el.removeObject3D('Clock');
} 
});
 