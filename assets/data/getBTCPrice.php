<?php
  // get BPI real-time data from trust worthy site (CoinDesk Bitcoin Price Index API)
  $url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  $data = json_decode(file_get_contents($url), true);
  $btcPrice = $data["bpi"]["USD"]["rate_float"];
  print_r(json_encode($btcPrice));
  //$btc = 655.525;
  //print_r($btc);
?>
