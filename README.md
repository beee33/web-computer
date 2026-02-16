<h1>My websites code</h1>
This is the code for my website https://isopodheaven.com 
<br>
I removed almost all the code relating to myself in this repo, so you can make your own website using my template.

<h3>Adding your own app</h3>
In order to create you own app. you need to edit main_thread.js and make a new applicaiton using make_application()
<br>
where the first string is application id, then the name of the function, titlebar name, location of icon, location on desktop, application type: app, as well as the function envoked when the user clicks on the icon.
<br>
<br>
like this:
<br>

```javascript
make_application("favorite_hobbies","make_hobby_window()","My Hobbies","/desktop_icons/hobbies.jpg",[1,1],"app",function() {make_hobby_window()});
```
<br>
<br>
After that, you need to make make_hobby_window function like this:

```javascript
make_hobby_window() {
  var html = "<div> about me </div>";
  var win_id = make_window(null,null,win_width,win_height,"Warning",html);
  add_icons_to_task_bar(win_id,"favorite_hobbies");
}
```
The first two parmeters are x and y positons, leaving them null makes it go to the center of the screen
