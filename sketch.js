//Create variables here
var dog, happyDog, sadDog;
var foodObj;
var foodS, foodStock;
var fedTime, lastTime, feed, addFood;

function preload()
{
	//load images here
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");

}

function setup() {
  database=firebase.database()
  createCanvas(800, 700);
 

  foodObj=new Food()

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed=createButtom("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButtom("Add Food")
}


function draw() {  
background(46,139,87);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function (data){
  lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
   if(lastFed >=12){
     text("Last Feed: "+lastFeed%12 + "PM",350,30);
   }
    else if(lastFed === 0){
    text("Last Feed: 12AM", 350,30);
  }
   else {
    text("Last Feed: "+lastFeed + "AM",350,30);
  }
  
  drawSprites();
  

}

function readStock(data){
  foods = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food: foodObj.getFoodStock(),
  FeedTime: hour()

})
}

function addFoods(){
  foodS++;
database.ref('/').update({
  Food: foodS
})
}