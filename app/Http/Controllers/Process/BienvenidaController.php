<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BienvenidaController
 *
 * @author Damian Mosquera
 */
namespace App\Http\Controllers\Process;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BienvenidaController extends Controller{
    //put your code here
    
    public function index(){
        if ( session('Time') > date("Y-m-d H:i:s") ){
            
            return view('process.bienvenida');
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    public function menu(){
        if ( session('Time') > date("Y-m-d H:i:s") ){
            
            return view('process.menu');
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
}
