import { buyNowListener, emptyCartListener, loginListener } from "../../src";

var inventory = {};
var cart = [];

export function getContent(pageName) {
    console.log("running getContent with: ", pageName);

    //retireve and set inventory to variable
    $.get('data/coffeeMakers.JSON', function (data) {
        inventory = data;
        // error if unable to retrieve
    }).fail((error) => {
        alert("Unable to retireve inventory.")
        console.log("error: ", error);
    });

    if (pageName == "home") {
        $.get(`pages/${pageName}.html`, function (data) {
            $("#app").html(data);

        }).then(() => {
            // insert inventory products
            $.each(inventory.products, (idx, product) => {
                $(".displayCase").append(`
                    <div class="product">
                        <div class="imageSpace">
                            <img
                            src="${product.location}"
                            alt="K duo single"
                            />
                        </div>

                        <div class="info">
                            <h1>${product.title}</h1>
                            <div class="row">
                            <p>$${product.price}</p>
                            <div id=buy_${product.id} class="buyBtn">Buy Now</div>
                            </div>
                        </div>
                    </div>
                `)
            })

            buyNowListener();
        }).fail((error) => {
            console.log("error: ", error);
        });
    } if (pageName == "cart") {
        $.get(`pages/${pageName}.html`, function (data) {
            $("#app").html(data);

        }).then(() => {
            $.each(cart, (idx, product) => {
                $(".basket").append(`
                    <div class="lineItem">
                        <div class="imageSpace">
                            <img
                            src="${product.location}"
                            alt=""
                            />
                        </div>

                        <div class="title">${product.title}</div>
                        <div class="qtn">X${!product.qty ? product.qty = 1 : product.qty}</div>
                        <div class="cost">$${product.price}</div>
                        <div class="sub">$${!product.qty ? product.price * 1 : Math.floor(product.price * product.qty)}</div>
                    </div>
                `)
            })
            if (cart == "") {
                $(".basket").append(`<p id="emptyCart">Your cart is Empty</p>`);
            } else {
                $(".basket").append(`<div class="emptyCart">Empty Cart</div>`);
                emptyCartListener();
            }

        }).fail((error) => {
            console.log("error: ", error);
        });
    } else {
        $.get(`pages/${pageName}.html`, function (data) {
            $("#app").html(data);
        });
    }

    loginListener();
}

export function addToCart(prodID) {
    let cartItem = {};

    //find inventory match
    for (let i = 0; i < inventory.products.length; i++) {
        const product = inventory.products[i];
        if (prodID == product.id) {
            cartItem.id = product.id;
            cartItem.price = product.price;
            cartItem.title = product.title;
            cartItem.location = product.location;
        }
    }

    //check cart for duplicate
    let cartDupe = false;
    for (let i = 0; i < cart.length; i++) {
        const cartProd = cart[i];

        if (cartItem.id == cartProd.id) {
            cartDupe = true

            if (!cartProd.qty) {
                cartProd.qty = 2;
            } else {
                cartProd.qty += 1;

            }

        }
    }
    if (cartDupe == false) {
        cart.push(cartItem);
    }
}

export function emptyCart() {
    cart = [];
    document.getElementById("basket").innerHTML = "";
    $(".basket").append(`<p id="emptyCart">Your cart has been emptied.</p>`);
}
