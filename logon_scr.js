
// This script creates a fake login screen 
var body = document.body, html = document.documentElement;

var height_max = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
var width_max = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );

var old_mouse_x = 0;
var old_mouse_y = 0;

var screen_center_x = width_max/2;
var screen_center_y = height_max/2;

var logo_size = 126;

var logon_width = 400;
var logon_height = 300;

var logon_shift_x = -logon_width/2 + screen_center_x;
var logon_shift_y = -logon_height/2 + screen_center_y; 


var guest_bttn_width = width_max/10;
var guest_bttn_height = 40;


var mouse_shift_x = 0;
var mouse_shift_y = 0;


var X_thick = 2;



var is_movable_press = false;

let wallpaper_image;
let account_image;
let circleMask;
function preload() {
	wallpaper_image = loadImage('/wallpaper.webp');
	account_image = loadImage('/moon.jpg');
	circleMask = createGraphics(logo_size, logo_size);



}

function setup() {
	
	if(!skip_start & !is_mobile) {
		const canvas = document.getElementById("logon");

		
		createCanvas(width_max,height_max,canvas);
		
		circleMask.fill('rgba(0, 0, 0, 1)');

		circleMask.circle(logo_size/2,logo_size/2,logo_size);

        	account_image.mask(circleMask);
		loop()
	}

}


function draw() {

	if(skip_start || is_mobile) {
		remove();
	} else {



		rectMode(CORNER)
		image(wallpaper_image, 0, 0,width,height);

		var main_color = color(cur_theme[0][0],cur_theme[0][1],cur_theme[0][2]);
		var sec_color = color(cur_theme[1][0],cur_theme[1][1],cur_theme[1][2]);
		var third_color = color(cur_theme[2][0],cur_theme[2][1],cur_theme[2][2]);

		fill(main_color);
		noSmooth()
		strokeCap(SQUARE);
		strokeWeight(border_width);

		stroke(sec_color);
		var new_x = logon_shift_x+mouse_shift_x;
		var new_y = logon_shift_y+mouse_shift_y;

		rect(new_x,new_y,logon_width,logon_height);


		fill(sec_color);
		rect(new_x,new_y,logon_width,box_top_height);

		fill(main_color);


		rect(new_x+logon_width-box_top_height,new_y,box_top_height,box_top_height);


		var rotate_x = new_x+logon_width-box_top_height/2;
		var rotate_y = new_y +box_top_height/2;

		push();
		rectMode(CENTER);


		strokeCap(SQUARE);	

		translate(rotate_x,rotate_y);
		rotate(QUARTER_PI);


		fill(sec_color);
		noStroke();
		rect(0,0,box_top_height-4,X_thick,10);

		rotate(HALF_PI);
		rect(0,0,box_top_height-4,X_thick,10);

		pop();	
		noStroke()
		fill(main_color);



		rectMode(CORNER);
		textSize(15);
		text(' beeOS  V0.1b',new_x+border_width ,new_y+border_width+box_top_height/2);


		var acc_image_x = new_x + 30;
		var acc_image_y = new_y + ((logon_height +box_top_height)/2) -logo_size/2;
		image(account_image,acc_image_x ,acc_image_y ,logo_size,logo_size);


		strokeCap(SQUARE);	
		stroke(sec_color);
		strokeWeight(border_width/2);
		noFill();
		//rect(acc_image_x ,acc_image_y ,logo_size,logo_size);
		circle(acc_image_x+logo_size/2,acc_image_y+logo_size/2,logo_size);

		fill(third_color);
		rect(acc_image_x+logo_size+10 ,acc_image_y +logo_size-guest_bttn_height -20 ,(logon_width-30-(acc_image_x+logo_size+10 )+new_x) ,guest_bttn_height);	

		textSize(20);
		text("Login as Guest",acc_image_x+logo_size+37 ,acc_image_y +logo_size-guest_bttn_height -10 ,(logon_width-30-(acc_image_x+logo_size+10 )+new_x) ,guest_bttn_height);


		push();
		textSize(20);	
		strokeWeight(1);
		strokeCap(ROUND);
		//rectMode(CENTER);
		text("Welcome to beeOS!",acc_image_x+logo_size+19 ,acc_image_y+guest_bttn_height/2,(logon_width-30-(acc_image_x+logo_size+10 )+new_x) ,guest_bttn_height);
		pop();
	}
	
}
function mousePressed() {
	if(mouseX > logon_shift_x+mouse_shift_x && mouseX < logon_shift_x+mouse_shift_x + logon_width) {
		if(mouseY > logon_shift_y+mouse_shift_y && mouseY < logon_shift_y+mouse_shift_y + box_top_height) { 
        		is_movable_press = true;
        	} else {
			is_movable_press = false;
		}
	} else {
		is_movable_press = false;
	}
}



function delete_logon() {
	
	remove();
	noLoop();
}

function mouseClicked() {


	if(mouseX > logon_shift_x+mouse_shift_x+logon_width-box_top_height && mouseX < logon_shift_x+mouse_shift_x + logon_width) {	
		if(mouseY > logon_shift_y+mouse_shift_y && mouseY < logon_shift_y+mouse_shift_y+box_top_height) {

			noLoop();
			stop_pc_inlogon();

		}
	}

	var new_x = logon_shift_x+mouse_shift_x;
	var new_y = logon_shift_y+mouse_shift_y;



	var acc_image_x = new_x + 30;
	var acc_image_y = new_y + ((logon_height +box_top_height)/2) -logo_size/2;

	if(acc_image_x+logo_size+10 < mouseX && (logon_width-30+new_x) > mouseX ) {

		if((acc_image_y +logo_size-guest_bttn_height -20) < mouseY && guest_bttn_height+ (acc_image_y +logo_size-guest_bttn_height -20) > mouseY) {
			remove();

			start_desktop();
			
		}	
	}

}
function mouseDragged() {
	if(is_movable_press) {
		mouse_shift_x += movedX;
		mouse_shift_y += movedY;
	}
}
