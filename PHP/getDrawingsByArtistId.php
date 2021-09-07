<?php
header("Access-Control-Allow-Origin: *");
// header('content-type: text/html; charset=utf-8');

$user = "lesmi1346413";
$pass = 'vV4@*ZJEc9nPR8m';
$host = '185.98.131.109';
$db = 'lesmi1346413';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $query = "SELECT * FROM `drawings_info`";
    $sth = $conn->prepare($query);
    // $sth->bindValue(':id', 'ELEC SA', PDO::PARAM_STR);
    $sth->execute();
    /*Retourne un tableau associatif pour chaque entrée de notre table
  *avec le nom des colonnes sélectionnées en clés*/
    $resultat = $sth->fetchAll(PDO::FETCH_ASSOC);
    var_dump($resultat);

    echo json_encode($resultat);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    $status = $e->getCode();
}

$conn = null;
