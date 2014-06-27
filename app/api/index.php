<?php

$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : false;
$file = $endpoint.'.json';


header('Content-Type: application/json');

if ($endpoint) {
	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_URL => 'http://worldcup.kimonolabs.com/api/'.$endpoint."?limit=100&apikey=9144470129c2788e93b377ffa8faa3ad".($endpoint === 'players' ? '&sort=goals,-1' : ($endpoint === 'teams' ? '&sort=goalsFor,-1' : ''))
	));
	$output = curl_exec($curl);
	$httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);

	http_response_code(200);

	if ($httpcode === 200) {
		file_put_contents($file, $output);
		echo $output;
	} else {
		echo file_get_contents($file);
	}
}
else {
	http_response_code(404);
}
?>