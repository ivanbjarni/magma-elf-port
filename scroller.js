"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// ============
// Player STUFF
// ============
var g_sprites = {};
var initStart = function (){
var KEY_W = 'W'.charCodeAt(0);
var KEY_S = 'S'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);
var KEY_A = 'A'.charCodeAt(0);
var KEY_SPACE = 32;

entityManager.clear();

entityManager.setPlayer({
    cx : 0,
    cy : 0,
    sprite: g_sprites.player1,
    
    GO_UP   : KEY_W,
    GO_DOWN : KEY_S,
    GO_LEFT   : KEY_A,
    GO_RIGHT : KEY_D,
    USE : KEY_SPACE
});


entityManager.addEnemy({cx:-150, cy:0});
entityManager.addEnemy({cx:-800, cy:-250});
entityManager.addItem({cx:-800, cy:-350});
entityManager.addEnemy({cx:150, cy:-840, isFlying: true, sprite: g_sprites.enemy2});

setLevel(1);
}
// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) 
{    
    entityManager.update(du);
    //particleManager.update(du);
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    heightmap.render(ctx,1);
    entityManager.render(ctx);

}

// Kick it off
var g_images = {};

function requestPreloads() {

    var requiredImages = {
        block1 : "images/block.png",
        block2 : "images/block2.png",
        player1 : "images/player1.png",
        enemy1 : "images/enemy1.png",
        enemy2 : "images/enemy2.png",
        gemerald : "images/gemerald.png",
        imgerr : "images/error.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}



function preloadDone() {
    g_sprites.player1  = new Sprite(g_images.player1);
    g_sprites.block1  = new Sprite(g_images.block1);
    g_sprites.block2  = new Sprite(g_images.block2);
    g_sprites.enemy1  = new Sprite(g_images.enemy1);
    g_sprites.enemy2  = new Sprite(g_images.enemy2);
    g_sprites.gemerald  = new Sprite(g_images.gemerald);
    g_sprites.imgerr  = new Sprite(g_images.imgerr);
    initStart();
    g_main.init();
}

// Kick it off
requestPreloads();
