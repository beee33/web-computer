<h1>My websites code</h1>
This is a custom desktop environment built for personal websites. 

<h1>features</h1>
Fake systemd like boot:

https://github.com/user-attachments/assets/1a725e0c-fc18-4c6e-a639-19f6ab509db1




User login page:

https://github.com/user-attachments/assets/59f0e6e9-ce51-4b9b-9702-dcfd737e2916


Window manager:

https://github.com/user-attachments/assets/a838853b-9bb4-46f6-8392-9de0c9e2c50a


Custom apps:



https://github.com/user-attachments/assets/943725c3-f943-4553-99d3-58cd9f6828cb




Theming:

https://github.com/user-attachments/assets/158b2100-3c7c-4816-b430-b8df459d5c1c


Digital guestbook:



https://github.com/user-attachments/assets/ec40b0b4-4709-4b0e-bd90-e6680b2cec21



<br>
<br>
I removed almost all the code relating to my myself in this repo(eg: personal blogs, about me page, github links), so you can make your own fake desktop enviroment using this template to make it unique to yourself. If you want to see what can be done: visit my website at https://isopodheaven.com

<h3>Install</h3>

download:

```bash
git clone https://github.com/beee33/web-computer
cd web-computer
```

I kept my code for my guestbook https://isopodheaven.com/guestbook.html but removed all assocaitons to my website. If you would want to implement it, go to: <a href="#enabling-the-guestbook">Enabling the Guestbook</a>. If you dont want to do that, you can just delete any file with the word guestbook in it. The website will not break:

```bash
rm  *guestbook*
```

<h4>Running</h4>
You can just plop this into any web server eg: apache or nginx.

For testing you can use npx instead:
```bash
npx http-server ./ -o -p 9999 
```


<h3>Adding your own app</h3>
In order to create you own app. you need to edit main_thread.js and make a new applicaiton using make_application()
<br>
where the first parameter is application id, then the name of the function, titlebar name, file path of icon, location on desktop, application type( the only option is app), as well as the function envoked when the user clicks on the icon. 
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
The first two parmeters in make_window are x and y positions, leaving them both null makes it go to the center of the screen. The third parmeter is the window width. The fourth parmeter is the window height. Both are numbers representing pixels. The last parameter is the html that will be put into the window.
<h4>Styling</h4>
These are the divs you need to add in order for your text and backgrounds inside your window to match the theme.

<br>
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

most things are stored in config.js. The rest(like ascii icons) on the first few lines of main_thread.js. 

<h4>Enabling The guestbook</h4>
todo
