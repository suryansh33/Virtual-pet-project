var dog,sadDog,happyDog;
var feed,addfood;
var database;
var foodObj;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj=new Food();
  foodStock=database.ref('Food');
foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addfood=createButton("Add Food")
  addfood.position(800,95);
  addfood.mousePressed(addFoodsI); 

}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
  fill(255,355,254);
  textSize(15);
  if(lastFed>=12){
text("lastfeed:"+lastFed%12+"pm",350,30);
  }
  else if(lastFed==0){
text("lastfeed:12am",350,30);
  }
  else{
    text("lastfeed:"+lastFed+"Am",350,30);
  }
  drawSprites();
}
function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
     foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoodsI(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}