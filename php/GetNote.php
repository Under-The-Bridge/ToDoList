<?php
$FileName = "files/Storage.txt";
$file = fopen($FileName,"r");

echo json_encode(explode(";",fgets($file)));

?>