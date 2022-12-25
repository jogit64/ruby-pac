<?php
$who = $_GET['w'];
$score = $_GET['s'];


try {

	$bdd = new PDO('mysql:host=lebonubjo.mysql.db;dbname=lebonubjo;charset=utf8', 'lebonubjo', 'Baltimore69');
} catch (Exception $e) {
	die('Erreur : ' . $e->getMessage());
}

// Ajoute une entrée dans la table mt
$bdd->exec('INSERT INTO ruby(who,score) VALUES("' . $who . '", "' . $score . '")');

?>

<?php

header('Location: /rubypac/resultpage.php');

exit();
?>