<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
require_once 'config.php';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["error" => "Kapcsolódási hiba: " . $e->getMessage()]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Tábla meghatározása (alapértelmezett: megye)
$table = $_GET['table'] ?? 'megye';

// Megengedett táblák listája biztonsági okokból
$allowedTables = ['megye', 'helyszin', 'torony'];
if (!in_array($table, $allowedTables)) {
    echo json_encode(["error" => "Érvénytelen tábla név"]);
    exit();
}

switch ($method) {
    case 'GET':
        $stmt = $conn->prepare("SELECT * FROM $table");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        if ($table === 'megye') {
            $stmt = $conn->prepare("INSERT INTO megye (nev, regio) VALUES (:nev, :regio)");
            $stmt->execute(['nev' => $input['nev'], 'regio' => $input['regio']]);
        } elseif ($table === 'helyszin') {
            $stmt = $conn->prepare("INSERT INTO helyszin (nev, megyeid) VALUES (:nev, :megyeid)");
            $stmt->execute(['nev' => $input['nev'], 'megyeid' => $input['megyeid']]);
        } elseif ($table === 'torony') {
            $stmt = $conn->prepare("INSERT INTO torony (darab, teljesitmeny, kezdev, helyszinid) VALUES (:darab, :teljesitmeny, :kezdev, :helyszinid)");
            $stmt->execute($input);
        }
        echo json_encode(["message" => "Sikeres mentés"]);
        break;

    case 'PUT':
        if ($table === 'megye') {
            $stmt = $conn->prepare("UPDATE megye SET nev=:nev, regio=:regio WHERE id=:id");
        } elseif ($table === 'helyszin') {
            $stmt = $conn->prepare("UPDATE helyszin SET nev=:nev, megyeid=:megyeid WHERE id=:id");
        } elseif ($table === 'torony') {
            $stmt = $conn->prepare("UPDATE torony SET darab=:darab, teljesitmeny=:teljesitmeny, kezdev=:kezdev, helyszinid=:helyszinid WHERE id=:id");
        }
        $stmt->execute($input);
        echo json_encode(["message" => "Sikeres frissítés"]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("DELETE FROM $table WHERE id = :id");
            $stmt->execute(['id' => $id]);
            echo json_encode(["message" => "Sikeres törlés"]);
        } else {
            echo json_encode(["error" => "Hiányzó ID"]);
        }
        break;
}