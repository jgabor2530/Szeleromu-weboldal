<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'config.php';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $method = $_SERVER['REQUEST_METHOD'];
    $table = isset($_GET['table']) ? $_GET['table'] : 'megye';
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    
    $input = json_decode(file_get_contents('php://input'), true);

    switch ($method) {
        case 'GET':
            $stmt = $conn->prepare("SELECT * FROM $table");
            $stmt->execute();
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;

        case 'POST':
            if ($table == 'megye') {
                $stmt = $conn->prepare("INSERT INTO megye (nev, regio) VALUES (?, ?)");
                $stmt->execute([$input['nev'], $input['regio']]);
            } elseif ($table == 'helyszin') {
                $stmt = $conn->prepare("INSERT INTO helyszin (nev, megye_id, tipus) VALUES (?, ?, ?)");
                $stmt->execute([$input['nev'], $input['megye_id'], $input['tipus']]);
            } elseif ($table == 'torony') {
            // A te táblád mezői: darab, teljesitmeny, kezdev, helyszinid 
            $sql = "INSERT INTO torony (darab, teljesitmeny, kezdev, helyszinid) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            // Itt az $input kulcsainak egyezniük kell a React payload-dal
            $stmt->execute([$input['darab'], $input['teljesitmeny'], $input['kezdev'], $input['helyszinid']]);
            }
            echo json_encode(["message" => "Sikeres mentés!", "id" => $conn->lastInsertId()]);
            break;

        case 'PUT':
            if (!$id) die(json_encode(["error" => "Hianyzik az ID"]));
            
            if ($table == 'megye') {
                $stmt = $conn->prepare("UPDATE megye SET nev = ?, regio = ? WHERE id = ?");
                $stmt->execute([$input['nev'], $input['regio'], $id]);
            } elseif ($table == 'helyszin') {
                $stmt = $conn->prepare("UPDATE helyszin SET nev = ?, megye_id = ?, tipus = ? WHERE id = ?");
                $stmt->execute([$input['nev'], $input['megye_id'], $input['tipus'], $id]);
            } elseif ($table == 'torony') {
                $sql = "UPDATE torony SET darab = ?, teljesitmeny = ?, kezdev = ?, helyszinid = ? WHERE id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->execute([$input['darab'], $input['teljesitmeny'], $input['kezdev'], $input['helyszinid'], $id]);
            }
            echo json_encode(["message" => "Sikeres frissítés!"]);
            break;

        case 'DELETE':
            if (!$id) die(json_encode(["error" => "Hianyzik az ID"]));
            $stmt = $conn->prepare("DELETE FROM $table WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["message" => "Sikeres törlés!"]);
            break;
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Adatbazis hiba: " . $e->getMessage()]);
}