<?php
$FileName = "files/Storage.txt";
if(!file_exists($FileName)){
    $NoteStorage = fopen($FileName,"w");
    fputs($NoteStorage,$_POST["task"]);
}else{
    $NoteStorage = fopen($FileName,"a");
    fputs($NoteStorage,";".$_POST["task"]);
}
fclose($NoteStorage);
// header("Location: ../html/")

?>