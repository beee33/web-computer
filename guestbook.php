<?php

# this is the php for my digital guestbook

#ini_set('display_errors', '1');
#ini_set('display_startup_errors', '1');
#error_reporting(E_ALL);


$chunks = 8;

$index = intval($_GET["index"]);

if($index < 0) {
	echo "{\"error\":\"index must be postive/zero\"}";
}

# add your db credentials
$conn = new mysqli("localhost", "", "", "");


$size_stmt = $conn->prepare("SELECT MAX(uid) FROM posts; ");
	
$size_stmt->execute();
$result = $size_stmt->get_result();

$max_uid = 0;

if ($result->num_rows > 0) {

	while($row = $result->fetch_assoc()) {
		$max_uid = intval($row["MAX(uid)"]);
	}
}



$last_uid = 0;

$last_chunk = $max_uid; 

$names = array();
$times = array();
$posts = array();
$title = array();

for($loops = $index; $loops >= 0;$loops--) {
	$stmt = $conn->prepare("select * from `posts` where uid <= ? order by uid desc limit ?");
	$stmt->bind_param('ii',$last_chunk, $chunks);

	$stmt->execute();
	$result = $stmt->get_result();

	if ($result->num_rows > 0) {
		$count = 0;
		while($row = $result->fetch_assoc()) {
			$last_uid = $row["uid"];
			
			if($loops == 0) {
			array_push($names, $row["name"]);
			array_push($times, $row["post_date"]);
			array_push($posts, $row["post"]);
			array_push($title, $row["title"]);
			}
			$count += 1;
		}
		
		if($count == 0) {
			echo "{\"error\":\"no items to get\"}";
			exit();
		}
		$last_chunk = intval($last_uid) -1 ;
	} else {
		echo "{\"error\":\"no items to get\"}";
		exit();
	}


	if($loops == 0) {
		if(sizeof($names) != 0) {
			$full_string = "{\"error\": \"none\", \"posts\": [";
			for($index_of = 0; $index_of < sizeof($names); $index_of ++) {
				$string = "{\"post\":\"". base64_encode($names[$index_of]) . "\",\"title\":\"" . base64_encode( $title[$index_of]) . "\",\"time\":\"" . base64_encode($times[$index_of]) . "\", \"content\":\"" . base64_encode($posts[$index_of]) . "\"}";
				if(sizeof($names) -1 != $index_of) {
					$string = $string . ",";
				}
				$full_string = $full_string . $string;
			}
			$full_string = $full_string .  "]}";
			echo $full_string;
			
			exit();
		} else {
			echo "{\"error\":\"no items to get\"}";
			exit();
		}
	}
} 

#echo "{error:\"no items to get\"}";

?>
