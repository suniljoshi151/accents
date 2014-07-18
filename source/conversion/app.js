// inital setup
var PouchDB = require('pouchdb');

var exportProcess = require('./server/exportProcess');
GLOBAL.PouchDB_opts={
		cache:false
	};

if(process.env.NODE_ENV=='development'){
	console.log("running Dev");
	
	GLOBAL.db_name = 'http://localhost:5984/accents';
	//var db_hashName = 'http://localhost:5984/importexcelhashqueue';
	GLOBAL.db = new PouchDB(GLOBAL.db_name,GLOBAL.PouchDB_opts);
	//GLOBAL.db_hash = new PouchDB(db_hashName,PouchDB_opts);
}else{
	console.log("running Prod");
	var remoteLocation = 'http://location:port/'
	GLOBAL.db_name = 'accents';
	var db_hashName = 'importexcelhashqueue';
	var remote = remoteLocation+GLOBAL.db_name;
	var remote_hash = remoteLocation+GLOBAL.db_hashName;
	var opts ={
		live: true,
		create_target: true
	};
	
	GLOBAL.db.replicate.to(remote,opts);
	GLOBAL.db.replicate.from(remote,opts);
	//GLOBAL.db.replicate.to(remote_hash,opts);
	//GLOBAL.db.replicate.from(remote_hash,opts);
	GLOBAL.db = new PouchDB(GLOBAL.db_name,GLOBAL.PouchDB_opts);
	//GLOBAL.db_hash = new PouchDB(db_hashName,PouchDB_opts);
}
process.on('SIGTERM', function(){
    console.log('terminating');
    process.exit(1);
});
console.log("Starting Import Process");
exportProcess.startProcess(null,null);