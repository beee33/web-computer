var themes_desk= {}; 

// list of installed programs
var installed_programs = {};

// color types in this order
// first is for main background color on text
// second is for window color
// third is for text on background color
// fourth is text on main background


themes_desk["blue-pastel"] = [[255,255,255],[0,171,219],[153,244,252],[22,20,61]];
themes_desk["green-pastel"] = [[255,255,255],[128, 244, 153],[44, 115, 59],[16,43,20]];
themes_desk["cyber-city"] = [[44,153,204],[16,18,86],[244, 161, 255],[212, 247, 255]];

var themes_wall = {};

themes_wall["blue-pastel"] = "wallpaper.webp"
themes_wall["green-pastel"] = "wallpaper3.webp"
themes_wall["cyber-city"] = "wallpaper2.webp"

var THEME_NAME = "blue-pastel";

// website that comes loaded with web browser, Alot of websites will not load due to CORS.
var DEFAULT_WEBSITE = "https://weather.gov"


// list of ominous messages that will randomly appear
var OM_MESSAGE = [
	"Miku has escaped!",
	"Linux WILL one day be installed on your computer",
	"This is not a warning",
	"Sorry, false alarm!",
	"Have you tried Linux?",
	"Your computer is gaining consciousness",
	"Are you dreaming right now?",
	"Could not download more RAM, use SWAP instead",
	"This is a message",
	"Hi",
	"I NEED BLOOD TO FEED",
	"THE MACHINE IS HUNGRY",
	"Am I real?",
	"I use Arch BTW",
	"None of these are real",
	"Was Sisyphus happy and are you?",
]

// OS name
var OS_NAME = "BeeOS"

// Version Name
var VER_NAME = "v0.2"


// replace with your ascii text logo
var os_logo = `


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

// this is the ascii logo of your "os" for beefetch(my fake neofetch clone)
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

// OS icon, shown at the bottom left corner of your desktop
OS_ART_LOGO = "desktop_icons/os_logo.png"

// user avatar
USER_ICON = '/moon.jpg'

// filenames of memes stored in /memes, stored as an array
var MEMES = [
    "image0.gif"
]

// program start function, program human name, icon path(null if none), appear in desktop (null if not and coords if yes starts at 1,1 [x,y])
// you can comment any of these lines to remove an app
make_application("theme_picker","make_theme_window()","Theme Picker","/desktop_icons/dropper.jpg",[1,1],"app",function() {make_theme_window()});
make_application("web_browser","make_web_browser()","Web Browser","desktop_icons/www_icon.png",[1,2],"app",function() {make_web_browser()});
make_application("credits","make_credits()","Credits","/desktop_icons/credits.png",[1,3],"app",function() {make_credits()});
make_application("about","make_about()","Welcome to "+OS_NAME,null,null,"app",function() {make_about()});
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



// these are the functions that appear to make that fake systemd boot
// first line is the string
// second line is true: failed, false: success, null: no status

var array_of_functions_for_boot = [

	function() { spawn_line("welcome to beeOS!",false) },
	function() { spawn_line("Loading initbeeFS",false)},
	function() {spawn_line("loading miku",false)},
	function() {spawn_line("loaded miku",false)},
	function() {spawn_line("killing program manager program",false)},
	function() {spawn_line("installing war thunder",false)},
	function() {spawn_line("commiting war crimes",false)},
	function() {spawn_line("removing Windows",false)},
	function() {spawn_line(os_logo,false)},
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



// how many error messages will appear when "do not click button appears"
var REPEAT_WARN = 15;

// testing
var debug = false;
var skip_start = false;

// width of the edges of window
var border_width = 4;

// how tall the taskbar is
var taskbar_height = 40;

// width of the square that each SET_ICON_SIZE is
var SET_ICON_WIDTH = 100;
var SET_ICON_SIZE = 40;

// percent of screen exit button bar will take
var HOME_ICON_MOBILE = .2;

// margin of home icon
var HOME_ICON_MARGIN = 20;

// what persent of screen height does images take
var IMG_SCALE_SIZE = .7;

// screen load times in milliseconds
// how much time it takes for screen to load after text fully loaded used to simulate DE loading
var SCREEN_LOAD_WAIT = 1000;

var TEXT_LOAD_WAIT = 100;

var VOL_SLIDER_HEIGHT = 20;

var VOL_SLIDER_WIDTH = 200;

// float between 0 and 1
var VOLUME_DEFAULT = .75;





let cur_theme = themes_desk[THEME_NAME];

var box_top_height = 20;

var mouse_enabled_logon = true;



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



const data_url_param = new URLSearchParams(window.location.search);
var ref_param = data_url_param.get('skip_start');

if(ref_param == "true"){  
	skip_start = true;
}
console.log(window.navigator.userAgent);

// checks the user agent to see if it is an mobile device
var is_mobile = false;
if ((window.navigator.userAgent).toString().toLowerCase().search("mobile") == -1) {
	is_mobile = false;
} else {
	is_mobile = true;
}

// mobile devices have seprate size icon sizes than desktop
if(is_mobile) {
	SET_ICON_SIZE = (SET_ICON_SIZE/SET_ICON_WIDTH)*document.getElementById("content").offsetWidth/4
	SET_ICON_WIDTH = document.getElementById("content").offsetWidth/4;
	
	REPEAT_WARN = 1;
}

// UNIX time app started
var START_TIMESTAMP = Math.floor(Date.now() / 1000);
