(function($){
  var is_prescription_product_added = false;
    
$(document).ready(function(){
    $("#minicart").mouseover(function(){
    $.ajax({
        type: 'GET',
        url: '/cart.json',
        dataType: 'jsonp',
        success: function(data) { 
           
            var item_count = data['item_count'];
            var total_price = data['total_price']/100;
             if ( item_count == 0 ) { 
               
               $('.mini-cart-items').html('No Items In the cart!.');
               return false;
             }
            //If there are items in cart
            if ( item_count > 0 ) {
                // cart count
                $('.cart-item-count').text(item_count);

                // mini cart data
                $('.mini-cart').attr('id','mini-cart');
                $('.mini-cart-subtotal .price').text( '$' + total_price.toFixed(2) );
              
              	for( var i = 0; i < item_count; i++ ){
                  
                  if ( data['items'][i]['properties'] != null ){
                    if ( data['items'][i]['properties']['prescription_product'] == 'true' ){
                      is_prescription_product_added = true;
                      break;
                    }                    
                  }         
                }  
              
                var cart_list = [];

                for( var i = 0; i < item_count; i++ ){
                  
                  if (data['items'][i] == null) {
                  	continue;  
                  }
                 
                   var item_id = data['items'][i]['id'];
                  
                 
                    if (item_id!= null ) {                       
                      
                        var product_title = data['items'][i]['product_title'];
                        // var product_title = data['items'][i]['title'];
                        var product_handle = data['items'][i]['handle'];
                        var quantity = data['items'][i]['quantity'];
                        var line_price = data['items'][i]['price']/100;
                        var url = data['items'][i]['url'];
                        var image_url = data['items'][i]['image'];
                        var variants = data['items'][i]['variant_options'];
                           
                        if ( product_title == 'Gift Wrap' ) {
                            var product_url = product_title;
                        } else {
                            var product_url = '<a href="https://cpapmachinescanada.net/' + url + '">' + product_title + '</a>';
                        }

                        var options = [];
                        for ( var o = 0; o < variants.length; o++ ) {
                            var selected = data['items'][i]['variant_options'][o];
                            if ( selected !== 'Default Title' ) {
                                options.push( selected + '<br>' );
                            }
                        }
                        var selected_options = options.join(''); 
                       var scriptrVar = "<script>$('.update_qty_btn').click(function(){var btnId = $(this).attr('id'); var prId = btnId.split('_');  var prQty = $('#updates_'+prId[1]).val();  $.ajax({ type: 'POST',url: '/cart/change.js',data:{quantity:prQty,id:prId[1]},dataType:'json',success: function(data) { alert('Quantity Has been updated!') }}); })</script>";                   

                        cart_list.push('<div class="row mini-cart-product"><div class="col span_3 mini-image"><div class="product_image"><img src="' + image_url + '"  alt="' + product_title + '" /></div></div><div class="col span_6 mini-details">' + product_url + '<br>' + selected_options + '<div class="col span_3 text-right"><p>Price</p><span>$'+ line_price.toFixed(2) +'</span><br> <div class="qty-main"><p>Qty</p>x ' + quantity + '<input type="text" id="updates_' + item_id + '" value="' + quantity + '" /><input type="hidden" id="productId" value="' + item_id + '" /><button class="update_qty_btn" id="productid_'+item_id+'">Ok</button></div> </div></div></div>');
                    } //endif
                } // endfor              
              
              //adding checkbox to the ajax cart
              if ( is_prescription_product_added == true ){
                $('.mini-cart-items').html( cart_list.join('')+'<div class="ajax-prescription-wrapper"><input type="checkbox" id="ajax_prescription_option" /><label for="ajax_prescription_option">By checking this box you understand that a prescription is needed for this product and must be uploaded with the order</label> </div><div class="checkout_buttons"><a href="https://cpapmachinescanada.net/cart">View Cart</a>|<a href="/checkout">Checkout</a></div>'+scriptrVar );
              }else{
                $('.mini-cart-items').html( cart_list.join('')+'<div class="checkout_buttons"><a href="https://cpapmachinescanada.net/cart">View Cart</a>|<a href="/checkout">Checkout</a></div>'+scriptrVar );
              }
                
            }
        }
    });
    });
  
 
});


})(jQuery)
