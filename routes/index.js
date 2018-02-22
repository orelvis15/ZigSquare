module.exports = function (app){
	var Player = require('../public/javascripts/player.js');
	
add_player = function(req, res){
	
	var player = new Player({
		idDevice: req.body.idDevice,
		name: req.body.name,
		score: req.body.score,
		level: req.body.level,
		//positions: req.body.positions,
		attemps: req.body.attemps,
		lastDate: req.body.lastDate,
		like: req.body.like,
		os: req.body.os,
		model: req.body.model
	});
		player.save(function(err){
			if(err) console.log('error al incertar');
			else console.log('anuncio incertado');
		});
	res.send(player);
};

findAll = function(req,res,next){

	Player.find().sort({score:-1}).exec(function(err,player){
		if(err) cosole.log('Error al mostrar los datos');
		else res.send(player);
	});
};

del = function(req,res){
	Player.findById(req.params.id, function(err, player){
		player.remove(function(err){
			if(!err) console.log("Player eliminado");
			else console.log("Error: " + err);
		})
	});
};

findById = function(req,res){
	Player.findById(req.params.id, function(err,player){
		if(!err) res.send(player);
		else console.log('error '+ err);
	});
};

getTen = function(req,res){

	var id = req.body.id;
	var pos = 2;

	Player.find().sort({"score":-1}).exec(function(err,player){
		if(err) cosole.log('Error al mostrar los datos');
		else {
			for(var i = 0; i < player.length;i++){
				if(player[i]._id == (id)){
					pos = i;
					break;
				}
			}
			
			var result ="[";
			for(var i = pos-2; i <= pos+2;i++){
				if(pos>=0){
					if(player[i]!=undefined){
						player[i].pos = i+1
						result += JSON.stringify(player[i]);
						if(i != (req.body.cont + 9))
							result +=",";
					}
				}
			}
			result +="]";
			res.send(result)
		}
		
	});

}

	update_player = function(req,res){

		Player.findById(req.body._id,function(err,player){
			player.idDevice = req.body.idDevice,
			player.name = req.body.name,
			player.score = req.body.score,
			player.level = req.body.level,
			//positions: req.body.positions,
			player.attemps = req.body.attemps,
			player.lastDate = req.body.lastDate,
			player.like = req.body.like,
			player.os = req.body.os,
			player.model = req.body.model

			player.save(function(err){
				if(err) console.log('error al actualizar incertar');
				else console.log('anuncio actualizado');
			});
		});
		res.send({"ok":"ok"});
	}

	app.post('/add_player',add_player);
	app.get('/all',findAll);
	app.delete('/delete/:id',del);
	app.get('/byid/:id',findById);
	app.get('/getonlinescore',getTen);
	app.put('/update',update_player);
}