<?php
$FileName = "files/Storage.txt";
if(!file_exists($FileName)){
    echo 123;
    $NoteStorage = fopen($FileName,"w");
}else{
    $NoteStorage = fopen($FileName,"a");
}
fputs($NoteStorage,$_GET["NoteName"]."\n");
// header("Location: ../html/")

?>