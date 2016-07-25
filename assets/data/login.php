<?php
  // login user
  $loginUser = json_decode(file_get_contents("php://input"));
  $loginMail = $loginUser->loginMail;
  $loginPass = $loginUser->loginPass;
    if($loginMail === "test@test.com" && $loginPass === "testpass"){
      session_start();
      $_SESSION['uid'] = uniqid('btcke').uniqid();
      print $_SESSION['uid'];
    }
    else {
      print "Error";
    }

?>
