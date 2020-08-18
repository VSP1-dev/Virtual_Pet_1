//Create variables here
var dog, happyDog;
var dog_img;
var happyDog_img;
var database;
var foodS;
var foodStock;

function preload()
{
  //load images here
  dog_img = loadImage('images/dogImg.png');
  happyDog_img = loadImage('images/dogImg1.png');
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(300,430,30,30);
  dog.addImage(dog_img);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog_img);
  }


  drawSprites();
  //add styles here
  textSize = 50;
  text("Press Up_Arrow to feed food", 200, 10);
  fill("blue");
  stroke(5);

}

//function to read values from database
function readStock(data)
{
  foodS = data.val();
}

//function to write values in database
function writeStock(x)
{
  if(x<=0)
  {
    x = 0;
  }else{
    x = x -1;
  }
  database.ref('/').update({
    Food:x
  })
}




