<?php
if(isset($_POST) &&! empty($_POST))
$errorMSG = "";

if (empty($_POST["fullname"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["fullname"];
}

if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

if (empty($_POST["msg_subject"])) {
    $errorMSG .= "Subject is required ";
} else {
    $msg_subject = $_POST["msg_subject"];
}


if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}


$EmailTo = "nss@nitjsr.ac.in";
$Subject = "New Message Received";

$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Subject: ";
$Body .= $msg_subject;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";


$success = mail($EmailTo, $Subject, $Body, "From:".$email);


if ($success && $errorMSG == ""){
   header("Location:http://nitjsr.ac.in/nss");
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>
