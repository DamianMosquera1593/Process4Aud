/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.extend( $.validator.messages, {
	required: "Este campo es obligatorio.",
	remote: "Rellena este campo.",
	email: "Escribe una dirección de correo válida.",
	url: "Escribe una URL válida.",
	date: "Escribe una fecha válida.",
	dateISO: "Escribe una fecha (ISO) válida.",
	number: "Escribe un número válido.",
	digits: "Escribe sólo dígitos.",
	creditcard: "Escribe un número de tarjeta válido.",
	equalTo: "Escribe el mismo valor de nuevo.",
	extension: "Escribe un valor con una extensión aceptada.",
	maxlength: $.validator.format( "Debes escribir máximo {0} caracteres." ),
	minlength: $.validator.format( "Debes escribir mínimo {0} caracteres." ),
	rangelength: $.validator.format( "Escribe un valor entre {0} y {1} caracteres." ),
	range: $.validator.format( "Escribe un valor entre {0} y {1}." ),
	max: $.validator.format( "Escribe un valor menor o igual a {0}." ),
	min: $.validator.format( "Escribe un valor mayor o igual a {0}." ),
	nifES: "Escribe un NIF válido.",
	nieES: "Escribe un NIE válido.",
	cifES: "Escribe un CIF válido."
} );