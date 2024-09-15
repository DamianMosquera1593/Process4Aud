/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    $(".vl").remove()
    $(".ContentPanel").css({
        'left':10,
        'top':80
    })

    $(".ContentPanel").css({
        'width':$("body").width()-10
    })

    $("body").scrollTop();
});
