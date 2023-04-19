sprites.onCreated(SpriteKind.Player, function (sprite) {
    let randomC = randint(1, 8)
    let randomR = randint(1, 6)
    if (tilesSprites.length > 0) {
        let success = false
        while (!(success)) {
            for (let sprite of tilesSprites) {
                if (sprite.tilemapLocation().column != randomC && sprite.tilemapLocation().row != randomR) {
                    success = true
                }
            }
            randomC = randint(1, 8)
            randomR = randint(1, 6)
        }
    }
    sprites.setDataBoolean(sprite, "updated", false)
    sprites.setDataNumber(sprite, "rank", 0)
    sprites.setDataNumber(sprite, "col", randomC)
    sprites.setDataNumber(sprite, "row", randomR)
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

for (let i = 0; i < 48; i++) {
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

}

game.onUpdate(function () {
    for (let sprite of tilesSprites) {
        if (!(sprites.readDataBoolean(sprite, "updated"))) {
            sprite.setImage(tilesImages[sprites.readDataNumber(sprite, "rank")])
            sprites.setDataBoolean(sprite, "updated", true)
            tiles.placeOnTile(sprite, tiles.getTileLocation(sprites.readDataNumber(sprite, "col"), sprites.readDataNumber(sprite, "row")))
        }
        if (sprites.readDataNumber(sprite, "rank") == 10) {
            pause(500)
            game.gameOver(true)
        }
    }
})
