<?php
  // send contact message to contact@bitcoinkenya.com
  $data = json_decode(file_get_contents('php://input'));
  $subject = $data->subject;
  $sender = $data->name;
  $timeSent = $data->timeSent;
  $comment = $data->message;
  $body= "You received a message:  $timeSent\n" ."From:  $sender\n". "$comment";
  $email = $data->email;
  $to = 'contact@bitcoinkenya.com';

  $headers  = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type: text/html; charset=utf-8" . "\r\n";
  $headers .= "From: ". $email. "\r\n";
  $headers .= "Reply-To: ". $email. "\r\n";
  $headers .= "X-Mailer: PHP/" . phpversion();
  $headers .= "X-Priority: 1" . "\r\n";
  //mail($to, $subject, $body, $headers);
  echo json_encode("Sent Successfully");
?>
