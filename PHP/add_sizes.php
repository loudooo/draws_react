<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('content-type:application/json');
header('content-type: text/html; charset=utf-8');

$user = "lesmi1346413";
$pass = 'vV4@*ZJEc9nPR8m';
$host = '185.98.131.109';
$db = 'lesmi1346413';

try {
    // Récupération des datas
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['artist_id'])) {
        throw new Exception("Aucune référence trouvée en POST avec la clé 'artist_id'", 121);
    }

    $artist_id = $data['artist_id'];

    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $query = "SELECT * FROM `drawings_info` WHERE drawings_info.artist_id=$artist_id ORDER BY date_creation DESC";
    $sth = $conn->prepare($query);

    // $sth->bindValue(':id', 'ELEC SA', PDO::PARAM_STR);
    $sth->execute();

    $resultat = $sth->fetchAll(PDO::FETCH_ASSOC);
    // var_dump($resultat);
    $first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/drawings_ludo/";
    foreach ($resultat as $key => $value) {
        $url = $first_url . $value['url'];
        $data = getimagesize($url);
        $width = $data[0];
        $height = $data[1];
        var_dump($width, $height);
        $id = $value["id"];
        $query_update = "UPDATE `drawings_info` SET `width`=$width,`height`=$height WHERE id=$id";
        $sth = $conn->prepare($query_update);
        $sth->execute();
    }

    echo json_encode(encodeArrayUtf8($resultat));
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    $status = $e->getCode();
    // http_response_code($status);
}

$conn = null;

function encodeArrayUtf8($tab)
{
    $final_tab = array();
    foreach ($tab as $row_key => $row_value) {
        $tmp_tab = null;
        foreach ($row_value as $key => $value) {
            $tmp_tab[$key] = utf8_encode($value);
        }
        array_push($final_tab, $tmp_tab);
    }

    return $final_tab;
}
