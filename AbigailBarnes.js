let bx;
let by;
let bMilli;

let xPrev;
let yPrev;
let milliPrev;

let locked = false;
let screen_horizontal = 500;
let screen_vertical = screen_horizontal;
let target_size;
let box_created = false;
let trial_count = 0;
let max_trials = 30;
let trial_start = false

let ans = ""

let ansWidth = ""


function setup() 
{
  createCanvas(screen_horizontal, screen_vertical);
  background(0, 0, 0);
  rectMode(RADIUS);
  strokeWeight(2);
}

function keyPressed() 
{ 
  if (key == 's') 
  { 
    //press s to start this code
    yPrev = mouseY;
    xPrev = mouseX;
    milliPrev = Date.now();
    trial_start = true;
  }
  else trial_start = false;
}

function draw_my_box(x, y, line)
{
  target_size = 30 + Math.floor(Math.random() * width * 0.5);
  fill(255, 0, 0);
  rect(x, y, target_size, target_size);
}

function draw() 
{
  fill(255, 255, 255);
  textSize(32);
  text('trials: '+ trial_count + ' out of ' + max_trials , 10, 30);

  if (trial_start) 
  {
    if (box_created == false)
    { //new box
      bx = Math.floor(Math.random() * width);
      by = Math.floor(Math.random() * height);
      
      //get the mouse x and y values when the box is drawn
      xPrev = mouseX;
      yPrev = mouseY;
      milliPrev = Date.now();
  
      draw_my_box(bx, by , target_size, 2); 
      
      box_created=true;
      
    }
  }
  
  if(trial_count == max_trials)
  {
    print(ans.substring(0,ans.length- 2));
    print(ansWidth.substring(0,ansWidth.length- 2))
    exit();
  }
}

function mousePressed() 
{
  //Cursor in the box
  if (box_created) 
  {
    if (
    mouseX > bx - target_size &&
    mouseX < bx + target_size &&
    mouseY > by - target_size &&
    mouseY < by + target_size) 
    {
      overBox = true;
      //target being found by user
      if (!locked) 
      {
        //data needed to compute the fitts' law
        
        //calcFitts();
        
        //advance the trial
        box_created = false; 
        trial_count++;
        background(0, 0, 0);
        bMilli = Date.now();
        
        let time = bMilli - milliPrev;
        ans += time + ", "
        ansWidth += target_size + ", "
      }
    } 
    else 
    {
      print("You missed the box, try again!")
    }
  }
}

function mouseReleased() {
  locked = false;
}

function calcSlope()
{
  let slope = (by - yPrev)/(by - xPrev);
  //print("slope: ");
  //print(slope);
  return slope;
}

function calcYIntercept()
{
  let yInt = by - (calcSlope() * bx);
  return yInt;
}

function calcDistance()
{
  let y = bx - xPrev;
  let x = by - yPrev;
    
  let d = Math.sqrt(x * x + y * y);
  
  return d;
}

//output the time
function calcFitts()
{
  a = Math.abs(calcYIntercept());
  b = calcSlope();
  d = calcDistance();
  w = target_size;
  
  //print("a" + a);
  //print("b" + b);
  //print("d" + d);
  //print("w" + w);
  
  mt = a + b * Math.log2(2 * d / w);
  
  ans += mt + ", "
}
