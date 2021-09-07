<?php
header("Access-Control-Allow-Origin: *");
header('content-type: text/html; charset=utf-8');
// include_once('/PHP/resizePicture.php');

$csv_separator = '|';
$csv_end_line = '¤';
$line_break = "\n";
$trema = '"';
$artist = "ludo";
try {

    // dossiers d'image
    $drawing_path = '../IMG/drawings_' . $artist . '/';
    $resize_drawing_path = '../IMG/resize_drawings_' . $artist . '/';
    $filename = "../CONF_FILES/ludo.txt";

    copyDatas($filename);

    echo json_encode([
        'success' => 'Upload effectué avec succès !',
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    // echo ($e->getCode());
    $status = $e->getCode();
    // http_response_code(128);
}

function addTimeStampToName($name)
{
    $extension = pathinfo($name, PATHINFO_EXTENSION);
    $last_pos = strrpos($name, '.', 0);
    $final_name = substr($name, 0, $last_pos);
    $date = date_create();
    $timestamp = date_timestamp_get($date);
    $final_name .= '_' . $timestamp;
    $final_name = $final_name . '.' . $extension;
    return $final_name;
}

// Création et mise à jour du fichier
function copyDatas($filename)
{
    // $is_file_exist = is_file($filename);
    // $old_txt = '';
    // if ($is_file_exist) {
    //     $old_txt = file_get_contents($filename);
    // }
    // var_dump($old_txt);
    if ($file = fopen($filename, "r")) {
        while (!feof($file)) {
            $line =  utf8_encode(fgets($file));

            $tab_infos = explode("|", $line);
            $title = utf8_decode(substr($tab_infos[0], 1, -1));
            $date = utf8_encode(substr($tab_infos[1], 1, -1));
            $path = utf8_encode(substr($tab_infos[2], 1, -1));
            $category = utf8_encode(substr($tab_infos[3], 1, -1));
            $medium = utf8_encode(substr($tab_infos[4], 1, -6));
            // print_r($title);
            $tab_date = explode("-", $date);
            $new_date = $tab_date[2] . '-' . $tab_date[1] . '-' . $tab_date[0];
            print_r($tab_infos);
            // print_r($medium);
            // print_r($path);
            // print_r($category);
            // addToDb(0, $title, $new_date, $path, $category, $medium);
        }
        fclose($file);
    }
    // addToDb(0,"aaa","12-01-2021","url.jpg","exercice","feutre");
}

function addToDb($artist_id, $title, $date, $path, $category, $medium)
{
    $user = "lesmi1346413";
    $pass = 'vV4@*ZJEc9nPR8m';
    $host = '185.98.131.109';
    $db = 'lesmi1346413';
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    var_dump($conn);
    $query = "INSERT INTO `drawings_info`(`artist_id`, `date_creation`, `url`, `title`, `medium`, `category`) 
    VALUES ('$artist_id','$date','$path','$title','$medium','$category')";
    $sth = $conn->prepare($query);
    $sth->execute();
}
