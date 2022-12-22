


	<?php
	$who = $_GET['w'];
    $score = $_GET['s'];
	


	try
		{
      /*	ancienne bdd $bdd = new PDO('mysql:host=exemplewpy218.mysql.db;dbname=exemplewpy218;charset=utf8', 'exemplewpy218', 'Baltimore69');
      */
    		//$bdd = new PDO('mysql:host=localhost;dbname=ruby;charset=utf8', 'root', '');
    		$bdd = new PDO('mysql:host=lebonubjo.mysql.db;dbname=lebonubjo;charset=utf8', 'lebonubjo', 'Baltimore69');
    }

	catch (Exception $e)
		{
	        die('Erreur : ' . $e->getMessage());
		}

// Ajoute une entrée dans la table mt
$bdd->exec('INSERT INTO ruby(who,score) VALUES("'.$who .'", "'.$score.'")');

?>

<?php



//  header('Location: http://www.exemple.website/mtr/mt-score.php');

  header('Location: /rubypac/resultpage.php');



  exit();
?>
