var perlin = {
	rand2dVect: function(){
		var theta = Math.random() * 2 * Math.PI
		return {x: Math.cos(theta), y: Math.sin(theta)}	
	},
	
	dotGridGradient: function(vertX, vertY, x, y){
		var gVect = this.gradients[vertY][vertX]
		var dVect = {x: x - vertX, y: y - vertY}
		return dVect.x * gVect.x + dVect.y * gVect.y
	},
	
	smootherstep: function(x){
		return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3)
	},
	
	smoothTerp: function(a, b, w){
		return a + this.smootherstep(w) * (b - a)
	},
	
	linTerp: function(a, b, w){
		return (1 - w) * a + w * b
	},
	
	
	
	gradients: new Array,
	
	seed: function(){
		this.gradients = []
		for (var y = 0; y < 256; y++){
			var row = []
			for (var x = 0; x < 256; x++){
				row.push(this.rand2dVect())
			}
			this.gradients.push(row)
		}
	},

	get: function(x, y) {
		var x0 = Math.floor(x)
		var x1 = x0 + 1
		var y0 = Math.floor(y)
		var y1 = y0 + 1
		
		var xWeight = x - x0
		var yWeight = y - y0
		
		//interpolate
		var tl, tr, bl, br, xTop, xBottom
		
		tl = this.dotGridGradient(x0, y0, x, y)
		tr = this.dotGridGradient(x1, y0, x, y)
		xTop = this.smoothTerp(tl, tr, xWeight)
		bl = this.dotGridGradient(x0, y1, x, y)
		br = this.dotGridGradient(x1, y1, x, y)
		xBottom = this.smoothTerp(bl, br, xWeight)
		return this.smoothTerp(xTop, xBottom, yWeight)
	}
}

perlin.seed()