onSubmit = e =>{
    e.preventDefault();

    var img = document.querySelector('#file').files[0];
    var title = document.querySelector('#title').value;
    var price = document.querySelector('#price').value;
    var qty = document.querySelector('#qty').value;
    var barcode = document.querySelector('#barcode').value;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('qty', qty);
    formData.append('barcode', barcode);
    formData.append('img', img);

    let url = '../api/product/add_product.php';
    fetch(url, {method: "POST", body: formData})
    .then(response=>response.json())
    .then(response=>{
        document.querySelector('#response').innerHTML = response.msg;
        setTimeout(()=>window.location = './stock.php',2000);
    })
    .catch(error=>console.log(error));
}