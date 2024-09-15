
<script>
    
    $(document).ready(function () {
        $(".vl").css({'overflow-y':'scroll'})
        $(".vl2").css({'left':$(".vl").width()})
        $(".vl2").css({'height':$( window ).height()})
        $(".vl2").css({'width':$( window ).width()-$(".vl").width()-10})

        $(".Body_Body").css({'height':$( window ).height()})

        $(".container").css({'width':$( window ).width()})
        $("body").scrollTop();
        $("body").resize(function(){
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
        })
        $("#accordian .OpcionesMenuUsuario").click(function(){
            $(".Menu").hide()
            //slide up all the link lists
            $("#accordian ul ul").slideUp();
            $("#accordian .OpcionesMenuUsuario").css({
                    'background': '#062c5e',
                    'border-left': '0px'})
            //slide down the link list below the h3 clicked - only if its closed
            $(".FirstText").show()
            if(!$(this).next().is(":visible"))
            {
                $(this).next().slideDown();
                $(this).find('.Menu').show();
                $(this).css({
                    'background': '#003545',
                    'border-left': '5px solid #f7931e'
                })
            }
	})
        $("#accordian ul ul").hide();
        
        $(".canvasjs-chart-credit").remove()
        $(".canvasjs-chart-toolbar").remove()
        $("#DataTables_Table_0_filter").addClass("form-group")
        $(".dataTables_length").hide()
    });

</script>
