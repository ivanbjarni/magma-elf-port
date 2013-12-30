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


for(var i=0;i<225;i++)
{
    entityManager.addObstacle({
        cx : Math.floor(i/15)*80-600,
        cy : (i%15)*80-1200,

        halfHeight : 12,
        halfWidth : 12
    });
}

entityManager.addEnemy({cx:0, cy:0});

heightmap.initCurve();
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
        enemy1 : "images/enemy1.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}



function preloadDone() {
    g_sprites.player1  = new Sprite(g_images.player1);
    g_sprites.block1  = new Sprite(g_images.block1);
    g_sprites.block2  = new Sprite(g_images.block2);
    g_sprites.enemy1  = new Sprite(g_images.enemy1);
    initStart();
    g_main.init();
}

// Kick it off
requestPreloads();
