var dog,dogImg,dogImg1;
var database,foodS,foodObj;
var foodStock,feed,addFood;
var fedTime,lastFed;

function preload()
{
  dogImg=loadImage("./images/dogImg.png");
  dogImg1=loadImage("./images/dogImg1.png");
}

function setup() {
	createCanvas(800,400);
  database=firebase.database();

  foodObj=new Food();

 dog=createSprite(500,300,150,150);
 dog.addImage(dogImg);
 dog.scale=0.13;

 foodStock=database.ref("Food");
 foodStock.on("value",readStock);

 feed=createButton("Feed the dog");
 feed.position(700,85);
 feed.mousePressed(feedDog);

 addFood=createButton("Add milk bottles");
 addFood.position(800,85);
 addFood.mousePressed(addMilk);

}

function draw() {  
background(46,139,87);
  foodObj.display();

  fedTime=database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill("white");
  stroke("black");
  if(lastFed>=12){
    text("Last Fed:"+lastFed%12+"p.m",350,30);

  }
  else if(lastFed==0){
    text("Last Fed:12 a.m",350,30);
  }
  else{
    text("Last Fed:"+lastFed+"a.m",350,30);
  }
  drawSprites();

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
// function writeStock(x){
//   if(x<=0){
//     x=0;
//   }
//   else{
//     x=x-1;
//   }
//   database.ref("/").update({
//     Food:x
//   })
// }

function feedDog(){
  dog.addImage(dogImg1);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addMilk(){
 foodS++;
 database.ref("/").update({
   Food:foodS
 })
}

