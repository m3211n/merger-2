sprites.onCreated(SpriteKind.Player, function (sprite) {
    let freeCells: number[] = []
    let tilesCells: number[] = []

    for (let sprite of tilesSprites) {
        tilesCells.push((sprite.tilemapLocation().column - 1) + (sprite.tilemapLocation().row - 1) * 8)
        console.log("col: " + sprite.tilemapLocation().column + "; row:" + sprite.tilemapLocation().row)
    }

    for (let i0 = 0; i0 < 48; i0++) {
        freeCells.push(i0)
    }

    for (let sprite of tilesSprites) {
        let spriteCell = (sprite.tilemapLocation().column - 1 ) + 8 * (sprite.tilemapLocation().row - 1)
        console.log(spriteCell)
        freeCells.removeAt(freeCells.indexOf(spriteCell))
    }

    let freeCell = freeCells._pickRandom()
    freeCells.removeAt(freeCells.indexOf(freeCell))

    let freeCol = freeCell % 8 + 1
    let freeRow = Math.floor(freeCell / 8) + 1

    sprites.setDataBoolean(sprite, "updated", false)
    sprites.setDataNumber(sprite, "rank", 0)
    tiles.placeOnTile(sprite, tiles.getTileLocation(freeCol, freeRow))

})

let tilesSprites: Sprite[] = []

let tilesImages = [
    assets.image`tile_0`,
    assets.image`tile_1`,
    assets.image`tile_2`,
    assets.image`tile_3`,
    assets.image`tile_4`,
    assets.image`tile_5`,
    assets.image`tile_6`,
    assets.image`tile_7`,
    assets.image`tile_8`,
    assets.image`tile_9`
]

scene.centerCameraAt(80, 64)
tiles.setCurrentTilemap(tilemap`level1`)

tilesSprites.push(sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player))

tilesSprites.push(sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player))

game.onUpdate(function () {
    for (let sprite of tilesSprites) {
        if (!(sprites.readDataBoolean(sprite, "updated"))) {
            sprite.setImage(tilesImages[sprites.readDataNumber(sprite, "rank")])
            sprites.setDataBoolean(sprite, "updated", true)
        }
        if (sprites.readDataNumber(sprite, "rank") == 10) {
            pause(500)
            game.gameOver(true)
        }
    }
})
