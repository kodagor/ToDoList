$(function() {
    var $newItemForm, $newItemButton, $list;                                 //variables
    
    $newItemForm = $('#new-item-form');                                     //cache the form of adding new element
    $newItemButton = $('#new-item-btn');                                    //cache the button of showing the form
    $list = $('ul');                                                        //cache an unordered list
    var item = '';                                                          //variable with empty string
    var disable = '<span><i class=\"ion-ios-trash-outline\"></i></span>';
    
    $('li').hide().each(function(index){                                    //hiding and then showing list items
       $(this).delay(400 * index).fadeIn(1000); 
    });
    
    //elements counter
    function updateCount() {
        var items = $('li[class!="list-group-item disabled"]').length;
        $('.badge').text(items);
    }
    updateCount();
    //setup a form of adding new element
    $newItemButton.show();                                                  //showing the button
    $newItemForm.hide();                                                    //hiding the form
    $('.new-item').on('click', function() {                                 //after clicking on new item
        $newItemButton.hide();                                              //hide the button
        $newItemForm.show();                                                //show the form
    });
    
    //adding new list element
    $newItemForm.on('submit', function(e) {             
        e.preventDefault();                                                 //prevent of sumbitting form
        var text = $('input:text').val();                                   //take value from input
        if (text != '' ){                                                   //check if input is not empty
            $list.append('<li class=\"list-group-item\">'                   //add new item at the end of the list
                         + text + '</li>');
            $('input:text').val('');                                        //delete value from input
            updateCount();                                                  //update the counter
        } else {
            alert('You cannot buy nothing!');                               //alert, if the field is empty
        }
    });
    
    //click handler
    $list.on('click', 'li', function(){                                     
        var $this = $(this);                                                //chache the element in jQUery object
        var complete = $this.hasClass('disabled');                          
        
        if (complete === true) {                                            //check, if item has disabled class
            $this.animate({                                                 //animate removing after clicking it
                opacity: 0.0,
                paddingLeft: '+=180',
            }, 500, 'swing', function() {
                $this.remove();
            });
        } else {                                                            //if item hasn't disabled class, add him as the last list item
            item = $this.text();                                            //and give him this class
            $this.remove();
            $list
                .append('<li class=\"list-group-item disabled\">' + item + disable + '</li>')
                .hide().fadeIn(300);
            updateCount();                                                  //update the counter
        }
        
    });
    
   
});