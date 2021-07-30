var dog,dogImg,dogImg1;
var milkIMG;
var database;
var foodS=0,foodStock;
var feedPet,addFood;
var feedTime,lastFed;
var foodOBJ;
var time

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happydog.png");
  
  }

  //Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodOBJ 

  feedPet = createButton("feed the pet");
  feedPet.position(700,95);
  feedPet.mousePressed(fPet);

  addFood = createButton("add food");
  addFood.position(600,95);
  addFood.mousePressed(addFood);

  getTime();
  var title = createElement('h2');
  title.position(500,30);
   if(time){
  title.html("last feed :"+ time)
  }
  else{
    title.html("last feed :"+ "none")
  }
  
  foodStock=database.ref('food/stock');
  foodStock.on("value",readStock);
  textSize(20); 
}
// function to display UI
function draw() {
  background(46,139,87);
  drawSprites();
  fill(255,255,254);
  stroke("black");
  textSize(13);
   
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('food').update({
    stock:x
  })
}

function aFood(){
  if(foodS<20){
    foodS++;
  }
  updateFoodStock(foodS);
}

function fPet(){
if(food>0){
  foodS;
  }
  foodOBJ.updateFoodStock(foodOBJ.getFoodStock()-1)
  database.ref('/').update({
    Food:foodOBJ.getFoodStock(),
    feedTime:hour()
  })
 
  writeStock(foodS);
dog.addImage(dogImg1);
food.hide();
  
}

async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);

  feedtime = database.ref('feedTime');
  feedtime.on("value",function (data){
    hour = data.val()
});
 
  if(hour<12){
    time = hour%12 + "PM"  
  }
  if(hour === 12){
    time =  "12 PM" 
  }
  else{
    time = hour + "AM" 
  }

}
