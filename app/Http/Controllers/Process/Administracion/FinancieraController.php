<?php

namespace App\Http\Controllers\Process\Administracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FinancieraController extends Controller
{
    //f6ff70ca67c797a58f3acaf06e552835
    public function index()
    {
        return view('process.administracion.financiera');
    }
}
