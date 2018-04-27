<?php
	global $base_url;
	$theme_route = $base_url . '/' . drupal_get_path('theme',$GLOBALS['theme']);
?>

<div class="row">

	<select name="empresa" class="empresa_select">
		<?php 
			print '<option value="none">Elija una empresa</option>';
			foreach($empresas as $empresa):
	  		print '<option value="'.$empresa->empresa_id.'">'.$empresa->nombre.'</option>';
	   	endforeach;
	  ?>
	</select>

</div>

<div class="row">
	<div class="containerDispositivos"></div>
</div>

<div class="row">
	
	<div class="loader"><img src="<?= $theme_route; ?>/misc/loader.gif" /></div>

	<div class="message"></div>
	<div class="containerSensor"></div>	

</div>
