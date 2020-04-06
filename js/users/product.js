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
                <form>
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

                    <div id="imgBtn" onclick="manageImg({'id':${id}, 'title':'${response.title}', 'img':'${response.img}'})" class="blue-bg btn">Update Product Image</div>
                    <div id="backTable" onclick="backToTable()" class="blue-text backTable"><i class="fas fa-backspace red-text"></i> Back to table</div>
                    
                </form>
            `;
            tableHolder.innerHTML = output;
        },3000);
    })
    .catch(error=>console.log(error));
}

manageImg = obj =>{
    let output = `
        <form>
            <div><input type="hidden" id="id" value="${obj.id}" /></div>
            <div class="font-allerRg">
            <label>Upload new image for ${obj.title}</label> <br />

            <div class="${obj.img != 'null' ? 'display-block width-50 margin-auto' : 'display-none'}">
                <div class="img-container">
                    <img src="${obj.img}" alt="${obj.img}" />
                </div>
            </div>

            <div class="width-100 height-5"></div>
            <div onclick="backToTable()" class="blue-text backTable"><i class="fas fa-backspace red-text"></i> Back to table</div>

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
    let truth = holder.classList.contains('width-30');
    if(truth){
        holder.classList.add('width-40');
        holder.classList.remove('width-30');
    }

    setTable();
    arrowHolder.style.display = 'block';
}