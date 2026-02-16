

// replace with your logo
var bee_os_logo = `


 #                                 
 #                      ##     ###:
 #                    :#  #: #   .#
 # ##    ###    ###   #.  .# #     
 #   #     :#     :#  #    # # .   
 #   #  #   #  #   #  #    #   ##  
 #   #  #####  #####  #    #      #
 #   #  #      #      #.  .#      #
 #   #      #      #  :#  #: #.   #
 # ##    ###:   ###:    ##   :####.


`

// this is the ascii logo of your "os"
var logo = `
  *************************
  ******@@@@@@@@%************
  ********@%****@@#************
  ********@%*****%@@************
  ********@%*****@@@**************
  ********@@@@@@@@******************
  ********@%####@@********************
  ********@%*****#@@******************
  ********@%*****@@@******************
  ******@@@@@@@@@@********************
  ************************************
  ************************************
  ******************###****####*******
  *****************##*##**##**##******
    **************##***##*###*********
      ************##***##**###********
        **********##***##****###******
         **********##*##**###*##******
           *********###****####*******
             *************************
`
// an list of ids for each exit button
const x_buttons = new Set();


// atributions 
// https://www.vecteezy.com/vector-art/9732937-dropper-icon-vector-design-template
// https://webbtelescope.org/contents/media/images/2023/151/01HFC82GPW3B8RPAJ3VWXJEAHZ?itemsPerPage=15&page=12
// https://tenor.com/view/tetoris-kasane-teto-teto-synthv-hiiragi-magnetite-gif-13980202707426180496
// https://webbtelescope.org/contents/media/images/2022/033/01G70BGTSYBHS69T7K3N3ASSEB?Collection=First%20Images&itemsPerPage=15&page=1

// mouse currenly down
var window_hold = null;

// the x/y positons sicne first clicked untill unheld
var window_shift_x = 0;
var window_shift_y = 0;

// checks if currently holding desktop icon
var desktop_icon_hold = null;

// id number of every new desktop icon, this changes every time new icon made
var desktop_icon_id = 0;

// each window is at a new z_index to make it look they are on top of eachoter, this nubmer increases by 1 each new window and when focused
var z_index = 1;
var index_at = 0;

// window id number
var window_id = 1;

// current a map of what url is at each browser and its current index
var browser_windows = new Map();

// list of each window with ascii art in it with their frames in JSON
var ascii_jsons = new Map();

// event listeners to update JSON maps
var ascii_loops = new Map();


// list of installed programs
var installed_programs = {};

var count_rows = 0;
var count_cols = 0;

// this is to have warning in browser to disapear after one showing
var showed_warning = false;

// how many warnings you will get if clicked "do not clicked"
var warns_left = 0;

var rand_at;

var audio_vol = VOLUME_DEFAULT;


var memes_list = structuredClone(MEMES);

// Function to make programs easier

function make_application(id,function_param,human_name,icon_path,in_desktop,type,funct) {
	var app = {
		"function_param":function_param,
		"human_name":human_name,
		"icon_path":icon_path,
		"in_desktop":in_desktop,
		"type":type,
		"funct":funct
	}
	installed_programs[id] = app;	
}

// program start function, program human name, icon path(null if none), appear in desktop (null if not and coords if yes starts at 1,1 [x,y])
// you can comment any of these lines to remove an app
make_application("theme_picker","make_theme_window()","Theme Picker","/desktop_icons/dropper.jpg",[1,1],"app",function() {make_theme_window()});
make_application("web_browser","make_web_browser()","Web Browser","desktop_icons/www_icon.png",[1,2],"app",function() {make_web_browser()});
make_application("credits","make_credits()","Credits","/desktop_icons/credits.png",[1,3],"app",function() {make_credits()});
make_application("about","make_about()","Welcome to BeeOS",null,null,"app",function() {make_about()});
make_application("viewer","make_view()","Image view","/desktop_icons/picture_icon.png",null,"app",null);
make_application("beefetch","make_beefetch()","System Info",null,[2,1],"app",function() {make_beefetch()});
make_application("teto","make_teto()","Kasane Teto","/desktop_icons/teto.gif",[2,2],"app",function() {make_teto()});
make_application("warning","make_warn()","Warning!","/desktop_icons/warn.png",null,"app",null);
make_application("click","make_hack()","Do Not Click","/desktop_icons/warn.png",[2,3],"app",function() {make_hack()});
make_application("me","make_about_me()","About Me","/desktop_icons/person.png",[3,1],"app",function() {make_about_me()});
make_application("meme","make_meme()","Random Meme","/desktop_icons/memes.png",[4,1],"app",function() {make_meme()});
make_application("time","make_time()","Server Uptime Status",null,[3,2],"app",function() {make_time()});
make_application("git","make_git()","Where to find my code!","/desktop_icons/forgejo.svg",[3,3],"app",function() {make_git()});

//uncomment this to add guestbook support
//make_application("sign","make_guestbook()","Sign the Digital Guestbook!","/desktop_icons/guestbook.png",[5,6],"app",function() {make_git()});


function shuffle_list(array_in) {
	array = structuredClone(array_in);
	var new_list = []
	for(var index = array.length -1;index >= 0;index--) {
		new_list.push(array.splice(Math.floor(index*Math.random()), 1)[0]);
	}
	var newer_list = []
	var len_to_get = new_list.length;

	for(var index = 0;index < len_to_get;index++) {
                newer_list.push(new_list.splice(Math.floor((len_to_get-index)*Math.random()), 1)[0]);
	}

	return newer_list;
}
var om_left = shuffle_list(OM_MESSAGE);

// this method spawns a new line durhing the computer boot up screen, it adds a new line and removes the preovous lines to make the linux systemd look
// @text text to render
// @err if true it renders red
async function spawn_line(text,err) {
	
	var split_items = text.split("\n");
	
	var body = document.body,
	html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

	if(18 * document.getElementById("content").childElementCount > height) {
		const list = document.getElementById("content");
		list.removeChild(list.firstElementChild);
	}
	var time_at = new Date();

	var res_result = "";
	for(const [index, element] of split_items.entries()) {
		const node = document.createElement("p");
			
		if(err == true) {
			res_result = "Failed";
		} else { 
			if(err == false) {
				res_result = "Ok";
			}
		}

		if(split_items.length == 1) {
			if(err== false) {
				node.innerHTML = "<pre>  <span style=color:green>[   "+res_result+"   ] </span>   "+element+"</pre>";
			} 
			if (err == true) {
				node.innerHTML = "<pre>  <span style=color:red>[ "+res_result+" ] </span>   "+element+"</pre>";
			}
			if(err == null) {
				node.innerHTML = "<pre>                "+element+"</pre>";
			}

		} else {
			node.innerHTML = "<pre><span style=white-space:preserve-spaces>"+element+"</span></pre>";
		}
		node.style.margin = "auto";
		node.style.white_space = "pre";
		node.style.color = "white";
		document.getElementById("content").appendChild(node);
		
	}
	
	

}

// this brings the web browser forward
function move_window_forward(browser_id) {
	var browser = document.getElementById(browser_id);
	if(browser_windows.size > 0) { 
		if (browser_windows.get(browser_id)[1] >= (browser_windows.get(browser_id)[0].length -1)) {
			console.log("cant go forward");
		} else {
			browser_windows.get(browser_id)[1] += 1;
			browser.children[1].children[0].src = browser_windows.get(browser_id)[0][browser_windows.get(browser_id)[1]];
		}
	}

}

// this brings a web browser back to the prevous window
function move_window_back(browser_id) {
	 
	var browser = document.getElementById(browser_id);
	if(browser_windows.size > 0) {
		if (browser_windows.get(browser_id)[1] <= 0) {
			console.log("cant go back");	
		} else {
			browser_windows.get(browser_id)[1] -= 1;
			browser.children[1].children[0].src = browser_windows.get(browser_id)[0][browser_windows.get(browser_id)[1]];
		}
	}
}

// this function gets user input in file, turns http into https and brings it into the iframe, it also adds it to the history
function search_web_browser(browser_id) {
	var browser = document.getElementById(browser_id);
	var input_res = browser.children[0].children[2].value;
		
	if(browser_windows.get(browser_id) == undefined) {
	
		browser_windows.set(browser_id,[[DEFAULT_WEBSITE],0]);
	}
	console.log((input_res.split("http").length));
	if(input_res.split("http").length < 2) {
		input_res = "https://"+input_res;
		browser.children[0].children[2].value = input_res;
	}
	console.log(input_res);
	if(input_res.includes("http://")) {
		input_res = "https"+input_res.split("http")[1]
		browser.children[0].children[2].value = input_res;
	}

	if(input_res.includes("https://")) {
		browser.children[1].children[0].src = input_res;	
		
		browser_windows.get(browser_id)[1] += 1;
		browser_windows.get(browser_id)[0].splice(browser_windows.get(browser_id)[1] , 0,input_res);
		console.log(browser_windows.get(browser_id)[0]);
	}	
}



function pop_meme() {
	if(memes_list.length <= 0) {
		memes_list = structuredClone(MEMES);	
	}
	return memes_list.splice(Math.floor(memes_list.length*Math.random()), 1)[0]
}
var meme_num = 0
function insert_meme(meme_id) {
	var meme_image = "memes/"+pop_meme();
	
	var html_insert = ``;
	switch (meme_image.split(".")[1]) {
		case "png":
			html_insert += `<img id = \"meme`+meme_num+`\" style="max-width:100%;max-height:470px;center;" src="`+meme_image+`">`
			break;
		case "mov":
			html_insert += `<video  onloadstart=\"this.volume=`+audio_vol+`\"" id = \"meme`+meme_num+`\" style="max-width:100%;max-height:470px;" controls autoplay>
				<source src="`+meme_image+`" type="video/mp4">
				Cant play video :(
				</video>`
				
			break;
		case "gif":
			html_insert += `<img id = \"meme`+meme_num+`\" style="max-width:100%;max-height:470px;center;" src="`+meme_image+`">`
			break;
		case "mp4":
			html_insert += `<video onloadstart="this.volume=`+audio_vol+`" id = \"meme`+meme_num+`\"  style="max-width:100%;max-height:470px;" controls autoplay>
                                <source src="`+meme_image+`" type="video/mp4">
                                Cant play video :(
                      
				</video>`
			break;
		default:
			console.warn("Unknown file type: "+meme_image.split(".")[1]);
			break

	}
	meme_num += 1;
	document.getElementById(meme_id).innerHTML = html_insert;
			

	
}

function make_meme() {

	var meme_id = "meme_"+window_id;

	var text = `
		<div style="color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);" class="text_color">  
			<div style="height: 470px;text-align: center" id="`+meme_id+`">
			
			</div>
			<div style="height: 30px;align-content: center;text-align: center;">
				<button onclick="insert_meme('`+meme_id+`')">Next Meme</button>
			</div>
		</div>

	`
	var win_id = make_window(null,null,600,500,"Random Meme",text  );
        add_icons_to_task_bar(win_id,"meme");
	window_id += 1;
	insert_meme(meme_id)
}

function render_random() {
       	if(warns_left <= 0) {
		warns_left = 0;
		clearInterval(rand_at);		
		rand_at = null;
	} else {

		if(om_left.length == 0) {
			om_left = shuffle_list(OM_MESSAGE);
		}
		make_warn(om_left.pop(),true);
		warns_left -= 1;
		console.log(warns_left)
	}
}

function make_hack() {	
	warns_left += REPEAT_WARN;
	if(rand_at == null) {	
		rand_at = setInterval(render_random,100);
	}
}


function make_about_me() {

	var text = `	
	<div style="margin-top: 20px;margin-left: 10px;margin-right: 10px;color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);" class="text_color">
        <span style="font-size:x-large">Words</span>
        <div class="line_br"></div>
        <div class="line_br"></div>
        you can also write about yourself to!


</div>
	`
        var win_id = make_window(null,null,850,500,"About Me!",text);
        add_icons_to_task_bar(win_id,"me");
}



// shows a list of attempted breaches into my server
function make_ips() {
	var text_full = `<div style="color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);" class="text_color">
		<div style="margin-left: 20px;margin-right: 20px;">
		<h3>This is a list of all the IPs that attempted to exploit my webserver:</h3>
		<span style="font-weight: bold;color: darkblue;" onclick=about_list()>Learn more by clicking Here</span>
		<p style="margin-top: 5px;margin-bottom: 5px;">This list is updated every hour</p>
		</div>
		<div style="margin:auto;width: min-content;">`
	var ip_range = [];
	fetch("bad_guys.txt")
		.then((res) => res.text())
		.then((text) => {
			// do something with "text"	
			for( ip of text.split("\n")){
				if(ip != "") {
					ip_range.push(ip.replace("\n",""));
				}
			}
			
			var new_ip_range = []
			for(ip of ip_range) {


				new_ip_range.splice(Math.floor(new_ip_range.length*Math.random()), 0,ip);	
			}
			ip_range = new_ip_range;

                        var new_ip_range = []
                        for(ip of ip_range) {


                                new_ip_range.splice(Math.floor(new_ip_range.length*Math.random()), 0,ip);  
                        }
                        ip_range = new_ip_range;


			var index_at = 0;
			var SIZE = 5;

			if(is_mobile) {
				SIZE = 2;
			}
			var temp_txt = ""
			
			text_full += `<div style="font-family: Monospace;font-size:30px;text-align: center;white-space: pre;margin-top:0px;margin-bottom:0px;">`+ip_range.length+` tormented souls</di
v>`
			function pretty_items(txt) {
				return `<div style="font-family: Monospace;font-size:15px;white-space: pre;margin-top:0px;margin-bottom:0px;">`+txt+`</div>`;
			}
			
			for(ip of ip_range) {
				
				if(index_at >= SIZE) {
					text_full += pretty_items(temp_txt)
					index_at = 0;
					temp_txt = ""
				}

				temp_txt += ip + (" ".repeat(16-ip.length))
				index_at += 1;
				


			}
			
			text_full += pretty_items(temp_txt);

			text_full += "</div></div>"
			var win_id = make_window(null,null,800,400,"My list of shame",text_full);
			add_icons_to_task_bar(win_id,"skid");

	})			
}

// this event is called from a timer and this updates the frame of a window if rendering ascii
function render_frame_ascii(id) {
	
	var json = ascii_jsons[id][1][ascii_jsons[id][0]]

        if (ascii_jsons[id][0] >= ascii_jsons[id][1].length -1) {
                ascii_jsons[id][0] = 0;
        }

	

	function inner(input) {
		return `<span class="ascii">`+input+`</span>`;
	}
	
	var canvas = document.getElementById(id);
	if(canvas == null) { 
		clearInterval(ascii_loops[id])
	} else{
		if(canvas.firstChild == null) {

			for(var index = 0;index < json.length;index ++) {
				var node = document.createElement("div");

				node.innerHTML = inner(json[index]);
				node.className = "ascii_small"; 
				canvas.appendChild(node); 
			}
		} else {
			var index = 0;
			for(var child of canvas.children) {
				child.innerHTML = inner(json[index])
				index += 1;
			}
		}
		ascii_jsons[id][0] += 1;
	}
}

// fatass
function make_teto() {
	
	var ascii_id = "ascii"+window_id;

	var text_full = `<div class="ascii_held text_color" id = "`+ascii_id+`" style="overflow: hidden;color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);">`
	fetch('teto.json')
    		.then((response) => response.json())
    		.then((json) => {
		
		ascii_jsons[ascii_id] = [0,json];	
		text_full += `</div>`;
        	var win_id = make_window(null,null,300,410,"Teto",text_full);
		add_icons_to_task_bar(win_id,"teto");
		var loop = setInterval(render_frame_ascii,75,ascii_id);
 		ascii_loops[ascii_id] = loop;	
		})
}


function make_beefetch() {
	var margin = 2;


	var logo_striped = logo.split("\n").slice(1,-1);
	
	var new_logo = [];
	var max_size = 0;
	for(entry of logo_striped) {
		var cur_item = entry.replace("\t","");
		new_logo.push(cur_item);
		if(cur_item.length > max_size) {
			max_size = cur_item.length;
		}
	}
	var current_time = Math.floor(Date.now() / 1000);
	var date_past = current_time - START_TIMESTAMP;
	

	var time_string = ""
	if(date_past / 3600 >= 1) {
		var hours = Math.floor(date_past/3600);
		time_string += hours + " hours, ";
		
		date_past -= hours * 3600;
	}

	time_string += Math.floor(date_past/60) + " mins"

	var color_test_pattern = "<span style=background-color:#202020;>   </span><span style=background-color:red;>   </span><span style=background-color:#80d280;>   </span><span style=background-color:yellow;>   </span><span style=background-color:lightskyblue;>   </span><span style=background-color:mediumorchid;>   </span><span style=background-color:#11e8e8;>   </span><span style=background-color:white;>   </span>";

	// Edit this with your fake system info
	var items_in = [
		"<span style=color:darkturquoise>guest</span>@<span style=color:darkturquoise>beeOS</span>",
		"-----------",
		"<span style=color:darkturquoise>OS</span>: beeOS",
		"<span style=color:darkturquoise>Kernel</span>: beeOS Kernel 2.5",
		"<span style=color:darkturquoise>Uptime</span>: " + time_string,
		"<span style=color:darkturquoise>Programs</span>: "+Object.keys(installed_programs).length+" (Desktop)",
		"<span style=color:darkturquoise>Shell</span>: bsh 5.8",
		"<span style=color:darkturquoise>Display</span>: "+document.getElementById("background").offsetWidth+"x"+document.getElementById("background").offsetHeight+ " [External]",
		"<span style=color:darkturquoise>DE</span>: BDE 6.2",
		"<span style=color:darkturquoise>WM</span>: Beeland",
		"<span style=color:darkturquoise>Theme</span>: "+THEME_NAME,
		"<span style=color:darkturquoise>Icons</span>: Default",
		"<span style=color:darkturquoise>Terminal</span>: beeterm 22.1",
		"<span style=color:darkturquoise>CPU</span>: Bentel(R) Core(TM) i7-9700F (8) @ 4.70 GHz",
		"<span style=color:darkturquoise>GPU 1</span>: BEEVIDIA GeForce RTX 9000 TINY [Discrete]",
		"<span style=color:darkturquoise>Memory</span>: 1.72 GiB / 7.62 GiB (22%)",
		"<span style=color:darkturquoise>Swap</span>: 9.80 MiB /  1.90 GiB (0%)",
		"<span style=color:darkturquoise>Disk</span>: 55.42 GiB / 860.63 GiB (6%)",
		"",
		color_test_pattern,
		color_test_pattern
	]

	function make_new_line(item_at, textin) {
			
		if(new_logo.length <= item_at) {
			return " ".repeat(max_size+margin*2) + textin ; 
		}
		return  (" ".repeat(margin)) +"<span style=color:darkturquoise>"+new_logo[item_at]+"</span>" +(" ".repeat(max_size-new_logo[item_at].length+margin))+ textin;
	}
	var mob_adds = ""
	if(is_mobile) {
		mob_adds ="width: fit-content;"
	}
	var new_text = `<div style="`+mob_adds+`;background-color:black;height:100%;color:white;">
		<span style="font-family: Monospace;font-size:15px;white-space: pre;margin-top:0px;margin-bottom:0px;"><span style="color:lawngreen;">guest@beeOS</span>:<span style="color:cornflowerblue;;">~</span>$ beefetch </span>`;
	for(var [index, item] of items_in.entries()) {
		var new_item = make_new_line(index,item) ;

		new_text += `<p style="font-family: Monospace;font-size:15px;white-space: pre;margin-top:0px;margin-bottom:0px;"><span>`+new_item + "</span></p>";
	}
	new_text += `<span style="font-family: Monospace;font-size:15px;white-space: pre;margin-top:0px;margin-bottom:0px;"><span style="color:lawngreen;">guest@beeOS</span>:<span style="color:cornflowerblue;;">~</span>$</span></div>`
	
	var win_id = make_window(null,null,850,500,"beefetch",new_text);
        add_icons_to_task_bar(win_id,"beefetch");
}

// makes a web browser
function make_web_browser() {



	var browser_width = 700
	var browser_height = 600

	if(is_mobile) {
		browser_width = document.getElementById("background").offsetWidth;
		browser_height = document.getElementById("background").offsetHeight * (1- HOME_ICON_MOBILE);
	}
	var browser_id = "browser_"+window_id

	var win_id = make_window(null,null,browser_width,browser_height,"Web Browser",`
	<div id = `+browser_id+`>
		<div class = "sec_color text_color_alt" style="color:rgb(`+cur_theme[1][0]+`,`+cur_theme[1][1]+`,`+cur_theme[1][2]+`);width:`+(browser_width)+`px;height:`+box_top_height+`px;padding-bottom:`+border_width+`px;background-color:rgb(`+cur_theme[1][0]+`,`+cur_theme[1][1]+`,`+cur_theme[1][2]+`)"> 

			<div onclick= move_window_back("`+browser_id+`") class = "back_bttn main_color" style="background-color:rgb(`+cur_theme[0][0]+`,`+cur_theme[0][1]+`,`+cur_theme[0][2]+`);display: flex;justify-content: center;align-items: center;text-align: center;position:fixed;width:`+box_top_height+`px;height:`+box_top_height+`px;">
			  	←
			</div>
			<div onclick= move_window_forward("`+browser_id+`") class = "forward_bttn main_color" style="background-color:rgb(`+cur_theme[0][0]+`,`+cur_theme[0][1]+`,`+cur_theme[0][2]+`);display: flex;justify-content: center;align-items: center;text-align: center;position:fixed;position:fixed;margin-left:`+(box_top_height+border_width)+`px;width:`+box_top_height+`px;height:`+box_top_height+`px;">
				→

			</div>

			<input class = "url_select main_color" placeholder="To prevent clickjacking attacks, only some websites can load in this browser." style="border: none;border-width: 0;box-shadow: none;outline: none;position:fixed;margin-left:`+ (box_top_height*2+border_width*2)+`px;width:`+(browser_width-box_top_height*6-border_width*4)+`px;height:`+(box_top_height-2)+`px;">

			</input>
			<div onclick=search_web_browser("`+browser_id+`") class = "search_bttn main_color" style="display: flex;justify-content: center;align-items: center;text-align: center;background-color:rgb(`+cur_theme[0][0]+`,`+cur_theme[0][1]+`,`+cur_theme[0][2]+`);position:fixed;margin-left:`+(browser_width-box_top_height*4)+`px;width:`+(box_top_height*4)+`px;height:`+box_top_height+`px;">
			Search!
			</div>


		</div>
		<div style="height:`+(browser_height-box_top_height-border_width)+`px;width:`+browser_width+`px;">
			<iframe src= "`+DEFAULT_WEBSITE+`" frameBorder=0 style="height:`+(browser_height-box_top_height-border_width)+`px;width:`+browser_width+`px;">

			</iframe>
		</div>
	</div>
	`,"web_browser");
	add_icons_to_task_bar(win_id,"web_browser");	

	if (!showed_warning){
		showed_warning = true;
		make_warn("This web browser is NOT a search engine and can only load URLs. For security only few websites can run here.")
	}
}

// if you delete any sort of images, make sure to remove them from here. However please keep the string "beee33 on github for the orignal source code".
function make_credits() {
        var win_id = make_window(null,null,400,300,"Credits",`
       	                <div style="word-wrap: anywhere;margin-top: 20px;margin-left: 10px;margin-right: 10px;color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);" class="text_color">
        <span style="font-size:x-large">Credits:</span>
        <div class="line_br"></div>
        <div class="line_br"></div>
		beee33 on github for the code/programs/backend/icons and everything else except below. No AI was used in developing this website. I hate those dam tin-skined bloatware to society, cogsucking, meetless and soul less Clankers. Execpt Miku.
		<div class="line_br"></div>
		<div class="line_br"></div>
		Dropper icon	
		<div class="line_br"></div>
		<a target="_blank" href=https://www.vecteezy.com/vector-art/9732937-dropper-icon-vector-design-template>https://www.vecteezy.com/vector-art/9732937-dropper-icon-vector-design-template</a>
		<div class="line_br"></div>
        	Wallpapers (JWST and NASA has some really cool images here)
		<div class="line_br"></div>
		<a target="_blank" href=https://webbtelescope.org/images>https://webbtelescope.org/images</a>

		<div class="line_br"></div>
		Kasane Teto spinning
		<div class="line_br"></div>
		<a target="_blank" href=https://tenor.com/view/tetoris-kasane-teto-teto-synthv-hiiragi-magnetite-gif-13980202707426180496>https://tenor.com/view/tetoris-kasane-teto-teto-synthv-hiiragi-magnetite-gif-13980202707426180496</a>
		<div class="line_br"></div>
		Miku GIF(pronunced GIF not JIF) 
		<div class="line_br"></div>
		<a terget="_blank" href=https://tenor.com/view/miku-vocaloid-hatsune-miku-gif-11737562665801937964>https://tenor.com/view/miku-vocaloid-hatsune-miku-gif-11737562665801937964</a>
		<div class="line_br"></div>
		ASCII GIF generator(made my life so much easier by providing it in JSON)
		<div class="line_br"></div>
                <a target="_blank" href=https://asciigif.com/>https://asciigif.com/</a>
                <div class="line_br"></div>
	</div>

        `);	
	add_icons_to_task_bar(win_id,"credits");

}

function make_git() {
	var win_id = make_window(null,null,400,350,"My Code",`
<div style="word-wrap: anywhere;margin-top: 20px;margin-left: 10px;margin-right: 10px;color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);" class="text_color">
        <div class="line_br"></div>
        <div class="line_br"></div>

<div class="line_br"></div>
		example
<a target="_blank" href=https://github.com/beee33>https://github.com/beee33</a> 
</div>
`)
		add_icons_to_task_bar(win_id,"git");

	}
// renders a window showing an image 
// @path what image to load can be url
// @is_scale if set to true it will be IMG_SCALE_SIZE persent of screen
function make_view(path,is_scale) {

	const img = new Image();
	
	if(is_mobile) {
		is_scale =false;
	}
	img.onload = function() {
		var scaled_width = this.width;
		var scaled_height = this.height;

		if(is_scale) {
			scaled_width = IMG_SCALE_SIZE * document.getElementById("background").offsetWidth;
			scaled_height = (this.height/this.width) *IMG_SCALE_SIZE* document.getElementById("background").offsetWidth; 
		}
		console.log(scaled_width)
		var win_id = make_window(null,null,scaled_width,scaled_height,path,`
			<img style="display:block;height:`+scaled_height+`px;"height = "`+scaled_height+`" width = "`+scaled_width+`px" src= "`+path+`">

		`);
		add_icons_to_task_bar(win_id,"viewer");
		
	}
	img.src = path;

}

function make_time() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {

			console.log(xhttp.responseText);


			var text_size = "";

			html = `<div class="text_color" style="align-content: center;white-space: preserve;overflow:hidden;`+text_size+`margin-top: 5px;margin-right: 10px;margin-left: 10px; color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);">`
			html += xhttp.responseText;
			html += "</div>"

			var win_id = make_window(null,null,600,500,"Server Uptime",html   );
			add_icons_to_task_bar(win_id,"time");


		}


	};

        var prep_script = "/uptime.txt";
        xhttp.open("GET", prep_script, false);
        xhttp.send(); 
	}

function make_about() {
	var text_size = ``;
	if(is_mobile) {
		text_size = `font-size:30px;`;
	}
	html = `<div class="text_color" style="overflow:hidden;`+text_size+`margin-top: 5px;margin-right: 10px;margin-left: 10px; color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);">`
        if(is_mobile) {
                html += `
                <div style="height:10px"></div>
                <h2>Important!</h2>
                <div>
                        You are on a mobile device, and this means that some of these features will be removed and changed, to get the full experience, it is recommended to use a PC instead. In mobile mode, to leave this window the exit button is on the bottom. Swipe gestures will not work! This is what the desktop experience looks like:

                </div>
                <span style="font-weight: bold;color: rgb(0, 0, 238);" onclick=make_view("images/pc_ver.png",false)>View Enlarged Image by clicking Here</span>
                <img src = images/pc_ver.png style="width:100%">
                <div style="height:10px"></div>
		<div style="height:10px"></div>
			`
        }
        html += `<span style="font-size: larger;">Hello and welcome to BeeOS!</span> 
        <div style="height:10px"></div>
        <div>   
        This is a faux OS that would run in the browser. I wanted to make it look like you are using a Linux like OS. You can drag windows(click and hold the top of a window), execute programs on the desktop, change themes, close windows, drag icons on desktop and bring a application icon to the front by double clicking the taskbar. It is similar to KDE, cinnamon, and Windows desktop environment. 

        </div>
        `


	html += `</div>`

	var win_id = make_window(null,null,500,200,"Welcome",html   );
        add_icons_to_task_bar(win_id,"about");
	
}
function make_guestbook() {
	var text_size = ``;
	if(is_mobile) {
		text_size = `font-size:30px;`;
	}
	var width=700;
	var height=400;

	html = `<iframe frameBorder=0  width=`+width+` height=`+height+` src="/guestbook.html">
		`
        
	

	html += `</iframe>`

	var win_id = make_window(null,null,width,height,"Sign my digital guestbook!",html   );
        add_icons_to_task_bar(win_id,"about");
	
}


var left_items = 1;
function make_random() {

	if(om_left.length == 0) {
		om_left = shuffle_list(OM_MESSAGE);
	}
	
	
		
	make_warn(om_left.pop(),false);
	setTimeout(make_random, Math.floor(30000+Math.random()*120000))	
}


// generates a warning
// @text text to print
// @sporadic if true it will render screen in a random spot
function make_warn(text,sporadic) {
	var win_height = 125;
	var win_width = 400;
	var block_height = 100;
	var img_height = 70;

	var html = `<div style="margin:`+((win_height-block_height)/2)+`px;height:`+block_height+`px;display: flex;color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);" class="text_color">
		<div style="margin:`+((block_height-img_height)/2)+`px; margin-right: auto;">
			<img width= `+img_height+`px height=`+img_height+`px src="/desktop_icons/warn.png"> 
		</div>
		<div style="text-align: center;width: 100%;margin: auto;margin-left:`+((win_height-block_height)/2)+`px">
			`+text+`
		</div>



		</div>`
        if(sporadic == true && !is_mobile) {
		var win_id = make_window((document.getElementById("background").offsetWidth-win_width-border_width)*Math.random(),(document.getElementById("background").offsetHeight-win_height-taskbar_height)*Math.random(),win_width,win_height,"Warning",html   );
	} else {
		var win_id = make_window(null,null,win_width,win_height,"Warning",html   );
	}
	add_icons_to_task_bar(win_id,"warning");

}
function clicked_icon() {


	var e = window.event;
	
	var icons_x = Math.floor(e.clientX/SET_ICON_WIDTH) + 1;
        var icons_y = Math.floor(e.clientY/SET_ICON_WIDTH) + 1;
	
	desktop_icon_id = "icon_"+icons_x+"_"+icons_y;
	desktop_icon_hold = [icons_x, icons_y];
}


// Generates the icon path for an app. This is used so any programs that are not apps will be unique and sets a default if no icon found
// @program_id program to get icon for
function get_icon_path(program_id) {
	var icon_path = "";
	if(installed_programs[program_id]["icon_path"] != null) {
		icon_path = installed_programs[program_id]["icon_path"];

	} else {
		switch(installed_programs[program_id]["type"]) {
			case "app":
				icon_path = "desktop_icons/executible_icon.png"
				break;

			default:
				icon_path = "desktop_icons/executible_icon.png"

		}
	}
	return icon_path;
}

function push_icons_to_desktop() {

	var icons_x = Math.floor(document.getElementById("background").offsetWidth/SET_ICON_WIDTH);
	var icons_y = Math.floor((document.getElementById("background").offsetHeight-taskbar_height)/SET_ICON_WIDTH);
	
	count_rows = icons_y;
	count_cols = icons_x;

	if(is_mobile) {
		icons_x = 4;
		icons_y = 4;
	}
	var children_to_make = icons_y * icons_x;
	document.getElementById("desktop").style = "display:grid; grid-template-columns: repeat("+icons_x+", "+SET_ICON_WIDTH+"px);grid-template-rows: repeat("+icons_y+", "+SET_ICON_WIDTH+"px)"

	if(is_mobile) {
		document.getElementById("desktop").style.position = "absolute";
		document.getElementById("desktop").style.top = (10+taskbar_height)+"px";
	}

	for (const icon_cur of Object.keys(installed_programs)) {
	        
			
		if( installed_programs[icon_cur]["in_desktop"] != null) {	
			
			var icon_path = get_icon_path(icon_cur); 

			const icon = document.createElement("div");
			if(!is_mobile) {	
				icon.id = "icon_"+installed_programs[icon_cur]["in_desktop"][0]+"_"+installed_programs[icon_cur]["in_desktop"][1];
			}
			icon.style.width = SET_ICON_WIDTH+"px";
			icon.style.height = SET_ICON_WIDTH+"px";

			icon.style.userSelect = "none";
				
			if(!is_mobile) {
				icon.style.gridColumn = installed_programs[icon_cur]["in_desktop"][0];
				icon.style.gridRow = installed_programs[icon_cur]["in_desktop"][1];
			}
			var click_type = `ondblclick`;
			var start_click_type = `onmousedown`;
			 
			if(is_mobile) {
				click_type = `onclick`;
				start_click_type = `ontouchstart`;
				
			}
			
			icon.innerHTML += `<div  `+click_type+`=`+installed_programs[icon_cur]["function_param"]+` `+start_click_type+`= clicked_icon() style="user-select: none;width:100%;height:100%;">
				<div style="width:100%;height:`+(SET_ICON_WIDTH-40)+`px;align-items: center;justify-content: center;display: flex;">
				<div>
					<image   draggable="false" src="`+icon_path+`" style="width:`+SET_ICON_SIZE+`px;height:`+SET_ICON_SIZE+`px;"> 

					</image>

				</div>

				</div>
				<div class ="sel_color" style="font-size:13px;text-align: center;margin-left: 5px;margin-right: 5px;color:rgb(`+cur_theme[2][0]+`,`+cur_theme[2][1]+`,`+cur_theme[2][2]+`);">
				`+installed_programs[icon_cur]["human_name"]+`
				</div>
				</div>`

			document.getElementById("desktop").appendChild(icon);
		}
	}

}


// Sets zindex to front making it appear in the front of the screen
// @screen_id window to move
function move_to_front_window(screen_id) {
	document.getElementById(screen_id).style.zIndex = z_index;
	z_index += 1;
}

// Adds the icon to task bar
// @win_id window that it refrences 
// @program_id type of program(used to determine icon)
function add_icons_to_task_bar(win_id,program_id) {
	if(!is_mobile) {	
		const icon = document.createElement("div");
		icon.style.width = document.getElementById("task_bar").style.height;
		icon.style.height = document.getElementById("task_bar").style.height;
		icon.id = win_id+"_icon"
		var icon_path = get_icon_path(program_id);
		var icon_margin = 4;
		var icon_height = parseInt(document.getElementById("task_bar").style.height.substring(0,document.getElementById("task_bar").style.height.length-2));	
		icon.innerHTML += `
	<div onclick=move_to_front_window("`+win_id+`") style="width:`+document.getElementById("task_bar").style.height+`;height:`+document.getElementById("task_bar").style.height+`">
		<img draggable="false" src = "`+icon_path+`" style="user-select: none;margin:`+icon_margin+`px;width:`+(icon_height-icon_margin*2)+`px;height:`+(icon_height-icon_margin*2)+`px;">

		</img>

	</div>


	`

		document.getElementById("task_bar").appendChild(icon);
	}

}

// this makes a dropper icon by manipulating pixels to set to the desktop's theme and places it in the bottom right
function load_dropper() {
        var drop_canvas = document.getElementById("dropper").getContext("2d");

        var image_margin = 20;

        const img = new Image();

        img.src = "/desktop_icons/dropper.jpg";

        const canvas = document.getElementById("dropper");
        const ctx = canvas.getContext("2d");

        img.addEventListener("load", (e) => {

                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, 100, 100);

                ctx.drawImage(img,image_margin, image_margin,100-image_margin*2,100-image_margin*2);



                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                const data_len = data.length
                for (let i = 0; i < data_len; i += 4) {
                        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                        if(avg > 200) {
                                data[i] = cur_theme[1][0];
                                data[i + 1] = cur_theme[1][1];
                                data[i + 2] = cur_theme[1][2];
                        } else {
                                data[i] = cur_theme[2][0];
                                data[i + 1] = cur_theme[2][1];
                                data[i + 2] = cur_theme[2][2];
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        });

}

function load_color_bttns(id,img_path,image_margin) {
	
	var drop_canvas = document.getElementById(id).getContext("2d");

	var image_margin = -10;

	const img = new Image();

	img.src = img_path

	const canvas = document.getElementById(id);
	const ctx = canvas.getContext("2d");

	img.addEventListener("load", (e) => {

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 40, 40);

		ctx.drawImage(img,0+image_margin,0+image_margin,40-image_margin*2,40-image_margin*2);



		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;
		const data_len = data.length
		for (let i = 0; i < data_len; i += 4) {
			const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
			if(avg > 200) {
				data[i] = cur_theme[1][0];
				data[i + 1] = cur_theme[1][1];
				data[i + 2] = cur_theme[1][2];
			} else {
				data[i] = cur_theme[2][0];
				data[i + 1] = cur_theme[2][1];
				data[i + 2] = cur_theme[2][2];
			}
		}
		ctx.putImageData(imageData, 0, 0);
	})
}

function mouse_move(e) {
	if(window_hold != null) {
		var canvas_select = document.getElementById(window_hold);
		
		var new_x = (e.clientX - window_shift_x);
        	var new_y = (e.clientY - window_shift_y);
		
		

		var win_width = parseInt(canvas_select.style.width.substring(0,canvas_select.style.width.length-2));
		var win_height = parseInt(canvas_select.style.height.substring(0,canvas_select.style.height.length-2));

		

		if(new_y >= 0 && e.clientY+win_height-window_shift_y+taskbar_height <= parseInt(document.getElementById("background").offsetHeight )) {
			canvas_select.style.top = new_y + "px";
		} else {
			if(new_y <= 0) {
				canvas_select.style.top = "0px";
			} else {	
				canvas_select.style.top = parseInt(document.getElementById("background").offsetHeight )- win_height-taskbar_height + "px";
			}
		}
		if(new_x >= 0 && e.clientX+win_width-window_shift_x <= parseInt(document.getElementById("background").offsetWidth)) {
                        canvas_select.style.left = new_x + "px";
                } else {
			if(new_x <= 0) {
                                canvas_select.style.left = "0px";
                        } else {
                                canvas_select.style.left = parseInt(document.getElementById("background").offsetWidth)- win_width + "px";
                        }
		}
	}

}


onmouseup = function(){
        if( window_hold != null) {
               
                document.removeEventListener("mousemove",mouse_move);
                window_hold = null;
        }
	if( desktop_icon_hold != null) {
		
		var e = window.event;

		var icons_x = Math.floor(e.clientX/SET_ICON_WIDTH) + 1;
        	var icons_y = Math.floor(e.clientY/SET_ICON_WIDTH) + 1;
		
		var new_id = "icon_"+ icons_x+"_"+icons_y;

		var icon_grabbed = document.getElementById(new_id);
		
		if(icon_grabbed == null) {
			var cur_icon = document.getElementById(desktop_icon_id);
			
			if(cur_icon != null) {
				
				if(count_rows > icons_y - 1 && icons_y >= 1) {
					if(count_cols > icons_x -1 && icons_x >= 1) {
						cur_icon.id = new_id;	
						cur_icon.style.gridColumn = icons_x;
						cur_icon.style.gridRow = icons_y;
					}
				}
			}
		}
		desktop_icon_hold = null;
	}
};

function load_theme(theme_name) {
	

	cur_theme = themes_desk[theme_name];
	load_dropper();
	THEME_NAME = theme_name;
	
	load_color_bttns("speaker_loud","images/speaker_loud.png",-10);
        load_color_bttns("speaker_quiet","images/speaker_quiet.png",-10);
	document.getElementById("background").style.backgroundImage = "url('"+themes_wall[THEME_NAME]+"')";
	for(var element of document.getElementsByClassName("sec_color")) {
		
		element.style.backgroundColor = "rgb("+cur_theme[1][0]+","+cur_theme[1][1]+","+cur_theme[1][2]+")";
	}
	for(var element of document.getElementsByClassName("style_vol")) {

                element.style.background = "rgb("+cur_theme[2][0]+","+cur_theme[2][1]+","+cur_theme[2][2]+")";
        }
	for(var element of document.getElementsByClassName("main_color")) {

                element.style.backgroundColor = "rgb("+cur_theme[0][0]+","+cur_theme[0][1]+","+cur_theme[0][2]+")";
        }
	for(var element of document.getElementsByClassName("sel_color")) {

                element.style.color = "rgb("+cur_theme[2][0]+","+cur_theme[2][1]+","+cur_theme[2][2]+")";
        }
	for(var element of document.getElementsByClassName("text_color")) {

                element.style.color = "rgb("+cur_theme[3][0]+","+cur_theme[3][1]+","+cur_theme[3][2]+")";
        } 
        for(var element of document.getElementsByClassName("text_color_alt")) {

                element.style.color = "rgb("+cur_theme[1][0]+","+cur_theme[1][1]+","+cur_theme[1][2]+")";
        }
	for(var can_id of x_buttons) {
		make_exit_bttn(can_id);
	}
	

}



var start_time = new Date();

async function stop_pc_inlogon() {
	start_time = new Date();

	function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
        }

	document.getElementById("logon").style.visibility = "hidden";
	spawn_line("Exiting beeOS")
	await sleep(Math.random() * 1000);
	spawn_line("Computer no longer computing");
	await sleep(Math.random() * 100);
        await sleep(1000);
        const node = document.getElementById("content");
        while (node.firstChild) {
                node.removeChild(node.lastChild);
        }
}

function kill_window(win_id) {

	
	var element = document.getElementById(win_id);
	element.parentNode.removeChild(element);
	
	x_buttons.delete("canvas"+win_id.substring(6,win_id.length));


	if(!is_mobile) {
		var element = document.getElementById(win_id+"_icon");
		element.parentNode.removeChild(element);
	} else {
			
		if(x_buttons.size == 0) {
			document.getElementById("nav_bar").style.visibility = "visible";
		}
	}
}

function get_time() {
	let date = new Date();
	var pm_am = "";
	var cur_hour = date.getHours()
	if(cur_hour >= 12) {
		if(cur_hour == 12) {
		
		} else {
			cur_hour -= 12;
		}
		pm_am = "PM"
	} else {	
		pm_am = "AM"
		if(cur_hour == 0) {		
			cur_hour += 12;
		}
	}
	var min = date.getMinutes();
	if((min+"").length == 0) {
		min = "00" + min
	}
	if((min+"").length == 1) {
		min = "0" + min 
        }	
	return cur_hour + ":"+min+" "+pm_am;

}
function make_exit_bttn(canvas_id) {

        
	if(!is_mobile) {
		var canvas_at = document.getElementById(canvas_id);
		var ctx = document.getElementById(canvas_id).getContext("2d");


		ctx.fillStyle = `rgb(`+cur_theme[0][0]+`,`+cur_theme[0][1]+`,`+cur_theme[0][2]+`)`;
		ctx.fillRect(0, 0, 100, 100);

		var mid = 50;

		var sin_45 = (Math.sqrt(2)/2);

		var half_main = (mid*sin_45)+10;

		var bor_len = 8;
		var shift = sin_45*half_main;


		ctx.moveTo(mid-shift,mid-shift);
		ctx.lineTo(mid+shift,mid+shift);
		ctx.lineWidth = bor_len;
		ctx.strokeStyle = "#"+rgb_to_hex(cur_theme[1]);
		ctx.lineCap = "square";
		ctx.stroke();

		ctx.moveTo(mid+shift,mid-shift);
		ctx.lineTo(mid-shift,mid+shift);
		ctx.lineWidth = bor_len;
		ctx.strokeStyle = "#"+rgb_to_hex(cur_theme[1]);
		ctx.lineCap = "square";
		ctx.stroke();
	} else {
		
		var drop_canvas = document.getElementById(canvas_id).getContext("2d");

		var image_margin = 0;

		const img = new Image();

		img.src = "/images/phone_exit_button.jpg";

		const canvas = document.getElementById(canvas_id);
		const ctx = canvas.getContext("2d");

		img.addEventListener("load", (e) => {

			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, 100, 100);

			ctx.drawImage(img,image_margin, image_margin,100-image_margin*2,100-image_margin*2);



			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const data = imageData.data;
			const data_len = data.length
			for (let i = 0; i < data_len; i += 4) {
				const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
				if(avg > 200) {
					data[i] = cur_theme[1][0];
					data[i + 1] = cur_theme[1][1];
					data[i + 2] = cur_theme[1][2];
				} else {
					data[i] = cur_theme[2][0];
					data[i + 1] = cur_theme[2][1];
					data[i + 2] = cur_theme[2][2];
				}
			}
			ctx.putImageData(imageData, 0, 0);
		});

	}
}
function get_date() {
	let date = new Date();
	return (date.getMonth()+ 1) +"/"+date.getDate()+"/"+(date.getFullYear()+"").substring(2,4);
}
function update_clock() {
	document.getElementById("time_date").innerHTML = get_time();
	document.getElementById("date_date").innerHTML = get_date();
}

function make_theme_window() {


	var help_height = 30 ;
	var entrie_height = 50;
	var win_width = 250;
	if(is_mobile) {
		 entrie_height= (document.getElementById("background").offsetHeight*(1-HOME_ICON_MOBILE)-help_height-border_width)/Object.keys(themes_desk).length;
	}
	var win_height = Object.keys(themes_desk).length * entrie_height+help_height+border_width;
	var font_size = ``
	var font_size_about = ``
	var font_size_sample = ``
	var text_icon_size = `50px` 
	if(is_mobile) {
		//font_size_about = `font-size: 60px`
		//font_size = `font-size: 55px;`
		font_size_sample = `font-size: 40px;`
		text_icon_size = `100px`
	}
	function spawn_select_window(theme,name) {
			

		return `<div onclick=load_theme("`+name+`") style="height:`+entrie_height+`px;display: grid;grid-template-columns: auto `+border_width+`px `+ text_icon_size +` 30px 30px;"> 
			
			<div class="main_color" style="display: flex;justify-content: center;align-items: center;text-align: center;grid-column:1;grid-row: 1;background-color:rgb(`+cur_theme[0][0]+`,`+cur_theme[0][1]+`,`+cur_theme[0][2]+`)"><span class = "text_color" style="`+font_size+`color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);">`+name+`</span></div> 
			<div class ="sec_color" style="grid-column:2;grid-row: 1;background-color:rgb(`+cur_theme[1][0]+`,`+cur_theme[1][1]+`,`+cur_theme[1][2]+`);"></div>
			<div style="display: flex;justify-content: center;align-items: center;text-align: center;grid-column:3;grid-row: 1;background-color:rgb(`+theme[0][0]+`,`+theme[0][1]+`,`+theme[0][2]+`);"><span style="`+font_size_sample+`color:rgb(`+theme[3][0]+`,`+theme[3][1]+`,`+theme[3][2]+`);">Text</span></div> 
			<div style="grid-column:4;grid-row:1;background-color:rgb(`+theme[1][0]+`,`+theme[1][1]+`,`+theme[1][2]+`);"></div> 
			<div style="grid-column:5;grid-row:1;background-color:rgb(`+theme[2][0]+`,`+theme[2][1]+`,`+theme[2][2]+`);"></div> 
			</div>`
	}
	var inj_code = `<div class = "main_color" ><div class = "text_color" style="height:`+help_height+`px;display: flex;justify-content: center;align-items: center;text-align: center;"><span style="`+font_size_about+`">Click the row to Select theme!</span></div>
			<div class ="sec_color" style="color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);width:100%;height:`+border_width+`px;background-color:rgb(`+cur_theme[1][0]+`,`+cur_theme[1][1]+`,`+cur_theme[1][2]+`);"></div>
	
		`
	// <div style="grid-column:3;grid-row: 1;background-color:rgb(`+theme[0][0]+`,`+theme[0][1]+`,`+theme[0][2]+`);"></div> 
	for (const theme_cur of Object.keys(themes_desk)) {	
		inj_code += spawn_select_window(themes_desk[theme_cur],theme_cur);
	}
	inj_code += `</div>`
	var canvas_id = make_window(Math.ceil(document.getElementById("background").offsetWidth/2-win_width/2),Math.ceil(document.getElementById("background").offsetHeight/2-win_height/2),win_width,win_height,"Theme Selector",inj_code,"theme_picker");
	add_icons_to_task_bar(canvas_id,"theme_picker")

}

function move_volume() {
	console.log("dafsf")
}
async function load_navbar() {
        function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
        }





	document.getElementById("nav_bar").style.height = taskbar_height+"px"
	document.getElementById("nav_bar").style.backgroundColor = "rgb("+cur_theme[1][0]+","+cur_theme[1][1]+","+cur_theme[1][2]+")";
	document.getElementById("nav_bar").className = "sec_color sel_color";
	document.getElementById("nav_bar").style.color = `rgb(`+cur_theme[2][0]+`,`+cur_theme[2][1]+`,`+cur_theme[2][2]+`)`
	if(!is_mobile) {
	
		document.getElementById("nav_bar").style.bottom = "0px";
	}
	const node = document.createElement("div");

	node.className = "sec_color";
	node.style.position = "fixed";
	node.style.right = "0px";
	node.style.width = "100px";
	//node.style.height = "100%";
	node.style.userSelect = "none";
	node.innerHTML += "<h5 class =\"sel_color sec_color\" id=time_date style=\" margin: 0px;text-align: center;font-size: 15px;margin-top: 3px;\">"+get_time()+"</h5><h5 id=date_date style=\"margin: 0px;text-align: center;font-size: 10px;\">"+get_date()+"</h5>"
	
	document.getElementById("nav_bar").appendChild(node);
	setInterval(update_clock, 1000);



	var node2 = document.createElement("canvas");

	node2.id = "dropper"
	node2.className = "sec_color";
	node2.style.position = "fixed";
	node2.style.right = node.style.width;
	node2.style.width = taskbar_height+"px";
	node2.style.height = taskbar_height+"px";

	node2.width = "100";
	node2.height = "100";

	node2.addEventListener("click",make_theme_window );

	document.getElementById("nav_bar").appendChild(node2);

	load_dropper();

	if(!is_mobile) {
		var node6 = document.createElement("div"); 	

		var node5 = document.createElement("input");

		var speaker_img_ld = document.createElement("canvas");
		var speaker_img_qt = document.createElement("canvas");

		var shrink = 6;

		node6.style = "align-items: center;display: flex;"
		node6.className = "";
		node5.className = "sec_color style_vol slider";
		node5.style = "-webkit-appearance: none;border-radius: 7px; margin-left: -5px;margin-right: -5px;background: rgb("+cur_theme[2][0]+","+cur_theme[2][1]+","+cur_theme[2][2]+")";
		speaker_img_ld.style = "float:right;";
		node5.id = "volume_slider";
		node5.style.width = VOL_SLIDER_WIDTH +"px"
		node6.style.position = "fixed";
		//node5.style.height = taskbar_height+"px";
		node6.style.width = (VOL_SLIDER_WIDTH + taskbar_height *2)+1 + "px" 
		node6.style.zIndex = 10;
		node5.style.zIndex = 10;
		node6.style.right = parseInt(node.style.width.substring(0,node.style.width.length-2)) + parseInt(node2.style.width.substring(0,node2.style.width.length-2)) + "px"
		node5.setAttribute("type", "range");
		node5.setAttribute("min", "0");
		node5.setAttribute("max", "1");
		
		node5.setAttribute("step","any");
		node5.style.userSelect = "all";


		speaker_img_qt.style.height =  taskbar_height+"px";
		speaker_img_ld.style.height =  taskbar_height+"px";

		speaker_img_qt.style.width =  taskbar_height+"px";
		speaker_img_ld.style.width =  taskbar_height+"px";


                speaker_img_qt.width =  taskbar_height;
                speaker_img_ld.width =  taskbar_height;

		speaker_img_qt.height =  taskbar_height;
                speaker_img_ld.height =  taskbar_height;

		speaker_img_ld.id = "speaker_loud";
		speaker_img_qt.id = "speaker_quiet";

		node5.addEventListener("change", () => {
			
			audio_vol = parseFloat(document.getElementById("volume_slider").value);
		});

		node6.appendChild(speaker_img_qt);
		node6.appendChild(node5)
		node6.appendChild(speaker_img_ld);

		node5.value = VOLUME_DEFAULT;
		document.getElementById("nav_bar").appendChild(node6);

		load_color_bttns("speaker_loud","images/speaker_loud.png",0);
		load_color_bttns("speaker_quiet","images/speaker_quiet.png",0);

	}
	
        const node3 = document.createElement("div");

        node3.className = "sec_color";
        node3.style.position = "fixed";
        node3.style.left = "0px";
        node3.style.width = taskbar_height+"px";
        node3.style.height = taskbar_height+"px";
	var icon_margin = 4;

	node3.innerHTML += `
		<img draggable="false" src="desktop_icons/os_logo.png" style="user-select: none;width:`+(taskbar_height-icon_margin*2)+`px;margin:`+icon_margin+`px;height:`+(taskbar_height-icon_margin*2)+`px;">

		</img>`;
        
	document.getElementById("nav_bar").appendChild(node3);

	if(!is_mobile) {
		const node4 = document.createElement("div");

		node4.className = "sec_color";
		node4.style.position = "fixed";
		node4.style.display = "flex";
		node4.style.left = (parseInt(node3.style.width.substring(0,node3.style.width.length-2))+10)+"px" ;
		node4.style.width = (document.getElementById("background").offsetWidth-parseInt(node2.style.width.substring(0,node2.style.width.length-2))-parseInt(node.style.width.substring(0,node.style.width.length-2))-parseInt(node3.style.width.substring(0,node3.style.width.length-2))-10)+"px";
		node4.style.height = taskbar_height+"px";
		node4.id = "task_bar"

		document.getElementById("nav_bar").appendChild(node4);
	}

	
}


function mouse_down_window(id) {


	window_hold = id;
	var canvas_select = document.getElementById(id);
	
	var e = window.event;

	

	window_shift_x = e.clientX - parseInt(canvas_select.style.left.substring(0,canvas_select.style.left.length-2));
	window_shift_y = e.clientY - parseInt(canvas_select.style.top.substring(0,canvas_select.style.top.length-2));
	
	//console.log(window_shift_x,window_shift_y);
	document.addEventListener("mousemove",mouse_move);
	canvas_select.style.zIndex = z_index;
	z_index += 1;
}

function int_to_hex(integer) {	
	
	result = (((integer << 1) >>> 1).toString(16).toUpperCase())+"";
	
	if(result.length == 1) {
		result = "0"+result;
	}
	return result;
}


function rgb_to_hex(color) {
	return int_to_hex(color[0])+int_to_hex(color[1])+int_to_hex(color[2]);
	
}


// this is the base function to make a window you can use this to make an app
function make_window(x_pos,y_pos,screen_width,screen_height,name,html,app_id) {

	const node = document.createElement("div");
	if(!is_mobile) {
		if(x_pos == null) {
			x_pos = document.getElementById("background").offsetWidth/2- (screen_width+border_width*2)/2
		}
		if(y_pos == null) {
			y_pos = document.getElementById("background").offsetHeight/2- (screen_height+box_top_height+border_width*3)/2
		}
		if(screen_height < 100) {
			screen_height = 100;
		}
		if(screen_width < 100) {
			screen_width = 100;
		}
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}	



		var screen_id = "window"+window_id;
		var canvas_id = "canvas"+window_id;


		var main_color = cur_theme;

		node.innerHTML += `
	<div id="`+screen_id+`" style="user-select: none;width:`+(screen_width+border_width*2)+`px; height:`+(screen_height+box_top_height+border_width*3)+`px; z-index:`+z_index+`;top:`+y_pos+`px;left:`+x_pos+`px; position:fixed;">
		<div onmousedown=mouse_down_window("`+screen_id+`")>
			<div style=\"width:`+(screen_width-(box_top_height-border_width))+`px;height:`+(box_top_height+parseInt(border_width)*2)+`px;position: absolute;\">	
			<span class ="sel_color" style = "color: rgb(`+cur_theme[2][0]+`,`+cur_theme[2][1]+`,`+cur_theme[2][2]+`); margin-left: 5px;font-size: `+(box_top_height-6)+`px;position: absolute;margin-top: `+(3+border_width/2)+`px;">`+name+`</span>
			</div>	

			<div class = "sec_color" style="height:`+(box_top_height+border_width*2)+`px;background-color:rgb(`+cur_theme[1][0]+`,`+cur_theme[1][1]+`,`+cur_theme[1][2]+`);"> 
				<canvas onclick=kill_window("`+screen_id+`") width="100" height="100" id= "`+canvas_id+`"; style="margin-top: `+border_width+`px;margin-left:`+(screen_width-(box_top_height-border_width))+`px;position: fixed;height:`+box_top_height+`px;width:`+box_top_height+`px;background-color: rgb(`+cur_theme[0][0]+`,`+cur_theme[0][1]+`,`+cur_theme[0][2]+`);">

				</canvas>
			</div>
		</div>
		<div onclick=move_to_front_window("`+screen_id+`") class = "sec_color" style="height:`+(screen_height+border_width)+`px;background-color:rgb(`+cur_theme[1][0]+`,`+cur_theme[1][1]+`,`+cur_theme[1][2]+`);">
			<div class = "sec_color" style="display: grid; grid-template-columns: auto auto auto;background-color: rgb(`+cur_theme[1][0]+`,`+cur_theme[1][1]+`,`+cur_theme[1][2]+`);">					 


			<div style=" grid-area: 1 / 1 / span 1 / span 1;width:`+border_width+`px">

			</div>	
			<div class = "main_color" style="overflow-x:scroll;width:`+(screen_width)+`px; height:`+(screen_height)+`px; grid-area: 1 / 2 / span 1 / span 1;background-color: rgb(`+cur_theme[0][0]+`,`+cur_theme[0][1]+`,`+cur_theme[0][2]+`);">
		`+html+`
			</div>		
			<div style=" grid-area: 1 / 3 / span 1 / span 1;width:`+border_width+`px;">

			</div>

			<div style=" grid-area: 2 / 1 / span 1 / span 3;height:`+border_width+`px;">

			</div>
		</div>	
	</div>
	`
		document.getElementById("content").appendChild(node);
	} else {
                var screen_id = "window"+window_id;
                var canvas_id = "canvas"+window_id;
		var bar_id = "bar_"+window_id;

                var main_color = cur_theme;

                node.innerHTML += `
        <div id="`+screen_id+`" style="user-select: none;top: 0;width:`+document.getElementById("background").offsetWidth+`px; height:`+document.getElementById("background").offsetHeight+`px; z-index:`+(z_index)+`; position:fixed;">
			<div class = "main_color" style ="overflow-x:scroll;position: absolute;height:`+((1-HOME_ICON_MOBILE)*100)+`%; width:100%;background-color:rgb(`+cur_theme[0][0]+`,`+cur_theme[0][1]+`,`+cur_theme[0][2]+`);">
				`+html+`
			</div >
			<div  id = `+bar_id+` style ="bottom: 0;position: absolute;height:`+(HOME_ICON_MOBILE*100)+`%; width:100%;" >
				<div style ="height:100%;aspect-ratio: 1 / 1;margin: auto;" >	
					<canvas onclick=kill_window("`+screen_id+`") width="100" height="100" id= "`+canvas_id+`" style="height:`+(100-HOME_ICON_MARGIN*2)+`%;margin: `+HOME_ICON_MARGIN+`%;aspect-ratio: 1 / 1;width:auto;">

		
                                	</canvas>
				</div>
			</div>
		</div>`
		document.getElementById("nav_bar").style.visibility = "hidden";
		document.getElementById("content").appendChild(node);
		document.getElementById(bar_id).style.backgroundColor = "rgb("+cur_theme[1][0]+","+cur_theme[1][1]+","+cur_theme[1][2]+")";
        	document.getElementById(bar_id).className = "sec_color sel_color";
        	document.getElementById(bar_id).style.color = `rgb(`+cur_theme[2][0]+`,`+cur_theme[2][1]+`,`+cur_theme[2][2]+`)`
		//document.getElementById("content").appendChild(node);

	}
	make_exit_bttn(canvas_id);		
	x_buttons.add(canvas_id);
	z_index += 1;
	window_id += 1;

	return screen_id;
}


async function start_desktop() {
	document.getElementById("background").style.backgroundImage = "url('"+themes_wall[THEME_NAME]+"')"; 
        function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
        }

       	load_navbar();
	
	// anything under here and above push_icons_to_desktop will be run at DE startup


	make_about();
	// make_teto();
	
	push_icons_to_desktop()

	setTimeout(make_random, 100000);
	

	const data_url_param = new URLSearchParams(window.location.search);
	var ref_param = data_url_param.get('link');
	
	if(ref_param != null && ref_param != "") {
		console.log(ref_param);
		var result = installed_programs[ref_param];
		
		if(result != undefined)  {
			
			if(result["funct"] != null) {
				result["funct"]();
			}	
		}
	}

	//warns user if screen too small
	var height_test = document.getElementById("background").offsetHeight
	var width_test = document.getElementById("background").offsetWidth




	var warn_text = ""
	if((height_test <= 700 || width_test <= 1000) & !is_mobile) {
		warn_test = "Browser Window should be at least 1000 pixels wide and 700 pixels tall.<br> Current size is: "+width_test+"x"+height_test+" pixels"
		make_warn(warn_test,false)
	}
	


}


async function main_start() {	

	document.getElementById("logon").style.visibility = "hidden"; 

	function sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}
    
    // these are the functions that appear to make that fake systemd boot
    // first line is the string 
    // second line is true: failed, false: success, null: no status 
	var array_of_functions = [

	// function() { spawn_line("welcome to beeOS!",false) },
	function() { spawn_line("Loading initbeeFS",false)},
	function() {spawn_line("loading miku",false)},
	function() {spawn_line("loaded miku",false)},
	function() {spawn_line("killing program manager program",false)},
	function() {spawn_line("installing war thunder",false)},
	function() {spawn_line("commiting war crimes",false)},
	function() {spawn_line("removing Windows",false)},
	function() {spawn_line(bee_os_logo,false)},
	function() {spawn_line("being an Axolotl",false)},
	function() {spawn_line("beesh shell loaded",false)},
	function() {spawn_line("kernel tainted",null)},
	function() {spawn_line("NVbedia kernel module loaded which taints kernel",null)},
	function() {spawn_line("downloading anime girls",false)},	
	function() {spawn_line("Starting bddm (Bee's Desktop Display Manager) ",false)},
	function() {spawn_line("Started bddm",false)},
	function() {spawn_line("Deleting all knowlege of Java",false)},
	function() {spawn_line("Started rhinovirus",false)},
	function() {spawn_line("Starting Project Zomboid server",false)},
	function() {spawn_line("Started Project Zomboid server",false)},
	function() {spawn_line("Ignored Arch BTW",false)},
	function() {spawn_line("Discord kittens ignored",false)},
	function() {spawn_line("Started touch grass",false)},
	function() {spawn_line("Failed touch grass",true)},
	function() {spawn_line("Killed children(in JavaScript)",false)},
	function() {spawn_line("Started Hololive songs",false)},
	function() {spawn_line("Started Xeon E5-2680 CPU",false)},
	function() {spawn_line("Downloaded more RAM",false)},
	function() {spawn_line("Downloaded more CPU",false)},
	function() {spawn_line("Purchase a new GPU",true)},
	function() {spawn_line("SwapFS loaded",false)},
	function() {spawn_line("Starting The Finals",false)},
	function() {spawn_line("Started The Finals",false)},
	function() {spawn_line("Starting NetworkManager",false)},
	function() {spawn_line("Starting Apache (the helicopter)",false)},
	function() {spawn_line("Starting Bluetooth",false)},
	function() {spawn_line("Started NetworkManager",false)},
	function() {spawn_line("Started Apache (the helicopter)",false)},
	function() {spawn_line("Started Bluetooth",false)},
	function() {spawn_line("Starting weatherCLI",false)},
	function() {spawn_line("Starting package manager",false)},
	function() {spawn_line("Started package manager",false)},
	function() {spawn_line("Why are you reading this",false)}
	];	

	var sizeof_funct = array_of_functions.length -1;
	var index_at = 0;
	for (var item_at of array_of_functions) {
		if(debug != true) {
			await sleep(Math.random() * TEXT_LOAD_WAIT);		
		}
		item_at();		
	}
	if(debug != true) {
		await sleep(SCREEN_LOAD_WAIT);
	}
	const node = document.getElementById("content");
	while (node.firstChild) {
		node.removeChild(node.lastChild);
	}
        
	var desktop_icon_plate = document.createElement("div");
        desktop_icon_plate.id = "desktop";
        document.getElementById("content").appendChild(desktop_icon_plate);

	if(!is_mobile) {
		document.getElementById("logon").style.visibility = "visible"; 	
		//document.getElementById("content").style.visibility = "hidden";     
	}
	document.getElementById("content").style.height = "0%";
	if(is_mobile) {
		start_desktop()
	}


}

	document.getElementById("logon").style.visibility = "hidden";

if(skip_start == false) {
		
	main_start();
		

} else {
	
	const element = document.getElementById("logon");
	element.remove();	
	start_desktop();
	
}


