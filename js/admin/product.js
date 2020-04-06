var num = 1;

setTable = () => {
    let url = '../api/product/fetch.php?page='+num;

    let output = `
    <div class="col-12">
        <div id="load">
            <div id="progress"></div>
        </div>
    </div>
    `;
    document.querySelector('#table').innerHTML = output;

    output = '';
    fetch(url)
    .then(response=>response.json())
    .then(response=>{
        setTimeout(()=>{
            output = `
                <table class="table bordered font-allerRg">
                    <thead>
                        <tr>
                            <th>Product</th><th>Qty</th><th></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `;
            document.querySelector('#table').innerHTML = output;

        },2900);
        setTimeout(()=>{
            
            if(response.length>0){
                output = '';
                response.forEach(element => {
                    output += `
                        <tr>
                            <td>${element.title}</td>
                            <td>${element.qty}</td>
                            <td><div class="cursor-pointer" onclick="viewItem(${element.id})">View</div></td>
                        </tr>
                    `;
                });
            document.querySelector('table tbody').innerHTML = output;
            }else{
                output = '';
                output += `
                            <tr>
                                <td colspan="3" class="center-text">No available data</td>
                            </tr>
                        `;
                document.querySelector('table tbody').innerHTML = output;
                num == 1 ? document.querySelector('#arrow').style.display = 'none' : document.querySelector('#arrow').style.display = 'block';
            }
        },3000);
    })
    .catch(error=>console.log(error));
}
setTable();

var holder = document.querySelector('#holder');
var tableHolder = document.querySelector('#table');
var arrowHolder = document.querySelector('#arrow');

viewItem = id => {
    let output = '';
    tableHolder.removeChild(document.querySelector('table'));
    holder.classList.add('width-30');
    holder.classList.remove('width-50');
    arrowHolder.style.display = 'none';

    output = `
    <div class="col-12">
        <div id="load">
            <div id="progress"></div>
        </div>
    </div>
    `;
    tableHolder.innerHTML = output;

    fetch('../api/product/single.php?id='+id)
    .then(response=>response.json())
    .then(response=>{
        output = '';
        setTimeout(()=>{
            output += `
                <form onsubmit="updateRecord(event)">
                    <div><input type="hidden" id="id" value="${id}" /></div>
                    <div class="font-allerRg">
                        <label>Title</label>
                        <input type="text" value="${response.title}" id="title" readonly />
                    </div><br />

                    <div class="font-allerRg">
                        <label>Price</label>
                        <input type="text" value="${response.price}" id="price" readonly />
                    </div><br />
                    <div class="font-allerRg">
                        <label>Quantity</label>
                        <input type="number" min=1 value="${response.qty}" id="qty" readonly />
                    </div><br />
                    <div class="font-allerRg">
                        <label>Barcode</label>
                        <input type="text" value="${response.barcode}" id="barcode" readonly />
                    </div><br />

                    <div id="edit" onclick="freeInputs()" class="blue-bg btn">Edit Fields <i class="fas fa-edit"></i></div><br />
                    <div id="edit" onclick="del(${id})" class="red-bg btn">Delete Record <i class="fas fa-cut"></i></div>
                    <div id="imgBtn" onclick="manageImg({'id':${id}, 'title':'${response.title}', 'img':'${response.img}'})" class="blue-bg btn">Update Product Image</div>
                    <div id="backTable" onclick="backToTable()" class="blue-text backTable"><i class="fas fa-backspace red-text"></i> Back to table</div>
                    
                    <div id="freeBtn" class="display-none"><input type="submit" value="Edit Product" /></div><br />
                    
                    <div id="break" class="display-none width-100 height-5"></div>
                    <div id="secondT" onclick="backToTable()" class="blue-text backTable"><i class="fas fa-backspace red-text"></i> Back to table</div>
                </form>
            `;
            tableHolder.innerHTML = output;
        },3000);
    })
    .catch(error=>console.log(error));
}

freeInputs = () =>{
    let edit = document.querySelector('#edit');
    edit.style.display = 'none';
    document.querySelector('#title').removeAttribute('readonly');
    document.querySelector('#price').removeAttribute('readonly');
    document.querySelector('#qty').removeAttribute('readonly');
    document.querySelector('#barcode').removeAttribute('readonly');
    document.querySelector('#freeBtn').classList.remove('display-none');
    document.querySelector('#imgBtn').style.display = 'block';
    document.querySelector('#backTable').style.display = 'none';
    document.querySelector('#secondT').style.display = 'block';
    document.querySelector('#break').classList.remove('display-none');
}

manageImg = obj =>{
    let output = `
        <form onsubmit="updateImage(event)">
            <div><input type="hidden" id="id" value="${obj.id}" /></div>
            <div class="font-allerRg">
            <label>Upload new image for ${obj.title}</label> <br />
            <input type="file" id="img" class="input" />
            </div><br />

            <div id="freeBtn"><input type="submit" value="Update Image" /></div><br />

            <div class="width-100 height-5"></div>
            <div onclick="backToTable()" class="blue-text backTable"><i class="fas fa-backspace red-text"></i> Back to table</div>
            
            <div class="width-100 height-8"></div>

            <div class="${obj.img != 'null' ? 'display-block width-50 margin-auto' : 'display-none'}">
                <div class="img-container">
                    <img src="${obj.img}" alt="${obj.img}" />
                </div>
            </div>

        </form>
    `;
    tableHolder.innerHTML = output;
}

document.querySelector('#back').addEventListener('click', e=>{
    num--;
    num < 1 ? num = 1 : num;

    let output = `
    <div class="col-12">
        <div id="load">
            <div id="progress"></div>
        </div>
    </div>
    `;
    tableHolder.innerHTML = output;

    setTimeout(()=>{
        output = `
            <table class="table bordered font-allerRg">
                <thead>
                    <tr>
                        <th>Product</th><th>Qty</th><th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        document.querySelector('#table').innerHTML = output;

    },2900);

    output = '';

    let url = "../api/product/fetch.php?page="+num;
    fetch(url)
    .then(response=>response.json())
    .then(response=>{

        setTimeout(()=>{
            output = '';
            if(response.length > 0){
                response.forEach(element => {
                    output += `
                        <tr>
                            <td>${element.title}</td>
                            <td>${element.qty}</td>
                            <td><div class="cursor-pointer" onclick="viewItem(${element.id})">View</div></td>
                        </tr>
                    `;
                });
                document.querySelector('table tbody').innerHTML = output;
            }else{
                output += `
                            <tr>
                                <td colspan="3" class="center-text">No available data</td>
                            </tr>
                        `;
                document.querySelector('table tbody').innerHTML = output;
            }
        },3000);
    })
    .catch(error=>console.log(error));
});

document.querySelector('#forward').addEventListener('click', e=>{

    num++;
    let output = `
    <div class="col-12">
        <div id="load">
            <div id="progress"></div>
        </div>
    </div>
    `;
    tableHolder.innerHTML = output;

    setTimeout(()=>{
        output = `
            <table class="table bordered font-allerRg">
                <thead>
                    <tr>
                        <th>Product</th><th>Qty</th><th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        document.querySelector('#table').innerHTML = output;

    },2900);
    
    output = '';

    let url = "../api/product/fetch.php?page="+num;
    fetch(url)
    .then(response=>response.json())
    .then(response=>{
        setTimeout(()=>{
            output = '';
            if(response.length > 0){
                response.forEach(element => {
                    output += `
                        <tr>
                            <td>${element.title}</td>
                            <td>${element.qty}</td>
                            <td><div class="cursor-pointer" onclick="viewItem(${element.id})">View</div></td>
                        </tr>
                    `;
                });
                document.querySelector('table tbody').innerHTML = output;
            }else{
                num--;
                output += `
                            <tr>
                                <td colspan="3" class="center-text">No available data</td>
                            </tr>
                        `;
                document.querySelector('table tbody').innerHTML = output;
            }
        },3000);
    })
    .catch(error=>console.log(error));
});

backToTable = () => {
    holder.classList.add('width-40');
    holder.classList.remove('width-30');

    // let out = `
    //     <table class="table bordered font-allerRg">
    //         <thead>
    //             <tr>
    //                 <th>Product</th>
    //                 <th>Qty</th>
    //                 <th></th>
    //             </tr>
    //         </thead>
    //         <tbody></tbody>
    //     </table>
    // `;
    // tableHolder.innerHTML = out;
    setTable();
    arrowHolder.style.display = 'block';
}

updateRecord = e => {
    e.preventDefault();
    let id = document.querySelector('#id').value;
    let title = document.querySelector('#title').value;
    let price = document.querySelector('#price').value;
    let qty = document.querySelector('#qty').value;
    let barcode = document.querySelector('#barcode').value;

    let formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('qty', qty);
    formData.append('barcode', barcode);

    fetch('../api/product/edit.php', {method:"POST", body: formData})
    .then(response=>response.json())
    .then(response=>{
        
        setTimeout(()=>{
            document.querySelector('#response').innerHTML = response.msg;
            holder.classList.add('width-40');
            holder.classList.remove('width-30');

            setTable();
            arrowHolder.style.display = 'block';
        },3000);

        setTimeout(()=>{
            document.querySelector('#response').innerHTML = '';
        },6000);
    })
    .catch(error=>console.log(error));
}

updateImage = e => {
    e.preventDefault();
    let id = document.querySelector('#id').value;
    let newImage = document.querySelector('#img').files[0];

    let formData = new FormData();
    formData.append('id', id);
    formData.append('img', newImage);

    fetch('../api/product/updateImage.php', {method:"POST", body:formData})
    .then(response=>response.json())
    .then(response=>{

        setTimeout(()=>{
            document.querySelector('#response').innerHTML = response.msg;
            
            holder.classList.add('width-40');
            holder.classList.remove('width-30');

            setTable();
            arrowHolder.style.display = 'block';
        },3000);

        setTimeout(()=>{
            document.querySelector('#response').innerHTML = '';
        },6000);
    })
    .catch(error=>console.log(error));
}

del = id => {
    fetch('../api/product/delete.php?id='+id)
    .then(response=>response.json())
    .then(response=>{
        setTimeout(()=>{
            document.querySelector('#response').innerHTML = response.msg;
        },1000);

        setTimeout(()=>{
            document.querySelector('#response').innerHTML = '';
            setTable();
        },3000);
    })
    .catch(error=>console.log(error));
}