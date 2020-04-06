var local = localStorage;
var total = document.querySelector('#total');
var move = document.querySelector('#move');

let barcode = document.querySelector('#barcode');
var obj = null;

function searchItem(){
    let barCode = document.querySelector('#barcode').value;
    let qtyHolder = document.querySelector('#qty');
    
    fetch('../api/product/search.php?barcode='+barCode)
    .then(response=>response.json())
    .then(response=>{
        if(response != null ){
            obj = response;
            qtyHolder.removeAttribute('disabled');
        }else{
            qtyHolder.setAttribute('disabled', true);
        }
    })
    .catch(error=>console.log(error));
}

barcode.addEventListener('input', e=>{searchItem();});
barcode.addEventListener('keyup', e=>{searchItem();});

function checkQty(){
    let qty = document.querySelector('#qty').value;
    let msg = document.querySelector('#msg');
    let btn = document.querySelector('#pay');
    qty = parseInt(qty);

    if(qty != ''){
        if(isNaN(qty)){
            msg.innerHTML = 'Quantity must be a number';
            msg.classList.add('display-block');
            msg.classList.remove('display-none');
            btn.setAttribute('disabled', true);
        }else{
            msg.classList.add('display-none');
            msg.classList.remove('display-block');
            msg.innerHTML = '';
            btn.removeAttribute('disabled');
        }
    }else{
        msg.classList.add('display-none');
        msg.classList.remove('display-block');
        msg.innerHTML = '';
        btn.setAttribute('disabled', true);
    }
}

document.querySelector('#qty').addEventListener('input', e=>{checkQty();});

addCart = () => {
    let qty = document.querySelector('#qty').value;
    qty = parseInt(qty);
    let itemPrice = parseFloat(obj.price);
    let subTotal = itemPrice*qty;
    subTotal = subTotal.toFixed(2);
    subTotal = parseFloat(subTotal);
    let newObj = {
        id: obj.id,
        title: obj.title,
        price: itemPrice,
        qty,
        subTotal
    };

    let getLocal = JSON.parse(local.getItem('cart')) !=  null ? JSON.parse(local.getItem('cart')) : [];
    if(getLocal.length == 0){
        getLocal.push(newObj);
        local.setItem('cart', JSON.stringify(getLocal));
        displayCart();
    }else{

        if(checkCart({cart: getLocal, id: obj.id, qty})){
            local.setItem('cart', JSON.stringify(getLocal));
            displayCart();
        }else{
            getLocal.push(newObj);
            local.setItem('cart', JSON.stringify(getLocal));
            displayCart();
        }
    }

    document.querySelector('#barcode').value = '';
    document.querySelector('#qty').value = '';
    checkEmptyQty();
}

checkCart = ob => {

    for(let i=0; i<ob.cart.length; i++){
        if(ob.cart[i].id == ob.id){
            ob.cart[i].qty = ob.qty;
            ob.cart[i].subTotal = parseFloat(ob.cart[i].price) * ob.qty;
            return true;
        }else{
            continue;
        }
    }
}

document.querySelector('#qty').addEventListener('keyup', e=>{
    if(e.keyCode == 13){
        addCart();
    }
});

document.querySelector('#pay').addEventListener('click', e=>{addCart();});

checkEmptyQty = () => {
    let barcode =  document.querySelector('#barcode');
    let btn =  document.querySelector('#pay');
    let qty =  document.querySelector('#qty');
    if(barcode.value == ''){
        btn.setAttribute('disabled', true);
        qty.setAttribute('disabled', true);
    }
    //setTimeout(checkEmptyQty, 500);
}

function setTotal(){
    let cart = JSON.parse(local.getItem('cart')) != null ? JSON.parse(local.getItem('cart')) : [];
    let sum = 0;

    if(cart.length > 0){
        cart.forEach(element => {
            sum = sum + parseFloat(element.subTotal);
        });
        // for(let i=0; i<cart.length; i++){
        //     sum = sum + cart[i].subTotal;
        // }
    
        total.setAttribute('value', sum);
        document.querySelector('#move').style.left = '0%';
        //document.querySelector('#grab').style.display = 'block';
    }else{
        document.querySelector('#move').style.left = '-100%';
        //document.querySelector('#grab').style.display = 'none';
    }

    setTimeout(setTotal,500);
}

setTotal();

onChange = (e, i) =>{
    let inputValue = e.target.value != '' ? parseInt(e.target.value) : '';
    let getCartItem = JSON.parse(local.getItem('cart')) != null ? JSON.parse(local.getItem('cart')) : null;

    if(inputValue !=''){
        let price = parseFloat(getCartItem[i].price);
        let product = price * inputValue;
        product = product.toFixed(2);
        getCartItem[i].subTotal = product;
        getCartItem[i].qty = inputValue;
        let subTotal = document.querySelectorAll('.subtotal')[i];
        subTotal.innerHTML = product;
        
        local.setItem('cart', JSON.stringify(getCartItem));
    }
}

displayCart = () =>{
    mycart = JSON.parse(local.getItem('cart')) == null ? [] : JSON.parse(local.getItem('cart'));

    let output = '';

    if(mycart.length > 0){
        mycart.forEach((item, index)=>{
            output +=`
            <div class="col-6 col-s-12 padding-all-10">
                <div class="tan-bg">
                    <div><span class="font-jsans">Product Name</span> : <span class="white-text">${item.title}</span></div>
                    <div><span class="font-jsans">Unit Price</span> : <span class="blue-text">${item.price}</span></div>
                    <div><span class="font-jsans">Sub Total</span> : <span class="blue-text subtotal">${item.subTotal}</span></div>
                </div>
            </div>
            <div class="col-6 col-s-12 padding-all-10">
                <div>
                    <div><input type="number" value="${item.qty}" min="1" oninput="onChange(event, ${index})" /></div> <br />
                    <div onclick="remove(${index})" class="right-text padding-all-10 cursor-pointer"><i class="fas fa-cart-arrow-down"></i> Remove item</div>
                </div>
            </div>
            <div class="col-12 padding-all-5">
                <div class="tan-border-bottom"></div>
            </div>
        `;
        });
        document.querySelector('#row').innerHTML = output;
    }else{
        output += `
            <div class="col-12">
                <div class="center-text font-allerRg blue-text">Your cart is empty</div>
            </div>
        `;
        document.querySelector('#row').innerHTML = output;
    }
    
}

displayCart();

remove = index => {
    let cartList = JSON.parse(local.getItem('cart')) == null ? null : JSON.parse(local.getItem('cart'));

    if(cartList.length > 0){
        let copy = cartList.slice();
        copy.splice(index, 1);
        local.setItem('cart', JSON.stringify(copy));
        displayCart();
    }
}

function acceptMoney(){
    let money = document.querySelector('#accept-money').value;

    if(money != ''){
        money = parseFloat(money);
        document.querySelector('#notice').style.display = 'none';
        if(!isNaN(money)){
            document.querySelector('#notice').style.display = 'none';  
            document.querySelector('#accept-payment').removeAttribute('disabled');
        }else{
            document.querySelector('#notice').innerHTML = 'Amount entered must be a number';
            document.querySelector('#notice').style.display = 'block';
            document.querySelector('#accept-payment').setAttribute('disabled', true);
        }
    }else{
        document.querySelector('#notice').innerHTML = 'Field cannot be empty';
        document.querySelector('#notice').style.display = 'block';
        document.querySelector('#accept-payment').setAttribute('disabled', true);
    }
}

document.querySelector('#accept-money').addEventListener('input', e=>{acceptMoney();});

acceptPayment = () =>{
    let money = document.querySelector('#accept-money').value;
    money = parseFloat(money);

    let sumTotal = document.querySelector('#total').value;
    sumTotal = parseFloat(sumTotal);
    
    if(!isNaN(money)){
        if(money >= sumTotal){
            let difference = money - sumTotal;
            difference = difference.toFixed(2);
            document.querySelector('#balance').setAttribute('value', difference);

            let cartBody = JSON.parse(local.getItem('cart'));
            fetch('../api/cart/create.php', 
            {
                method: "POST", 
                body: JSON.stringify({body: cartBody, paid: sumTotal, role: admin_status}), 
                headers:{Accept: 'application/json'}})
            .then(response=>response.json())
            .then(response=>{
                if(response.truth){
                    document.querySelector('#notice').innerHTML = response.msg;
                    document.querySelector('#notice').style.color = 'green';
                    document.querySelector('#notice').style.display = 'block';
                    local.removeItem('cart');
                    displayCart();
                }else{
                    document.querySelector('#notice').innerHTML = response.msg;
                    document.querySelector('#notice').style.color = 'green';
                    document.querySelector('#notice').style.display = 'block';
                }
            })
            .catch(error=>console.log(error));
        }else{
            document.querySelector('#notice').innerHTML = 'Amount received cannot be less than amount payable';
            document.querySelector('#notice').style.color = 'red';
            document.querySelector('#notice').style.display = 'block';
        }
    }
}

document.querySelector('#accept-money').addEventListener('keyup', e=>{
    if(e.keyCode == 13){
        acceptPayment();
    }
});

document.querySelector('#accept-payment').addEventListener('click', e=>{acceptPayment();});

checkAcceptMoney = () =>{
    checkAccept = document.querySelector('#accept-money');

    let cartJson = JSON.parse(local.getItem('cart')) == null ? [] : JSON.parse(local.getItem('cart'));
    
    if(cartJson.length > 0){
        checkAccept.removeAttribute('disabled');
    }else{
        checkAccept.setAttribute('disabled', true);
    }
    setTimeout(checkAcceptMoney, 100);
}
checkAcceptMoney();