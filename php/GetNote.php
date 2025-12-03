<?php
$FileName = "files/Storage.txt";
if(!file_exists($FileName)){
    $NoteStorage = fopen($FileName,"w");
}else{
    $NoteStorage = fopen($FileName,"a");
}
fputs($NoteStorage,$_POST["task"]."\n");
fclose($NoteStorage);
// header("Location: ../html/")

?>