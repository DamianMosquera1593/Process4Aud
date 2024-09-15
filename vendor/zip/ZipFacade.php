<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ZipFacade
 *
 * @author Admin
 */

namespace Zip;

use Illuminate\Support\Facades\Facade;

class ZipFacade extends Facade
{

    protected static function getFacadeAccessor()
    {
        return 'zip';
    }
}