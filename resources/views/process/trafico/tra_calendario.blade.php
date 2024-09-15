@extends('layouts.inicio_process')

@section('content')
<br>
<div class="m-b-md flex-center BlackFont TitleSection" >
    TRAFICO CALENDARIO
</div>

<?php echo '<script type="text/javascript" src="'.url("/").'/js/Administracion/tra_calendario.js?v='.date("Y-m-d H:i:s").'"></script>';?>

@endsection
