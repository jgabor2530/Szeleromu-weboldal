<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Adatbázis kapcsolat (XAMPP alapbeállítások)
$host = "localhost";
$db_name = "szeleromu";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    echo json_encode(["error" => "Kapcsolódási hiba: " . $exception->getMessage()]);
    exit();
}


$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET': //Megyék lekérdezése
        $stmt = $conn->prepare("SELECT * FROM megye");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST': //Új megye beszúrása
        $stmt = $conn->prepare("INSERT INTO megye (nev, regio) VALUES (:nev, :regio)");
        $stmt->execute(['nev' => $input['nev'], 'regio' => $input['regio']]);
        echo json_encode(["message" => "Sikeres mentés"]);
        break;

    case 'PUT': //Meglévő megye módosítása
        $stmt = $conn->prepare("UPDATE megye SET nev = :nev, regio = :regio WHERE id = :id");
        $stmt->execute(['nev' => $input['nev'], 'regio' => $input['regio'], 'id' => $input['id']]);
        echo json_encode(["message" => "Sikeres frissítés"]);
        break;

    case 'DELETE': //Megye törlése az URL paraméter alapján
        $id = $_GET['id'];
        $stmt = $conn->prepare("DELETE FROM megye WHERE id = :id");
        $stmt->execute(['id' => $id]);
        echo json_encode(["message" => "Sikeres törlés"]);
        break;
}
?>