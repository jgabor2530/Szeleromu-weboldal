Magyarországi Szélerőművek - Web-programozás 1 Beadandó

Ez a projekt a Neumann János Egyetem Web-programozás 1 tantárgyának előadás beadandó feladata. Az alkalmazás a magyarországi szélerőművek (megyék, helyszínek, tornyok) adatait dolgozza fel különböző modern webes technológiák segítségével.

Készítők:
Veszelszki Tamás (Neptun: PO4YGX)
Juhász Gábor (Neptun: R1HXNV) 

 Az alkalmazás elérhetősége:
Éles weboldal:  http://szeleromu.nhely.hu/index.html
A projekt futtatásához XAMPP (vagy hasonló webszerver) használata javasolt a PHP backend miatt.*

Megvalósított Feladatrészek (Menüpontok):

A projekt a kiadott követelmények alapján az alábbi technológiákat és megoldásokat tartalmazza:

1. JS CRUD (`javascript.html`) Tisztán kliensoldali JavaScript alapú Create, Read, Update, Delete műveletek egy memóriában tárolt tömbön.
2. React CRUD (`react.html`) Helyi gépen, Vite környezetben (Babel/standalone nélkül) fejlesztett React alkalmazás adatkezelésre.
3. SPA - Single Page Application (`spa.html`) Két önálló React komponens (`Weather App` és `Expense Tracker`), amelyek között belső állapottal (`useState`) történik a navigáció.
4. Fetch API (`fetchapi.html`) Vanilla JavaScript hálózati kérések a MySQL adatbázishoz egy PHP (`api.php`) backend felületen keresztül.
5. Axios (`axios.html`) React környezetben, Axios csomaggal megvalósított kommunikáció a PHP/MySQL backenddel.
6. OOJS Szimuláció (`oojs.html`) Objektumorientált JavaScript megoldás (class, constructor, extends, super) egy vizuális Szélerőmű-építő szimulációval.

Adatbázis (PHP / MySQL)
A szerveroldali kommunikációt igénylő menüpontok (Fetch API, Axios) a `webprog_beadando` nevű helyi MySQL adatbázisra támaszkodnak.
A backend a PDO-t használja a biztonságos adatkapcsolathoz.
Az adatbázis struktúrája (és a kiinduló adatok) a feladathoz mellékelt dokumentáció alapján készültek.

Verziókövetés és Projektmunka
A fejlesztés a GitHub Forking módszerével, elosztott projektmunkában készült. A commitok visszakövethetők a tároló *Contributors* és *Commit history* menüpontjaiban, ahol látható mindkét fejlesztő időben arányosan elosztott munkája.