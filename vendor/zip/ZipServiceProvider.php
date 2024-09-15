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


namespace Zip\Zip;

use Illuminate\Support\ServiceProvider;

class ZipServiceProvider extends ServiceProvider {


    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register() {
        $this->registerCpanelService();

        /*if ($this->app->runningInConsole()) {
            $this->registerResources();
        }*/
    }

    /**
     * Register currency provider.
     *
     * @return void
     */
    public function registerCpanelService() {
        $this->app->singleton('zip', function ($app) {
            return new Zip($app);
        });
    }

    /**
     * Register currency resources.
     *
     * @return void
     */
    public function registerResources()
    {
        if ($this->isLumen() === false) {
            $this->publishes([
                __DIR__ . '/../config/zip.php' => config_path('zip.php'),
            ], 'config');
        }
    }

    /**
     * Check if package is running under Lumen app
     *
     * @return bool
     */
    protected function isLumen()
    {
        return str_contains($this->app->version(), 'Lumen') === true;
    }

}