// $( function() {
//     $( "#draggable" ).draggable();
//     $( "#droppable" ).droppable({
//       drop: function( event, ui ) {
//         $( this )
//           .addClass( "ui-state-highlight" )
//           .find( "p" )
//             .html( "Dropped!" );
//       }
//     });
//   } );

$('.drag').draggable(); 

//$ == jquery land.
$( ".drop" ).droppable( 
         { 
            // over: function (event, ui) { 
            //     console.log($(this).attr("id")); //the 'this' under over event
            //   },
            
            drop: function (event, ui) {
                alert(ui.draggable.attr('id'))
             }
    //what did i drag
    
    
    console.log($(this).attr("class")); //TODO: fix
    //where did i drop it
    // console.log($(this).attr("id"));

            //   $( this ).addClass( "redClass" );
      //todo: if it's correct, make it green. 
        
    }
);