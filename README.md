<h1>My websites code</h1>
This is the code for my website https://isopodheaven.com 
<br>
I removed almost all the code relating to myself in this repo, so you can make your own website using my template.

<h3>Adding your own app</h3>
In order to create you own app. you need to edit main_thread.js and make a new applicaiton using make_application()
<br>
where program start function, program human name, icon path(null if none), appear in desktop (null if not and coords if yes starts at 1,1 [x,y]) 
<br>
like this:
<br>
make_application("theme_picker","make_theme_window()","Theme Picker","/desktop_icons/dropper.jpg",[1,1],"app",function() {make_theme_window()});
