<?php
$FileName = "files/Storage.txt";
$file = fopen($FileName,"r");
$text = explode(";",fgets($file));
$note = $_POST["task"];

$changedText = "";

for ($i=0; $i < count($text); $i++) { 
    if($text[$i] == $note){
        continue;
    }
    $changedText .= ($i == 0)?$text[$i]:";".$text[$i];
}

$file = fopen($FileName,"w");
fputs($file, $changedText);
?>