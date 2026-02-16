<?php


# this is the php used to make a new comment on my digital guestbook

# this is just a random string to prevent automated bots
$key = "";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);



if(false == isset($_GET["name"])) {
	echo "{\"error\":\"no name\"}";
	exit();
}
if(false == isset($_GET["post"])) {
        echo "{\"error\":\"no post\"}";
        exit();
}
#if(false == isset($_GET["content"])) {
#        echo "{\"error\":\"no content\"}";
#        exit();
#}
if(false == isset($_GET["key"])) {
	echo "{\"error\":\"need key\"}";
        exit();
}

$name = $_GET["name"];
$post = $_GET["post"];
$content = $_SERVER['REMOTE_ADDR'];


if ($_GET["key"] == $key) {		
    
    # add your db credentials
	$conn = new mysqli("localhost", "", "", "");


	$ban_check = $conn->prepare("SELECT * FROM `bans` WHERE banned=1 AND ip=?;");
	$ban_check->bind_param('s', $content);
	
	$ban_check->execute();
        $result = $ban_check->get_result();

	$count = 0; 
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$count +=1;
		}
	}	
	if($count > 0) {
		echo "{\"error\":\" Your IP was banned from posting!\"}";
		exit();
	}

	
	$stmt = $conn->prepare("INSERT INTO `posts`(`post_date`, `name`, `post`, `uid`, `title`) VALUES (CURRENT_TIMESTAMP,?,?,NULL,?);");
	$stmt->bind_param('sss',$name, $post, $content);

	$stmt->execute();
	$result = $stmt->get_result();
	
	echo "{\"error\":\"none\"}";
} else {
	echo "{\"error\":\"bad key\"}";
}

?>
