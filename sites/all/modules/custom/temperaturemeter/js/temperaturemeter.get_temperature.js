function callDispositivosData(idEmpresa = null) {
	jQuery.ajax({
    url: 'http://temperaturemeter.com/temperaturemeter/get/dispositivosPerEmpresa',
    type: 'POST',
		dataType: 'jsonp',
    data: jQuery.param({idEmpresa : idEmpresa}) ,
    success: function (data) {

    	jQuery('.containerDispositivos').empty();

    	jQuery.each(data, function( index, value ) {

    		var nombreDelDispositivo = '<div class="nombreDelDispositivo">' + value["temperatura"]["nombre_dispositivo"] + '</div>';
    		var sensor1 = '<div class="nombreDelDispositivo sensor1-'+index+'">Sensor 1: ' + value["temperatura"]["sensor1"] + ' C</div>';
    		var sensor2 = '<div class="nombreDelDispositivo sensor2-'+index+'">Sensor 2: ' + value["temperatura"]["sensor2"] + ' C</div>';
    		var sensor3 = '<div class="nombreDelDispositivo sensor3-'+index+'">Sensor 3: ' + value["temperatura"]["sensor3"] + ' C</div>';
    		var sensor4 = '<div class="nombreDelDispositivo sensor4-'+index+'">Sensor 4: ' + value["temperatura"]["sensor4"] + ' C</div>';

    		jQuery( ".containerDispositivos" ).append('<div class="containerInnDispositivos">' + 
    			nombreDelDispositivo + 
    			sensor1 + 
    			sensor2 + 
    			sensor3 + 
    			sensor4 + 

    		'</div>' );


				jQuery( ".sensor1-"+index).removeClass("temperature_color_green temperature_color_yellow temperature_color_red").addClass( value["temperatura"]['color1'] );
				jQuery( ".sensor2-"+index).removeClass("temperature_color_green temperature_color_yellow temperature_color_red").addClass( value["temperatura"]['color2'] );
				jQuery( ".sensor3-"+index).removeClass("temperature_color_green temperature_color_yellow temperature_color_red").addClass( value["temperatura"]['color3'] );
				jQuery( ".sensor4-"+index).removeClass("temperature_color_green temperature_color_yellow temperature_color_red").addClass( value["temperatura"]['color4'] );


			  console.log( index + ": " + value["temperatura"]["nombre_dispositivo"] );
			});
    	

			hideMessage();
			showSensorHideLoaderGif();    	
    },
    error: function () {
    	showMessage('seleccionar');
    }
	}); 
}

function showMessage(message){

	jQuery('.loader').hide();
	jQuery('.message').show();

	if(message == 'seleccionar'){
	  jQuery( '.message' ).html('Por favor seleccione una empresa');
	}
}

function hideMessage(){
	jQuery('.message').hide();
}

function onChangeSelectEmpresa(){
	jQuery('.empresa_select').on('change', function() {

		hideMessage();
		showLoaderGifHideSensor();

		idEmpresa = jQuery(this).val();
		if(typeof temperature !== 'undefined')
			clearInterval(temperature);

		intervalSensorData(idEmpresa);
	});
}

function intervalSensorData(idEmpresa) {
  temperature = setInterval( function() { 
  	callDispositivosData(idEmpresa); }, 2000 
  );
}

function showLoaderGifHideSensor(){
	jQuery('.loader').show();
	jQuery('.containerDispositivos').hide();
}

function showSensorHideLoaderGif(){
	jQuery('.containerDispositivos').show();
	jQuery('.loader').hide();
}

function init(){
	var temperature;
	onChangeSelectEmpresa();
}

jQuery(document).ready(function(){	
	init();
});	