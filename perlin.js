function rand2dVect(){
    var theta = Math.random() * 2 * Math.PI
    return {x: Math.cos(theta), y: Math.sin(theta)}
}

function dotGridGradient(vertX, vertY, x, y){
	gVect = gradient[vertY][vertX]
	dVect = {x: x - vertX, y: y - vertY}
	return dVect.x * gVect.x + dVect.y * gVect.y
}

var gradient
var dotProduct = (vect1, vect2) => vect1.x * vect2.x + vect1.y + vect2.y
var linTerp = (a, b, w) => (1 - w)*a + w*b

var perlin = {
	seed: function(){
		gradient = []
		for (var y = 0; y < gridSize; y++){
			var row = []
			for (var x = 0; x < gridSize; x++){
				row.push(rand2dVect())
			}
			gradient.push(row)
		}
	},

	get: function(x, y) {
		var cell = {x0: Math.floor(x), x1: Math.floor(x) + 1, y0: Math.floor(y), y1: Math.floor(y) + 1}
		
		var xWeight = x - cell.x0
		var yWeight = y - cell.y0
		
		//interpolate
		var tl, tr, bl, br, xTop, xBottom
		
		tl = dotGridGradient(cell.x0, cell.y0, x, y)
		tr = dotGridGradient(cell.x1, cell.y0, x, y)
		xTop = linTerp(tl, tr, xWeight)
		bl = dotGridGradient(cell.x0, cell.y1, x, y)
		br = dotGridGradient(cell.x1, cell.y1, x, y)
		xBottom = linTerp(bl, br, xWeight)
		return (linTerp(xTop, xBottom, yWeight) + 1) / 2
	}
}

var gridSize = 256
perlin.seed()