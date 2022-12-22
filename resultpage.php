<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <!-- <link href="https://fonts.googleapis.com/css?family=Roboto:100,900i" rel="stylesheet"> -->
    <!-- <link rel="stylesheet" href="/public/css/style.css" /> -->
    <link rel="stylesheet" href="/rubypac/public/css/style.css" />

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <title>Ruby's game - results</title>
</head>

<!-- /*************************************************************
* Ruby game.*
* Description: Trouver l'os caché dans une maison et *
* éviter les amis de Ruby que sont *
* Max, Miky et Belcha et Chichon. *
* Author: LeBonUnivers *
* visit: https://lebonunivers.fr *
*************************************************************/ -->

<body class="background">


    <!-- /*************************************************************
* page Head.*
*************************************************************/ -->

    <section id="pageHead">
        <h1 class="titre">
            <span class="titre__baseline">r</span><span class="titre__baseline--changed">u</span><span
                class="titre__baseline">b</span><span class="titre__baseline">y</span>
        </h1>
    </section>

    <section>
        <?php
		// * ouverture de la BDD
		try {
			//$bdd = new PDO('mysql:host=localhost;dbname=ruby;charset=utf8', 'root', '');
			$bdd = new PDO('mysql:host=lebonubjo.mysql.db;dbname=lebonubjo;charset=utf8', 'lebonubjo', 'Baltimore69');
		} catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}

		// * si ok on récupère tout le contenu de la table highscores

		//	$reponse = $bdd->query('SELECT who, score  FROM highscores ORDER BY score DESC LIMIT 10');
		$reponse = $bdd->query('SELECT who, score  FROM ruby ORDER BY score DESC LIMIT 10');

		// * on affiche chaque entrée une à une	
		?>

        <div>
            <!-- tableau des &à meilleurs scores -->
            <table class="tableScore">
                <!-- en-tête du tableau -->
                <tr>
                    <td class="tableScore"></td>
                    <td class="tableScore--yel">Name</td>
                    <td></td>
                    <td class="tableScore--yel">Score</td>
                </tr>

                <!-- lignes BDD du tableau -->

                <?php
				$i = 1;
				while ($donnees = $reponse->fetch()) {
				?>

                <tr>
                    <td class="tableScore--yel tableScore--margeR "><?php echo $i; ?>.</td>
                    <td><?php echo $donnees['who']; ?></td>
                    <td>......................</td>
                    <td><?php echo $donnees['score']; ?></td>
                </tr>

                <?php
					$i++;
				}

				$reponse->closeCursor(); // Termine le traitement de la requête
				?>

            </table>

            <section class="btn">
                <div class="gameover__btn" onclick="window.location.href = '/rubypac/index.html';">go back</div>
            </section>


            <!-- /*************************************************************
        * FIN DES PAGES.*
        *************************************************************/ -->


</body>

<!-- <script src="/public/js/rubyscript.js" charset="utf-8"></script> -->
<script src="/rubypac/public/js/rubyscript.js" charset="utf-8"></script>

</html>