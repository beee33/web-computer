<h1>My websites code</h1>
This is the code for my website https://isopodheaven.com 
<br>
I removed almost all the code relating to myself in this repo, so you can make your own fake desktop enviroment using my template. I kept my code for my guestbook https://isopodheaven.com/guestbook.html but removed all assocaitons to my website. If you would want to implement it, you would create your own database populate all the php files with mysqli parmeters. If you dont want to do that, you can just delete any file with the word guestbook in it:

```bash
rm  *guestbook*
```

<h3>Adding your own app</h3>
In order to create you own app. you need to edit main_thread.js and make a new applicaiton using make_application()
<br>
where the first string is application id, then the name of the function, titlebar name, file path of icon, location on desktop, application type: app, as well as the function envoked when the user clicks on the icon. 
<br>
<br>
like this:
<br>

```javascript
make_application("favorite_hobbies","make_hobby_window()","My Hobbies","/desktop_icons/hobbies.jpg",[1,1],"app",function() {make_hobby_window()});
```
<br>
<br>
After that, you need to make make_hobby_window also in main_thread.js function like this:

```javascript
function make_hobby_window() {
	var html = `<div class="text_color" style="color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);">about me</div>`
	var win_id = make_window(null,null,500,300,"Hobbies",html);
	add_icons_to_task_bar(win_id,"favorite_hobbies");
}
```
The first two parmeters in make_window are x and y positons, leaving them null makes it go to the center of the screen. The third parmeter is the window width. The fourth parmeter is the window height. Both are numbers representing pixels. 
<h4>Styling</h4>
These are the divs you need to add in order for your text and backgrounds inside your window to match the theme.

<br>

text inside window borders:

```html
<div class ="sel_color" color:rgb(`+cur_theme[2][0]+`,`+cur_theme[2][1]+`,`+cur_theme[2][2]+`);">
```

window border color:

```html
<div class ="sec_color" style="background-color:rgb(`+cur_theme[1][0]+`,`+cur_theme[1][1]+`,`+cur_theme[1][2]+`)"></div> 
```


text color inside windows:

```html
<div class="text_color" style="color:rgb(`+cur_theme[3][0]+`,`+cur_theme[3][1]+`,`+cur_theme[3][2]+`);"></div>
```

background color in windows:

```html
<div class="main_color" style="background-color:rgb(`+cur_theme[0][0]+`,`+cur_theme[0][1]+`,`+cur_theme[0][2]+`)">
```

<h4>Configuration</h4>

most things are stored in config.js. the rest(like ascii icons) on the first few lines of main_thread.js 


