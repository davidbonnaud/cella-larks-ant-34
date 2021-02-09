// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2020-02-02 15:58:23 Chuck Siska>

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:15, wid:60, hgt:40 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 24; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    //draw_grid( 100, 50, 'white', 'yellow' );
}

class Ant {
  constructor(dir, x, y, color, box){
    this.dir = dir;
    this.x = x;
    this.y = y;
    this.color = color;
    this.box = box;
    this.mode = "LRMode";
    this.counter = 0;
  }
  
  move(dir = 0) {
      let dx = 0;
      let dy = 0;
      switch (dir) { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
      case 0 : {         dy = -1; break; } //blue left in lr mode
      case 1 : { dx = 1; dy = -1; break; } //yellow switch to set-count mode
      case 2 : { dx = 1; break; }          //red right in lr mode
      case 3 : { dx = 1; dy = 1; break; }  //black left in lr mode
      }
      let x = (dx + this.x + this.box.wid) % this.box.wid; // Move-x.  Ensure positive b4 mod.
      let y = (dy + this.y + this.box.hgt) % this.box.hgt; // Ditto y.
      let color = "FFFF00";
      this.x = x; // Update bot x.
      this.y = y;
      this.dir = dir;
      this.color = color;
      console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
  }
  
  draw() {
      let sz = g_canvas.cell_size;
      let sz2 = sz / 2;
      let x = 1+ this.x*sz; // Set x one pixel inside the sz-by-sz cell.
      let y = 1+ this.y*sz;
      let big = sz -2; // Stay inside cell walls.
      let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
      //console.log(acolors);
      let pix = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ];
      //console.log(pix);
      //console.log( "acolors,pix = " + acolors + ", " + pix );
      if(this.counter > 0){
        this.color = "0000FF";
        this.counter--;
      } else if(pix === 0 || acolors[2] === 255){ //instruct ant to turn left if square is black or blue during lr mode
        console.log("left");
      } else if(acolors[0] === 255 && acolors[1] === 0){ //instruct ant to turn right if current square is red during lr mode and color square black
        this.color = "000000";
        console.log("right");
      } else if(acolors[0] === 255 && acolors[1] === 255){ //instruct ant to switch mode to set count and color square red, start the counter of blue squares to be placed
        this.color = "FF0000";
        this.counter = 4;
        console.log("switch mode to set count");
      }
    
      // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
      fill( "#" + this.color );
      // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
      //if (0 != pix) { fill( 0 ); stroke( 0 ); } // Turn off color of prior bot-visited cell.
      //else { stroke( 'white' ); } // Else Bot visiting this cell, so color it.

      // Paint the cell.
      rect( x, y, big, big );
  }
  
}

var g_box = { t:1, hgt:47, l:1, wid:63 }; // Box in which ant can move.
let ant = new Ant(1, 30, 20, 100, g_box);

/******* Old Code *******
var g_bot = { dir:3, x:30, y:20, color:100 }; // Dir is 0..7 clock, w 0 up.


function move_bot( )
{
    let dir = (round (8 * random( ))) // Change direction at random; brownian motion.
    let dx = 0;
    let dy = 0;
    switch (dir) { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
    case 0 : {         dy = -1; break; }
    case 1 : { dx = 1; dy = -1; break; }
    case 2 : { dx = 1; break; }
    case 3 : { dx = 1; dy = 1; break; }
    case 4 : {         dy = 1; break; }
    case 5 : { dx = -1; dy = 1; break; }
    case 6 : { dx = -1; break; }
    case 7 : { dx = -1; dy = -1; break; }
    }
    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
    let color =  100 + (1 + g_bot.color) % 156; // Incr color in nice range.
    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    g_bot.dir = dir;
    g_bot.color = color;
    console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}

function draw_bot( ) // Convert bot pox to grid pos & draw bot.
{
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz;
    let big = sz -2; // Stay inside cell walls.
    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
    fill( "#" + g_bot.color ); // Concat string, auto-convert the number to string.
    //console.log( "x,y,big = " + x + "," + y + "," + big );
    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    let pix = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ];
    //console.log( "acolors,pix = " + acolors + ", " + pix );

    // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
    if (0 != pix) { fill( 0 ); stroke( 0 ); } // Turn off color of prior bot-visited cell.
    else { stroke( 'white' ); } // Else Bot visiting this cell, so color it.

    // Paint the cell.
    rect( x, y, big, big );
}
*/

function draw_update()  // Update our display.
{
  console.log( "g_frame_cnt = " + g_frame_cnt );
    //move_bot( );
    //draw_bot( );
  ant.move();
  ant.draw();
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        if (!g_stop) draw_update();
    }
}

function keyPressed( )
{
    g_stop = ! g_stop;
}

/*function mousePressed( )
{
    let x = mouseX;
    let y = mouseY;
    //console.log( "mouse x,y = " + x + "," + y );
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    //console.log( "grid x,y = " + gridx + "," + gridy );
    //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    g_bot.x = gridx + g_box.wid; // Ensure its positive.
    //console.log( "bot x = " + g_bot.x );
    g_bot.x %= g_box.wid; // Wrap to fit box.
    g_bot.y = gridy + g_box.hgt;
    //console.log( "bot y = " + g_bot.y );
    g_bot.y %= g_box.hgt;
    //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
    draw_bot( );
}*/
