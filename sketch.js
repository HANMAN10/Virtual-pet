var database;

var dog, happyDog, foodS, foodStock, dogIMG;

function preload(){
  happyDog = loadImage("images/dogImg1.png");
  dogIMG = loadImage("images/dogIMG.png");
}

function setup() {
	createCanvas(displayWidth, displayHeight);
  
  database = firebase.database();

  dog = createSprite(displayWidth/2, displayHeight/2);
  dog.addImage("dog", dogIMG);

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyIsDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage("dogHappy", happyDog);
  }

  drawSprites();

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x){

  if(x <= 0) {
    x = 0;
  } else{
    x = x - 1;
  }

  database.ref('/').update({
    food: x
  })
}

