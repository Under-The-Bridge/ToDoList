<?php
$FileName = "files/Storage.txt";
$file = fopen($FileName,"r");
$text = explode(";",fgets($file));
$noteToChange = $_POST["task"];
$nameToChange = $_POST["name"];

$changedText = "";

for ($i=0; $i < count($text); $i++) { 
    if($text[$i] == $noteToChange){
        $changedText .= ($i == 0)?$nameToChange:";".$nameToChange;
        continue;
    }
    $changedText .= ($i == 0)?$text[$i]:";".$text[$i];
}
echo $changedText;
// $file = fopen($FileName,"w");
// fputs($file, $changedText);
?>