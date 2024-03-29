// When html doc is ready
$(document).ready(function () {
    // take markup element with id jq-notification for ajax notifications into a variable
    var successMessage = $("#jq-notification");

    // Catch the event of a click on the add to cart button
    $(document).on("click", ".add-to-cart", function (e) {
        // Blocking his base action
        e.preventDefault();

        // Take the counter element in the cart icon and take the value from there
        var goodsInCartCount = $("#goods-in-cart-count");
        var cartCount = parseInt(goodsInCartCount.text() || 0);

        // Get id from product from attribute data-product-id
        var product_id = $(this).data("product-id");

        // From the href attribute we take the link to the django controller
        var add_to_cart_url = $(this).attr("href");

        // make post request via ajax without reloading the page
        $.ajax({
            type: "POST",
            url: add_to_cart_url,
            data: {
                product_id: product_id,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                // Message
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                // After 7 sec remove message
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                // Increase the number of items in the cart (rendering in the template)
                cartCount++;
                goodsInCartCount.text(cartCount);

                // Change the contents of the cart to the response from django (new rendered fragment of the cart markup)
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },

            error: function (data) {
                console.log("Error when adding an item to cart");
            },
        });
    });




    // Catch the event of a click on the button to remove an item from the cart
    $(document).on("click", ".remove-from-cart", function (e) {
        // Blocking his base action
        e.preventDefault();

        // We take the counter element in the cart icon and take the value from there
        var goodsInCartCount = $("#goods-in-cart-count");
        var cartCount = parseInt(goodsInCartCount.text() || 0);

        // Get cart id from the data-cart-id attribute
        var cart_id = $(this).data("cart-id");
        // From the href attribute we take the link to the django controller
        var remove_from_cart = $(this).attr("href");

        // make post request via ajax without reloading the page
        $.ajax({

            type: "POST",
            url: remove_from_cart,
            data: {
                cart_id: cart_id,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                // Message
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                // After 7 sec remove message
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                // Decrease the number of items in the cart (rendering in the template)
                cartCount -= data.quantity_deleted;
                goodsInCartCount.text(cartCount);

                // Change the contents of the cart to the response from django (new rendered fragment of the cart markup)
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },

            error: function (data) {
                console.log("Error when adding an item to cart");
            },
        });
    });




    // Now the + - quantities of the goods
    // Event handler for value reduction
    $(document).on("click", ".decrement", function () {
        // We take the link to the django controller from the data-cart-change-url attribute
        var url = $(this).data("cart-change-url");
        // We take the cart id from the data-cart-id attribute
        var cartID = $(this).data("cart-id");
        // We're looking for the nearest input with a quantity
        var $input = $(this).closest('.input-group').find('.number');
        // Take the value of the quantity of goods
        var currentValue = parseInt($input.val());
        // If the quantities are greater than one, only then do -1
        if (currentValue > 1) {
            $input.val(currentValue - 1);
            // Run the function defined below
            // with arguments (card id, new quantity, quantity decreased or added, url)
            updateCart(cartID, currentValue - 1, -1, url);
        }
    });

    // Event handler for value increment
    $(document).on("click", ".increment", function () {
        // We take the link to the django controller from the data-cart-change-url attribute
        var url = $(this).data("cart-change-url");
        // We take the cart id from the data-cart-id attribute
        var cartID = $(this).data("cart-id");
        // Looking for the nearest input with a quantity
        var $input = $(this).closest('.input-group').find('.number');
        // Take the value of the quantity of goods
        var currentValue = parseInt($input.val());

        $input.val(currentValue + 1);

        // Run the function defined below
        // with arguments (card id, new quantity, quantity decreased or increased, url)
        updateCart(cartID, currentValue + 1, 1, url);
    });

    function updateCart(cartID, quantity, change, url) {
        $.ajax({
            type: "POST",
            url: url,
            data: {
                cart_id: cartID,
                quantity: quantity,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },

            success: function (data) {
                 // Message
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                 // After 7 sec remove message
                setTimeout(function () {
                     successMessage.fadeOut(400);
                }, 7000);

                // Changing the number of items in the cart
                var goodsInCartCount = $("#goods-in-cart-count");
                var cartCount = parseInt(goodsInCartCount.text() || 0);
                cartCount += change;
                goodsInCartCount.text(cartCount);

                // Changing the contents of the shopping cart
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },
            error: function (data) {
                console.log("Error when adding an item to cart");
            },
        });
    }


});