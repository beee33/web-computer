var themes_desk= {}; 

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

let cur_theme = themes_desk[THEME_NAME];

var box_top_height = 20;

var mouse_enabled_logon = true;

// website that comes loaded with web browser, Alot of websites will not load due to CORS.
var DEFAULT_WEBSITE = "https://weather.gov"

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

// filenames of memes stored in /memes, stored as an array
var MEMES = [
    "image0.gif"
]

// how many error messages will appear when "do not click button appears"
var REPEAT_WARN = 15;

// testing
var debug = false;
var skip_start = false;


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
