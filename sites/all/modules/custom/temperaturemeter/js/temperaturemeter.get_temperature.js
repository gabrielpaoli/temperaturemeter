function callSensorData(idEmpresa = null) {
	jQuery.ajax({
    url: 'http://temperaturemeter.com/temperaturemeter/get/temperature',
    type: 'POST',
    data: jQuery.param({idEmpresa : idEmpresa}) ,
    success: function (data) {
			jQuery( ".sensor1" ).removeClass("temperature_color_green temperature_color_yellow temperature_color_red").addClass( data[0]['color1'] );
			jQuery( ".sensor2" ).removeClass("temperature_color_green temperature_color_yellow temperature_color_red").addClass( data[0]['color2'] );
			jQuery( ".sensor3" ).removeClass("temperature_color_green temperature_color_yellow temperature_color_red").addClass( data[0]['color3'] );
			jQuery( ".sensor4" ).removeClass("temperature_color_green temperature_color_yellow temperature_color_red").addClass( data[0]['color4'] );

		  jQuery( '.sensor1' ).html('Sensor 1: ' + data[0]['sensor1'] + ' C' );
		  jQuery( '.sensor2' ).html('Sensor 2: ' + data[0]['sensor2'] + ' C' );
		  jQuery( '.sensor3' ).html('Sensor 3: ' + data[0]['sensor3'] + ' C' );
		  jQuery( '.sensor4' ).html('Sensor 4: ' + data[0]['sensor4'] + ' C' );

			hideMessage();
			showSensorHideLoaderGif();

    },
    error: function () {
    	showMessage('seleccionar');
    }
	}); 
}

function callDispositivosData(idEmpresa = null) {
	jQuery.ajax({
    url: 'http://temperaturemeter.com/temperaturemeter/get/dispositivosPerEmpresa',
    type: 'POST',
    data: jQuery.param({idEmpresa : idEmpresa}) ,
    success: function (data) {
    	//console.log(data);
    	jQuery('.containerDispositivos').empty();
    	jQuery('.containerDispositivos').append('<div class="sasa">hola</div>');

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
  	callSensorData(idEmpresa); }, 2000 
  );
}

function showLoaderGifHideSensor(){
	jQuery('.loader').show();
	jQuery('.containerSensor').hide();
}

function showSensorHideLoaderGif(){
	jQuery('.containerSensor').show();
	jQuery('.loader').hide();
}

function init(){
	var temperature;
	onChangeSelectEmpresa();
}

jQuery(document).ready(function(){	
	init();
});	