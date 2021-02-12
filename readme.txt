Intro

  This project runs the algorithm of a Larks Ant where if the ant sees
  a black or blue square, it turns left and colors the square yellow, if the ant
  sees a red square, turn the square black and turn right, and if 
  it sees a yellow square, turn the square red and start a countdown where 
  the ant continues in a straight line for 6 blue tiles ignoring the tiles it 
  passes over, it then returns to the normal state and continues.

  This is an example project using HTML, Javascript (JS), and P5.js
  which is a JS-adapted version of the Processing Language.  CF HTML and
  JS on the web (eg, Wikipedia).  More on P5 is at
  p5js.org/reference.and at github.com/processing/p5.js/wiki.

  P5 provides sutomated animation (via a user-built "draw" function),
  and GUI manipulation functions that are simpler than JS.

Zip Contents

  File readme.txt.  This file.

  File .  A snapshot of the project webpage.

  File indexe.html. Drag and drop this into a browser to
    run the project.

  File p5.js. This is the P5 package.  It is loaded inside the html.

  File cs-sketch.js; This contains several P5 user-defined linkage functions
  (setup, draw), as well as example support functions.  P5's setup() is run 
  once before page display. P5's draw() is run once per display frame, 
  so you can do animation.

  File assets/styles.css.  This is an extra-small example of controlling
    webpage styling.  // Loaded inside the html.

  File assets/draw-stuff.js. This is an example to show loading a JS
    script file from a folder other than the index HTML file's
    folder location.  It also includes the utility draw_grid function
    written in P5+JS. // Loaded inside the html.

Installation & Running

  1. Extract the .zip file into a folder.

  2. Drag the index HTML file, index.html, into a browser
    window.  The example P5 program should start immediately.  You
    should see a black box that immediately begins to start having 
    colored squares, showing the positions the ant visited and the 
    actions it took.

Known Bugs

  o- Ant does not start by going upward an additional square visually,
     but checking the console reveals it does in fact do that.

Warnings


Testing

  o- Following installation instruction, above, watch it run.

Credits

  Some code was borrowed and modified from Stuart's book.  
    Introducing JavaScript Game Development: Build a 2D Game from the
    Ground Up, by Graeme Stuart, 2018, 209 pages.

  And, of course, thanks to the HTML and P5.js developers.
