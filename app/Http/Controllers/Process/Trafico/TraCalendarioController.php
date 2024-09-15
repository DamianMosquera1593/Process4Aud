<?php

namespace App\Http\Controllers\Process\Trafico;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TraCalendarioController extends Controller
{
    //33ae9aefcee34af505947a77a8914010
    public function index()
    {
        return view('process.trafico.tra_calendario');
    }
}
