/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    ContentList("PERFIL");
    TablaPerfil();
});

function BuscarTablaPerfil(){
    $DataTable_Perfil.destroy();
    $DataTable_Perfil.draw();
    TablaPerfil();
}

function TablaPerfil(){
    $DataTable_Perfil = $('#TablaPerfil').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'922d8ae0f0c0d839c35e457bdc44e25e',
            'data':function (d) {
                    d.search['value'] = $("#PefilBuscar").val();
                    d.search['Estadox'] = $("#PefilEstado").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value
                    });
                }
        },

        'columns': [

           {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
           },
           {
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentNARL_'+full.Hash+'">' + data + '</span>';
                }

            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_ROLES_PERFIL_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoPerfil(\''+full.Hash+'\',\''+UrlUniversal + '0cc1ebeb3ff8e84588df5a140afbe345'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoPerfil(\''+full.Hash+'\',\''+UrlUniversal + '0cc1ebeb3ff8e84588df5a140afbe345'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }

                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';

                    if( full.PAR_ROLES_PERFIL_GESTION_PERMISOS == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "GestionPermisosPerfil(\''+full.Hash+'\',\''+UrlUniversal + '15db390c5e8dac6afcbcf5af9d8425c0'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

                    }
                    return '<center>'+hx+'</center>';
                }
            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';

                    if( full.PAR_ROLES_PERFIL_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataPerfil(\''+full.Hash+'\',\''+UrlUniversal + '4615a88b890a421446169a9ce758d933'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaPerfil').css({'width':'100%'})
}



const Perfil = {
    permisos: [],
    listaP: [],
    crearPerfil: function (e) {
        e.preventDefault()

        let formdata = new FormData(e.target)
        console.log(e.target);
        formdata.forEach(data => {
            console.log(data);
        })
        console.log(formdata);
        $.ajax({
            type:'POST',
            url:e.target.action,
            processData: false,
            contentType: false,
            cache: false,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            },
            data: formdata,
            success:function(data){
                if (data.success) {
                    $('#ModalEdit').modal('hide')
                    BuscarTablaPerfil()
                } else {
                    alert('El Perfil no fue agregado\n'+data.mensage)
                }
            }
        })
    },
    agregarPermiso: function(e) {
        let permiso = this.listaP.find(permiso => parseInt(permiso.Id) === parseInt(e.target.value))
        this.permisos.push(permiso)
        return permiso
    },
    retirarPermiso: function(e){
        let iPermiso = this.permisos.findIndex(permiso => parseInt(permiso.Id) === parseInt(e.target.value))
        let permiso = this.permisos.pop(iPermiso)
        return permiso
    }
}

function TablaPermisos(Hash=null) {
    $.ajax({
        type:'POST',
        url:'83e30c6212f44880e12457d3215f1de3',
        data:{Hash ,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            Perfil.listaP = data.lista
            $DataTable_ListaPermisos = $('#permisosLista').DataTable({
                data: data.lista,
                scrollY: 200,
                scrollX: true,
                paging: false,
                columns:[
                    {
                        data: 'Id',
                        "orderable": false,
                        "render": function (data, type, full, meta) {
                            return (
                                '<center>'
                                    +'<input type="checkbox" class="permiso" value="'+data+'">'
                                +'</center>'
                            )
                        }
                    },
                    {
                        data: 'Nombre',
                        "render": function (data, type, full, meta) {
                            return '' + data + '';
                        }
                    },
                    {
                        data: 'Descripcion',
                        "render": function (data, type, full, meta) {
                            return '' + data + '';
                        }
                    },
                    {
                        data: 'Pantalla',
                        "render": function (data, type, full, meta) {
                            return '' + data + '';
                        }
                    },
                ]
            })
            $DataTable_PerfilPermisos = $('#permisosPerfil').DataTable({
                data: data[0].perfilPermisos,
                scrollY: 200,
                scrollX: true,
                paging: false,
                columns: [
                    {
                        data: 'Id',
                        "orderable": false,
                        "render": function (data, type, full, meta) {
                            return (
                                '<center>'
                                    +'<input type="checkbox" name="parPermisos[]" class="permiso" value="'+data+'" checked>'
                                +'</center>'
                            )
                        }
                    },
                    {
                        data: 'Nombre',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Descripcion',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Pantalla',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                ]
            })

            $('#permisosLista tbody').on( 'change', '.permiso', function (e) {
                let permiso = Perfil.agregarPermiso(e);

                //$DataTable_ListaPermisos.row( $(this).parents('tr') ).remove().draw()

                $DataTable_PerfilPermisos.row.add({
                    Id: permiso.Id,
                    Num: permiso.Num,
                    Nombre: permiso.Nombre,
                    Descripcion: permiso.Descripcion,
                    Pantalla: permiso.Pantalla
                }).draw().node();
            } );

            $('#permisosPerfil tbody').on( 'change', '.permiso', function (e) {
                let permiso = Perfil.retirarPermiso(e)

                $DataTable_PerfilPermisos.row( $(this).parents('tr') ).remove().draw()

                $DataTable_ListaPermisos.row.add({
                    Id: permiso.Id,
                    Num: permiso.Num,
                    Nombre: permiso.Nombre,
                    Descripcion: permiso.Descripcion,
                    Pantalla: permiso.Pantalla
                }).draw().node();
            });
            $('#permisosLista').css({'width':'100%'})
            $('#permisosPerfil').css({'width':'100%'})
        }
    })
}

function TablaPerfilPermisos(Hash){
    $.ajax({
        type:'POST',
        url:'4eb7fef9bbd33196bf48b57f434df859',
        data:{Hash ,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            console.log(data);
            Perfil.listaP = data.lista
            $DataTable_ListaPermisos = $('#permisosPerfil').DataTable({
                data: data.data,
                scrollY: 200,
                scrollX: true,
                paging: false,
                columns:[
                    {
                        data: 'Id',
                        "orderable": false,
                        "render": function (data, type, full, meta) {
                            return (
                                '<center>'
                                    +'<input type="checkbox" name="parPermisos[]" class="permiso" value="'+data+'" checked>'
                                +'</center>'
                            )
                        }
                    },
                    {
                        data: 'Nombre',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Descripcion',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Pantalla',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                ]
            })
            $('#permisosPerfil').css({'width':'100%'})

        }
    })
}

function TablaPermisosEditar(Hash=null) {
    $.ajax({
        type:'POST',
        url:'b5106cf796741beaa7c81ac7a67e3d68',
        data:{Hash ,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            console.log(data);
            $('#parNombrePerfil').val(data.perfil.Nombre)
            Perfil.listaP = data.lista
            $DataTable_ListaPermisos = $('#permisosLista').DataTable({
                data: data.lista,
                scrollY: 200,
                scrollX: true,
                paging: false,
                columns:[
                    {
                        data: 'Id',
                        "render": function (data, type, full, meta) {
                            return (
                                '<center>'
                                    +'<input type="checkbox" class="permiso" value="'+data+'">'
                                +'</center>'
                            )
                        }
                    },
                    {
                        data: 'Num',
                        "orderable": false,
                        "searchable": false,
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Nombre',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Descripcion',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Pantalla',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                ]
            })
            $DataTable_PerfilPermisos = $('#permisosPerfil').DataTable({
                data: data.perfilPermisos,
                scrollY: 200,
                scrollX: true,
                paging: false,
                columns: [
                    {
                        data: 'Id',
                        "render": function (data, type, full, meta) {
                            return (
                                '<center>'
                                    +'<input type="checkbox" name="parPermisos[]" class="permiso" value="'+data+'" checked>'
                                +'</center>'
                            )
                        }
                    },
                    {
                        data: 'Num',
                        "orderable": false,
                        "searchable": false,
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Nombre',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Descripcion',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'Pantalla',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                ]
            })

            $('#permisosLista tbody').on( 'change', '.permiso', function (e) {
                let permiso = Perfil.agregarPermiso(e);

                $DataTable_ListaPermisos.row( $(this).parents('tr') ).remove().draw()

                $DataTable_PerfilPermisos.row.add({
                    Id: permiso.Id,
                    Num: permiso.Num,
                    Nombre: permiso.Nombre,
                    Descripcion: permiso.Descripcion,
                    Pantalla: permiso.Pantalla
                }).draw().node();
            } );

            $('#permisosPerfil tbody').on( 'change', '.permiso', function (e) {
                let permiso = Perfil.retirarPermiso(e)

                $DataTable_PerfilPermisos.row( $(this).parents('tr') ).remove().draw()

                $DataTable_ListaPermisos.row.add({
                    Id: permiso.Id,
                    Num: permiso.Num,
                    Nombre: permiso.Nombre,
                    Descripcion: permiso.Descripcion,
                    Pantalla: permiso.Pantalla
                }).draw().node();
            });
            $('#permisosLista').css({'width':'100%'})
            $('#permisosPerfil').css({'width':'100%'})
        }
    })
}

function BuscarPerfilesTabla(){
    
}

function CrearPerfil(Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Crear Perfil</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form onsubmit='Perfil.crearPerfil(event)' class='form-signin' action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parNombrePerfil' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parNombrePerfil' name='parNombrePerfil' placeholder='Nombre Perfil' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='IdTipoDoc'>Buscar:</label>";
                    html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'DL_TextBusqueda' name = 'DL_TextBusqueda' />";
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<p></p>";
                    html += "<img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarPerfilesTabla()'/>";
                html += "</div>";
            html += "</div>";
            html += "<table class='tableNew dataTable' id='permisosLista'>"
                html += "<thead>"
                    html += "<th>Sel.</th>"
                    html += "<th>Nombre</th>"
                    html += "<th>Descripcion</th>"
                    html += "<th>Pantalla</th>"
                html += "</thead>"
            html += "</table>"

            html += "<table class='tableNew dataTable' id='permisosPerfil'>"
                html += "<thead>"
                    html += "<th>Sel.</th>"
                    html += "<th>Nombre</th>"
                    html += "<th>Descripcion</th>"
                    html += "<th>Pantalla</th>"
                html += "</thead>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $("#ModalEdit .modal-dialog").removeClass('modal-lg').addClass('modal-xl')
    TablaPermisos()
}


function DataPerfil(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Perfil</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form onsubmit='Perfil.crearPerfil(event)' class='form-signin' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parNombrePerfil' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parNombrePerfil' name='parNombrePerfil' placeholder='Nombre Perfil' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";

            html += "<table class='tableNew dataTable' id='permisosLista'>"
                html += "<thead>"
                    html += "<th>Sel.</th>"
                    html += "<th>No.</th>"
                    html += "<th>Nombre</th>"
                    html += "<th>Descripcion</th>"
                    html += "<th>Pantalla</th>"
                html += "</thead>"
            html += "</table>"

            html += "<table class='tableNew dataTable' id='permisosPerfil'>"
                html += "<thead>"
                    html += "<th>Sel.</th>"
                    html += "<th>No.</th>"
                    html += "<th>Nombre</th>"
                    html += "<th>Descripcion</th>"
                    html += "<th>Pantalla</th>"
                html += "</thead>"
            html += "</table>"

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
        html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
    TablaPermisosEditar(Hash)
}

function GestionPermisosPerfil(Hash,Ruta) {
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Permisos Asignados</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";

            html += "<table class='tableNew dataTable' id='permisosPerfil'>"
                html += "<thead>"
                    html += "<th>No.</th>"
                    html += "<th>Nombre</th>"
                    html += "<th>Descripcion</th>"
                    html += "<th>Pantalla</th>"
                html += "</thead>"
            html += "</table>"

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
        html += "</div>";
    html += "</div>";

    $(".content_modal").html(html);
    TablaPerfilPermisos(Hash)
}

function EstadoPerfil(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var alert = "alert-danger";
            var msj = "Se ha presentado un Error, intente nuevamente.";
            if( data.success == 1 ){
                alert = "alert-success";
                msj = "Se ha cambiado el estado de manera correcta";
            }
            BuscarTablaPerfil()
            Notificacion(msj,alert);
        }
    });
}

