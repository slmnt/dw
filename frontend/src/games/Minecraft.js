/* eslint-disable */

var THREE = window.THREE;
var Ammo = window.Ammo;
var Stats = window.Stats;

var toDeg = function (rad) {
  return rad * 180 / Math.PI;
}
var toRad = function (deg) {
  return deg * Math.PI / 180;
}


// call(this) で呼ぶ 
var ret = {};

Ammo().then(function(Ammo) {

var DISABLE_DEACTIVATION = 4;
var TRANSFORM_AUX = new Ammo.btTransform();
var ZERO_QUATERNION = new THREE.Quaternion(0, 0, 0, 1);
var tempVRayOrigin = new Ammo.btVector3();
var tempVRayDest = new Ammo.btVector3();
var tempbtVector3 = new Ammo.btVector3();
var tempbtQuat = new Ammo.btQuaternion();
var closestRayResultCallback = new Ammo.ClosestRayResultCallback( tempVRayOrigin, tempVRayDest );



var Game = {
  input: {},
  main: {},

  html: {},
  stats: {},
}
Game.init = function () {
  this.t = 0;
  this.dt = 0;

  (function () {
    for (var i in arguments) {
      arguments[i].game = this;
    }
  }).call(this, this.input, this.html, this.stats, this.main);

  this.input.init();
  this.html.init();

}
Game.destroy = function () {
  if (this.main && this.main.renderer) this.main.renderer.dispose();
}


Game.input.init = function () {
  this.main = this.game.main;

  this.Space = ' ';
  this.Enter = 'Enter';
  this.ArrowUp = 'ArrowUp';
  this.ArrowDown = 'ArrowDown';
  this.ArrowRight = 'ArrowRight';
  this.ArrowLeft = 'ArrowLeft';
  this.Shift = 'Shift';
  this.Control = 'Control';
  this.Alt = 'Alt';
  this.Escape = 'Escape';
  this.Tab = 'Tab';
  this.Backspace = 'Backspace';

  this.keyd = {}; // 直前フレームのキー状況
  this.key = {}; // 現在のキー状況
  this.keyLastUpdate = {}; // 
  this.mouse = {
    x: 0, y: 0, // 座標
    mx: 0, my: 0, // 座標の変化
    //lastUpdate: 0, // 
    l: false, r: false, // 左, 右ボタンの入力
    ld: false, rd: false, // 直前フレームでの左, 右ボタンの入力
    lc: false, rc: false, // 左, 右クリック
    setButton: function (l, r) {
      this.ld = this.l;
      this.rd = this.r;
      this.l = l;
      this.r = r;
      this.lc = this.ld == 0 && this.l;
      this.rc = this.rd == 0 && this.r;
      this.btnLastUpdate = 1;
    }
  };

  this.setKey = function (k, down) {
    if (k.length == 1) k = k.toLowerCase();
    this.keyd[k] = this.key[k];
    this.key[k] = down;
  };
  this.pressed = function (k) {
    return this.key[k] && !this.keyd[k]
  }

  var keyHandler = function (down) {
    return function (e) {
      this.setKey(e.key, down)
      e.preventDefault();
    }.bind(this)
  }.bind(this)

  this.keyDownHandler = keyHandler(true);
  this.keyUpHandler = keyHandler(false);
  this.mouseMoveHandler = function (e) {
    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    this.mouse.mx = e.movementX;
    this.mouse.my = e.movementY;
    this.mouse.lastUpdate = 1;
  }.bind(this)

  this.initialClickHadler = function (e) {
    if (this.game.html.pointerLockElement() != this.game.html.rendererElement) {
      this.game.html.requestPointerLock(this.game.html.rendererElement);
    }
  }.bind(this)

  this.mouseClickHandler = function (e) {
  }.bind(this)
  this.mouseAuxClickHandler = function (e) {
  }.bind(this)

  this.mouseDownHandler = function (e) {
    this.mouse.setButton((e.buttons & 1) != 0, (e.buttons & 2) != 0);
  }.bind(this)
  this.mouseUpHandler = function (e) {
    this.mouse.setButton((e.buttons & 1) != 0, (e.buttons & 2) != 0);
  }.bind(this)


  this.rendererHandlers = [
    ['click', this.mouseClickHandler],
    ['auxclick', this.mouseAuxClickHandler],
    ['mousedown', this.mouseDownHandler],
    ['mouseup', this.mouseUpHandler],
  ];
  this.globalHandlers = [
    ['mousemove', this.mouseMoveHandler],
    ['keydown', this.keyDownHandler],
    ['keyup', this.keyUpHandler],
  ];

}
Game.input.update = function (t, dt) {
  this.mouse.lastUpdate += 1;
  if (this.mouse.lastUpdate == 3) {
    this.mouse.mx = 0;
    this.mouse.my = 0;
  }
  this.mouse.btnLastUpdate += 1;
  if (this.mouse.btnLastUpdate == 3) {
    this.mouse.setButton(this.mouse.l != false, this.mouse.r != false);
  }

  for (var k in this.key) {
    if (this.key[k]) {
      this.key[k] += 1; // true + 1 ???
      if (this.key[k] == 3) {
        //this.key[k] = false;
        this.setKey(k, true);
      }
    }
  }
}
Game.input._update = Game.input.update;

Game.html.init = function () {
  this.input = this.game.input;

  this.pointerLockElement = function () {
    return document.pointerLockElement || document.mozPointerLockElement
  }
  this.onPointerLockChange = function () {
    if (!this.pointerLockElement() && this.onExitPointerLock)
      this.onExitPointerLock();
  }.bind(this)

  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
  if ("onpointerlockchange" in document) {
    document.addEventListener('pointerlockchange', this.onPointerLockChange, false);
  } else if ("onmozpointerlockchange" in document) {
    document.addEventListener('mozpointerlockchange', this.onPointerLockChange, false);
  }




  this.pointerLockElement = function () {
    return document.pointerLockElement || document.mozPointerLockElement
  }
  this.exitPointerLock = function () {
    document.exitPointerLock();
  }
  this.requestPointerLock = function (element) {
    if (this.pointerLockElement() == element) return;
    else if (this.pointerLockElement()) {
      this.exitPointerLock();
    }
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock;
    element.requestPointerLock();
    if (this.onPointerLock()) element.onPointerLock();
  }
  this.setRendererElement = function (element) {
    this.rendererElement = element;
  }
  this.setStatsElement = function (element) {
    this.statsElement = element;
  }
  this.appendStats = function (element) {
    if (this.statsElement) {
      this.statsElement.appendChild( element );
      window.sel = element;
      element.style.position = "absolute";
    } else {
      console.log("error: this.statsElement");
    }
  }




  this.onPointerLock = function () {
    this.rendererElement.removeEventListener( 'click', this.input.initialClickHadler, false );
    for (let h of this.input.rendererHandlers) {
      this.rendererElement.addEventListener(...h, h[2] || false)
    }
    for (let h of this.input.globalHandlers) {
      window.addEventListener(...h, h[2] || false)
    }
  }.bind(this)

  this.onExitPointerLock = function () {
    this.rendererElement.addEventListener( 'click', this.input.initialClickHadler, false );
    for (let h of this.input.rendererHandlers) {
      this.rendererElement.removeEventListener(...h, h[2] || false)
    }
    for (let h of this.input.globalHandlers) {
      window.removeEventListener(...h, h[2] || false)
    }
  }.bind(this)


  this.container = document.createElement( 'div' );
  document.body.appendChild( this.container );
  
}
Game.stats.init = function () {
  this.stats = new Stats();
  this.game.html.appendStats(this.stats.dom)
}

Game.update = function (t) {
  
  this.dt = t - this.t;
  this.t = t;

  // input.mouse の mx, my を, 1 フレーム後に 0 にするため (いつ mx が更新されるか分からないせい)
  this.input.update(this.t, this.dt);
  this.main.updatePhysics(this.t, this.dt);
  this.main.update(this.t, this.dt);
  this.input._update(this.t, this.dt);

  this.main.renderer.render(this.main.scene, this.main.camera);
  this.stats.stats.update();
}.bind(Game)

Game.main.init = function () {
  this.input = this.game.input;
  this.html = this.game.html;

  // three

  // 既存の canvas element を使う場合
  var rendererElement = this.html.rendererElement;
  if (rendererElement) {
    this.renderer = new THREE.WebGLRenderer({canvas: rendererElement});
  } else {
    this.renderer = new THREE.WebGLRenderer();
    rendererElement = this.renderer.domElement;
    this.game.html.setRendererElement(rendererElement);
  }
  this.renderer.setSize( window.innerWidth, window.innerHeight );
  rendererElement.onPointerLock = this.onPointerLock;
  rendererElement.addEventListener( 'click', this.input.initialClickHadler, false );


  this.clock = new THREE.Clock();

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
  
  this.scene.background = new THREE.Color( 0xf0f0f0 );
  this.scene.add( new THREE.AmbientLight( 0xf0f0f0 ) );
  


  this.UP = new THREE.Vector3(0, 1, 0);
  this.DOWN = new THREE.Vector3(0, -1, 0);
  this.RIGHT = new THREE.Vector3(1, 0, 0);
  this.LEFT = new THREE.Vector3(-1, 0, 0);
  this.FORWARD = new THREE.Vector3(0, 0, -1);
  this.BACKWARD = new THREE.Vector3(0, 0, 1);


  this.onWindowResize = function () {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }.bind(this)
  window.addEventListener( 'resize', this.onWindowResize, false );
  
  // ammo
  var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
  var dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
  var broadphase = new Ammo.btDbvtBroadphase();
  var solver = new Ammo.btSequentialImpulseConstraintSolver();
  this.pWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration );
  this.pWorld.setGravity( new Ammo.btVector3( 0, -90, 0 ) );

  this.rcWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration );

  // 設定
  this.rotLimit = toRad(90)
  
  // debug
  this.debug_raycast = new THREE.Raycaster();


  //material
  this.materials = {
    shadow: new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.5
    }),
    lambert: new THREE.MeshLambertMaterial({}),
    solid: new THREE.MeshNormalMaterial({}),
    colliding: new THREE.MeshBasicMaterial({
      color: 0xff0000,
        transparent: true,
        opacity: 0.5
      }),
    dot: new THREE.MeshBasicMaterial({
        color: 0x0000ff
      })
  };

    
  //
  this.player = {
    width: 2,
    height: 40
  }
  this.Unit = function (obj) {
    this.object = obj; // THREE.Object3D
    this.body = null; // Ammo の RigidBody
    this.dynamic = false // 重力, 当たり判定適用
  }
  this.Unit.prototype = {
    setDynamic: function (dynamic) {
      this.dynamic = dynamic;
    },
    setBody: function (body) {
      this.body = body;
    },
    setStatic: function () {
    }
  }
  this.world = {
    units: {},
    blockSize: 20,
    addUnit: function (unit) {
      this.units[unit.object.id] = unit;
    },
    posToBlock: function (vec) {
      var v = new THREE.Vector3(vec.x / this.blockSize, vec.y / this.blockSize, vec.z / this.blockSize);
      v.floor();
      return v;
    },
    blockToPos: function (vec) {
      return new THREE.Vector3((vec.x + 0.5) * this.blockSize, (vec.y + 0.5) * this.blockSize, (vec.z + 0.5) * this.blockSize);
    }
  };
  this.createUnit = function (obj, body, dynamic) {
    var unit = new this.Unit(obj);
    if (body) unit.setBody(body);
    if (dynamic) unit.setDynamic(dynamic);
    this.world.addUnit(unit);
    return unit;
  }


  // world 作成
  this.init_world();
  
}
Game.main.addPhysicalBody = function (mesh, bodyOptions) {
  bodyOptions = bodyOptions || {};
  
  var pos = mesh.position;
  var quat = mesh.quaternion;
  var mass = bodyOptions.mass || 0;
  var friction = bodyOptions.friction || 0;

  if (mesh.geometry.type === 'SphereGeometry' || mesh.geometry.type === 'ThorusKnotGeometry') {
  //} else if (mesh.geometry.type == "PlaneGeometry") {
  } else {
    mesh.geometry.computeBoundingBox();
    var box = mesh.geometry.boundingBox;
    var geometry = new Ammo.btBoxShape(new Ammo.btVector3((box.max.x - box.min.x) / 2, (box.max.y - box.min.y) / 2, (box.max.z - box.min.z) / 2));
  }

  var transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
  var motionState = new Ammo.btDefaultMotionState(transform);

  var localInertia = new Ammo.btVector3(0, 0, 0);
  geometry.calculateLocalInertia(mass, localInertia);

  var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, geometry, localInertia);
  var body = new Ammo.btRigidBody(rbInfo);
  body.setFriction(friction);
  this.pWorld.addRigidBody( body );

  body.setPosRot = function (pos, rot) {
    var ms = this.getMotionState()
    ms.getWorldTransform(TRANSFORM_AUX);
    if (pos) TRANSFORM_AUX.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    if (rot) TRANSFORM_AUX.setRotation(new Ammo.btQuaternion(rot.x, rot.y, rot.z, rot.w));
    ms.setWorldTransform(TRANSFORM_AUX);
    this.setMotionState(ms);
  }
  body.setPosition = function (pos) {
    this.setPosRot(pos);
  }
  body.setRotation = function (rot) {
    this.setPosRot(null, rot);
  }
  body.getPosition = function () {
    var ms = this.getMotionState();
    ms.getWorldTransform(TRANSFORM_AUX);
    return TRANSFORM_AUX.getOrigin();
  }
  body.getRotation = function () {
    var ms = this.getMotionState();
    ms.getWorldTransform(TRANSFORM_AUX);
    return TRANSFORM_AUX.getRotation();
  }
  body.getPositionT = function () {
    var vec = this.getPosition();
    return new THREE.Vector3(vec.x(), vec.y(), vec.z());
  }
  body.setVelocity = function (vec) {
    this.setLinearVelocity(new Ammo.btVector3(vec.x, vec.y, vec.z));
  }
  body.getVelocity = function () {
    var vec = this.getLinearVelocity();
    return new THREE.Vector3(vec.x(), vec.y(), vec.z());
  }

  this.rcWorld.addRigidBody(body);
  
  if (mass <= 0) {
    return this.createUnit(mesh, body);
  }
  body.setActivationState(DISABLE_DEACTIVATION);
  return this.createUnit(mesh, body, true);
}
Game.main.castPhysicsRay = function ( origin, dest, intersectionPoint, intersectionNormal ) {
    
  // Returns true if ray hit, and returns intersection data on the last two vector parameters
  // TODO Mask and group filters can be added to the test (rayCallBack.m_collisionFilterGroup and m_collisionFilterMask)
  
  // Reset closestRayResultCallback to reuse it
  var rayCallBack = Ammo.castObject( closestRayResultCallback, Ammo.RayResultCallback );
  rayCallBack.set_m_closestHitFraction( 1 );
  rayCallBack.set_m_collisionObject( null );

  // Set closestRayResultCallback origin and dest
  tempVRayOrigin.setValue( origin.x, origin.y, origin.z );
  tempVRayDest.setValue( dest.x, dest.y, dest.z );
  closestRayResultCallback.get_m_rayFromWorld().setValue( origin.x, origin.y, origin.z );
  closestRayResultCallback.get_m_rayToWorld().setValue( dest.x, dest.y, dest.z );

  // Perform ray test
  this.rcWorld.rayTest( tempVRayOrigin, tempVRayDest, closestRayResultCallback );

  if ( closestRayResultCallback.hasHit() ) {
    if ( intersectionPoint ) {
      var point = closestRayResultCallback.get_m_hitPointWorld();
      intersectionPoint.set( point.x(), point.y(), point.z() );
    }
    if ( intersectionNormal ) {
      var normal = closestRayResultCallback.get_m_hitNormalWorld();
      intersectionNormal.set( normal.x(), normal.y(), normal.z() );
    }
    return true;
  }
  else {
    return false;
  }
}
THREE.FresnelShader = {

	uniforms: {

		"mRefractionRatio": { value: 1.02 },
		"mFresnelBias": { value: 0.1 },
		"mFresnelPower": { value: 2.0 },
		"mFresnelScale": { value: 1.0 },
		"tCube": { value: null }

	},

	vertexShader: [

		"uniform float mRefractionRatio;",
		"uniform float mFresnelBias;",
		"uniform float mFresnelScale;",
		"uniform float mFresnelPower;",

		"varying vec3 vReflect;",
		"varying vec3 vRefract[3];",
		"varying float vReflectionFactor;",

		"void main() {",

			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",

			"vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",

			"vec3 I = worldPosition.xyz - cameraPosition;",

			"vReflect = reflect( I, worldNormal );",
			"vRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );",
			"vRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );",
			"vRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );",
			"vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );",

			"gl_Position = projectionMatrix * mvPosition;",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform samplerCube tCube;",

		"varying vec3 vReflect;",
		"varying vec3 vRefract[3];",
		"varying float vReflectionFactor;",

		"void main() {",

			"vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );",
			"vec4 refractedColor = vec4( 1.0 );",

			"refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;",
			"refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;",
			"refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;",

			"gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );",

		"}"

	].join( "\n" )

};
Game.main.init_world = function () {
  // 地面
  var helper = new THREE.GridHelper( 2000, 100 );
  helper.position.y = -199;
  helper.material.opacity = 0.25;
  helper.material.transparent = true;
  this.scene.add( helper );
  
 
 
 (function () {
/*
    var path = "textures/cube/Park2/";
				var format = '.jpg';
				var urls = [
					path + 'posx' + format, path + 'negx' + format,
					path + 'posy' + format, path + 'negy' + format,
					path + 'posz' + format, path + 'negz' + format
        ];
        var textureCube = new THREE.CubeTextureLoader().load( urls );
				textureCube.format = THREE.RGBFormat;
        this.scene.background = textureCube;
    var shader = THREE.FresnelShader;
    var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
    uniforms[ "tCube" ].value = textureCube;
    var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );
    var material = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    } );
    var mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );
    this.materials.transparent = material;

    var loader = new THREE.CubeTextureLoader();
    loader.setPath( 'textures/minecraft/' );
    
    let tex = new THREE.TextureLoader().load('textures/minecraft/dirt.png');
    tex.magFilter = THREE.NearestFilter;
    this.materials.mcGrass = new THREE.MeshLambertMaterial( { map: tex } );
    */
  }).call(this);

  
  var geometry = new THREE.PlaneGeometry( 2000, 2000 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  this.ground = new THREE.Mesh( geometry, material );
  this.ground.position.y = -199;
  this.ground.quaternion.setFromAxisAngle(this.RIGHT, -Math.PI/2);
  this.scene.add( this.ground );
  this.addPhysicalBody(this.ground);
 
  // 壁2
  //this.ground2 = new THREE.Mesh( geometry, material );
  //this.ground2.position.y = -199;
  //this.scene.add( this.ground2 );
  
  //
  /*
  this.groundShape = new CANNON.Plane();
  this.groundBody = new CANNON.Body({ mass: 0 });
  this.groundBody.addShape(this.groundShape);
  this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
  this.groundBody.position.copy(this.ground.position);
  this.pWorld.addBody(this.groundBody);
  */
  

  this.cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), this.materials.solid);
  this.cube.position.set(0, 0, 0);

  this.playerObj = new THREE.Mesh(new THREE.BoxGeometry(this.player.width, this.player.height, this.player.width), this.materials.colliding);
  this.playerObj.position.set(0, 0, 0);

  this.scene.add(this.cube);
  this.scene.add(this.playerObj);

  // add physical bodies
  this.cubeBody = this.addPhysicalBody(this.cube, {mass: 1}).body;
  this.playerBody = this.addPhysicalBody(this.playerObj, {mass: 1, friction: 0}).body;
  this.playerBody.setPosition(new THREE.Vector3(0, 100, 0));


  // register for collide events
  /*
  this.cubeBody.addEventListener('collide', function (e) {
      //console.log('Collision!');
  }.bind(this));
  this.playerBody.addEventListener('collide', function (e) {
      //console.log('player: Collision!');
  }.bind(this));
  */

}
Game.main.updatePhysics = function (t, dt) {
  this.pWorld.stepSimulation( this.clock.getDelta(), 10 );
  
  for (var id in this.world.units) {
    var u = this.world.units[id];
    if (u && u.dynamic) {
      var ms = u.body.getMotionState();
      if (ms) {
        ms.getWorldTransform(TRANSFORM_AUX);
        var p = TRANSFORM_AUX.getOrigin();
        var q = TRANSFORM_AUX.getRotation();
        u.object.position.set(p.x(), p.y(), p.z());
        u.object.quaternion.set(q.x(), q.y(), q.z(), q.w());
      }
    }
  }
}

var rot = new THREE.Euler( 0, 0, 0, 'YXZ' );
var r1 = new THREE.Euler( 0, 0, 0 );
var quat = new THREE.Quaternion();
var pos = new THREE.Vector3();
var v1 = new THREE.Vector3();
var v2 = new THREE.Vector3();

Game.main.update = function (t, dt) {
  // カメラ: 角度
  rot.x -= this.input.mouse.my / 700;
  rot.y -= this.input.mouse.mx / 700;
  rot.x = Math.min(this.rotLimit, Math.max(-this.rotLimit, rot.x))
  this.camera.quaternion.setFromEuler( rot );

  // カメラ: 位置
  var fb = this.input.key['w'] && 1 || this.input.key['s'] && -1 || 0;
  var rl = this.input.key['d'] && 1 || this.input.key['a'] && -1 || 0;
  var ud = this.input.key[this.input.ArrowUp] && 1 || this.input.key[this.input.ArrowDown] && -1 || 0;
  var jump = this.input.pressed(this.input.Space);


  /*
  this.camera.translateZ(fb * 2 * -1);
  this.camera.translateX(rl * 2);
  this.camera.translateY(ud * 2);
  */

  //this.cubeBody.setPosition(this.cube.position);

  
  // playerBody
  //this.playerObj.position.copy(this.camera.position);
  //this.playerBody.position.copy(this.camera.position);
  r1.x = 0;
  r1.y = 0;//rot.y;
  r1.z = 0;
  quat.setFromEuler(r1);
  this.playerBody.setRotation(quat);
  this.playerBody.setAngularVelocity(new Ammo.btVector3());
  this.camera.position.copy(this.playerBody.getPositionT());
  //this.camera.position.copy(new THREE.Vector3(0,0,0));
  this.camera.position.setY(this.camera.position.y + this.player.height / 2);
  
  // カメラ: 移動
  if (fb != 0 || rl != 0) {
    let hor = new THREE.Euler(0, rot.y, 0, "YXZ");
    v1.copy( this.FORWARD ).applyEuler(hor);
    this.playerBody.setPosition( v1.multiplyScalar( fb * 1 ).add(this.playerBody.getPositionT()) );
    v1.copy( this.RIGHT ).applyEuler(hor);
    this.playerBody.setPosition( v1.multiplyScalar( rl   * 1 ).add(this.playerBody.getPositionT()) );
  }
  if (ud != 0) {
    this.playerBody.setVelocity(v1.copy(this.UP).multiplyScalar(ud * 10).add(this.playerBody.getVelocity()));
  }
  if (jump) {
    this.playerBody.setVelocity(v1.copy(this.UP).multiplyScalar(80));
  }
  // debug
  if (this.input.mouse.rc) {
    /*
    var ballShape = new CANNON.Sphere(10);
    var ballGeometry = new THREE.SphereGeometry(ballShape.radius, 32, 32);

    var ballBody = new CANNON.Body({ mass: 1 });
    ballBody.addShape(ballShape);
    var ballMesh = new THREE.Mesh( ballGeometry, this.materials.solid );
    this.pWorld.addBody(ballBody);
    this.scene.add(ballMesh);

    this.createUnit(ballMesh, ballBody);
    //this.ballBody.position.copy(this.camera.position);
    //this.ballMesh.position.copy(this.camera.position);
    */
    let geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
    let material = this.materials.colliding;//new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let mesh = new THREE.Mesh( geometry, material );
    mesh.position.copy(new THREE.Vector3(0, 100, 0));
    this.scene.add( mesh );
    this.testbody = this.addPhysicalBody(mesh, {mass: 1, friction: 100}).body;
  }
  if (this.input.mouse.lc) {

    v1 = v1.copy(this.FORWARD).applyQuaternion( this.camera.quaternion )
    v2.copy(v1).multiplyScalar( 500 ).add(this.camera.position);
    let v = v1.clone()
    if ( this.castPhysicsRay(this.camera.position, v2, v) ) {
      v1.multiplyScalar(this.camera.position.distanceTo(v) - 0.001).add(this.camera.position);
      v = this.world.blockToPos(this.world.posToBlock(v1));
    }

    let geometry = new THREE.BoxBufferGeometry( 20, 20, 20, 20, 20, 20 );
    let material = this.materials.colliding;//new THREE.MeshBasicMaterial( { map: texture } );//this.materials.transparent;
    let meshe = new THREE.Mesh( geometry, material );
    meshe.position.copy(v);
    this.scene.add( meshe );
    this.addPhysicalBody(meshe);
    //b.position.copy(v);


  }
  if (this.input.pressed(this.input.Control)) {
    v1 = v1.copy(this.FORWARD).applyQuaternion( this.camera.quaternion ).multiplyScalar( 100 ); //.applyEuler( camera.rotation );
    //this.playerBody.velocity.copy(v1);
    //this.camera.position.add(v1);
  }

  if (!this.test) {
    let geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
    let material = this.materials.colliding;//new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );
    this.test = mesh;
    //this.addPhysicalBody(this.test);
    
  }
  v1 = v1.copy(this.FORWARD).applyQuaternion( this.camera.quaternion )
  v2.copy(v1).multiplyScalar( 500 ).add(this.camera.position);
  let v = v1.clone()
  if ( this.castPhysicsRay(this.camera.position, v2, v) ) {
    v1.multiplyScalar(this.camera.position.distanceTo(v) - 0.001).add(this.camera.position);
    this.test.position.copy(this.world.blockToPos(this.world.posToBlock(v1)));
    this.test.visible = true;
  } else {
    this.test.visible = false;
  }

}

Game.main.debug_line = function (id, from, to, color) {
  this.lines = this.lines || {}
  var line = this.lines[id]
  var from = from.clone().setY(from.y + 10)
  var to = to.clone().setY(to.y + 10)
  if (line) {
    line.geometry.vertices[0].copy(from)
    line.geometry.vertices[1].copy(to)
    line.geometry.verticesNeedUpdate = true
  } else {
    var m = new THREE.LineBasicMaterial( { color: color || 0x0000ff } );
    var g = new THREE.Geometry();
    g.vertices.push(from);
    g.vertices.push(to);
    var line = new THREE.Line( g, m );
    this.scene.add(line)
    this.lines[id] = line
  }
}


// control
function CameraControl (input, camera, unit) {
  this.input = input;
  this.camera = camera;
  this.unit = unit;
}
CameraControl.prototype = {
  update: function (t, dt) {

  }
}
function OrbitControl () {
  CameraControl.call(this, ...arguments);
}
OrbitControl.prototype = Object.create(CameraControl.prototype);
OrbitControl.prototype.update = function (t, dt) {
  
}

function FirstPersonControl () {
  CameraControl.call(this, ...arguments);
}
FirstPersonControl.prototype = Object.create(CameraControl.prototype);
FirstPersonControl.prototype.update = function (t, dt) {
  
}





Game.init();


this.update = Game.update.bind(Game);
this.init = function () {
  this.stats.init();
  this.main.init();
}.bind(Game);
this.destroy = Game.destroy.bind(Game);
this.setRendererElement = Game.html.setRendererElement.bind(Game.html);
this.setStatsElement = Game.html.setStatsElement.bind(Game.html);






}.bind(ret))


export default ret;

