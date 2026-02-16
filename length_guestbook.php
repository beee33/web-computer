<?php

# this is the php to get the length of comments in my digital guestbook


#ini_set('display_errors', '1');
#ini_set('display_startup_errors', '1');
#error_reporting(E_ALL);

# add your db credentials
$conn = new mysqli("localhost", "", "", "");

$stmt = $conn->prepare("SELECT COUNT(*) FROM `posts`");

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {

	while($row = $result->fetch_assoc()) {
		$max_uid = intval($row["COUNT(*)"]);
		echo $max_uid;
		exit();
	}
}
else "0";

?>
