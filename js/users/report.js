var holder = document.querySelector('#holder');

var pg = 1;
report = () => {
    let url = '../api/cart/fetch_user.php?report&page='+pg+'&role='+user_role;
    let output = `
            <div class="col-12">
                <div id="load">
                    <div id="progress"></div>
                </div>
            </div>
        `;
    document.querySelector('#row').innerHTML = output;

    fetch(url)
    .then(response=>response.json())
    .then(response=>{
        output = '';
        if(response.length > 0){
            setTimeout(()=>{
                response.forEach(element => {
                    output += `
                    <div class="col-12 padding-all-10" onclick="getReport(${element})">
                        <div class="color">
                            <div class="colorMe"></div>
                            <div class="absolute">${element} Report</div>
                        </div>
                    </div>
                    `;
                });
                document.querySelector('#row').innerHTML = output;
                document.querySelector('#arrow').style.display = 'block';
            },3000);
        }else{
            setTimeout(()=>{
                if(pg > 1){
                    pg--;
                }
                
                output += `
                <div class="col-12 padding-all-10">
                    <div class="center-text font-allerRg padding-all-10 border">No available data</div>
                    <div>
                        <div class="width-100 height-10"></div>
                        <div class="center-text font-allerRg padding-all-10 cursor-pointer" onclick="report()">
                            <i class="fas fa-backspace"></i> Go back
                        </div>
                    </div>
                </div>
                `;
                document.querySelector('#row').innerHTML = output;
                document.querySelector('#arrow').style.display = 'none';
            },3000);
        }
    })
    .catch(error=>console.log(error));
}

report();

backReport = () =>{
    pg--;
    pg = pg < 1 ? 1 : pg;
    
    setTimeout(()=>{
        report();
    },500);
}

moveReport = () =>{
    pg++;
    
    setTimeout(()=>{
        report();
    },500);
}

getReport = year => {
    let findTruth = holder.classList.contains('width-40');
    setTimeout(()=>{
        if(findTruth){
            holder.classList.add('width-30');
            holder.classList.remove('width-40');
        }
    },2500);

    let output = `
            <div class="col-12">
                <div id="load">
                    <div id="progress"></div>
                </div>
            </div>
        `;
    document.querySelector('#row').innerHTML = output;

    document.querySelector('#arrow').style.display = 'none';

    fetch('../api/cart/fetch_user.php?year='+year+'&role='+user_role)
    .then(response=>response.json())
    .then(response=>{
        
        if(response.length > 0){
            setTimeout(()=>{
                output = `
                    <div class="col-12 center-text green-text">
                        <div class="font-jsans padding-all-10 border-bottom font-20 uppercase">${year} Report</div>
                        <div class="width-100 height-5"></div>
                    </div>
                `;

                response.forEach(element=>{
                    output += `
                        <div class="col-12 padding-all-5 font-allerRg center-text">
                            <div class="padding-all-10 border lift" onclick="getInfo({'year':${year}, 'month':'${element.month}'})">
                                <div>${element.month} Report</div>
                                <div>Total Reports : <span class="blue-text">${element.report}</span></div>
                            </div>
                        </div>
                    `;
                });

                output +=`
                    <div class="col-12">
                        <div class="width-100 height-5"></div>
                        <div class="center-text font-allerRg">
                            <div clas="padding-all-10">
                                <span class="padding-right-10" title="Back to ${year-1}" onclick="moveBack(${year})"><i class="fas fa-arrow-left cursor-pointer"></i></span>
                                <span class="padding-left-10" title="Move to ${year+1}" onclick="moveForward(${year})"><i class="fas fa-arrow-right blue-text cursor-pointer"></i></span>
                            </div>
                            <div class="padding-all-10 red-hover cursor-pointer" onclick="backToReport()"><i class="fas fa-backspace"></i> Back to report</div>
                        </div>
                    </div>
                `; 
                document.querySelector('#row').innerHTML = output;
            },3000);
        }else{
            setTimeout(()=>{
                output += `
                    <div class="col-12 padding-all-10 border">
                        <div class="font-allerRg center-text">Empty Record</div>
                    </div>

                    <div class="col-12">
                        <div class="width-100 height-5"></div>
                        <div class="center-text font-allerRg">
                            <div class="padding-all-10 red-hover cursor-pointer" onclick="backToReport()"><i class="fas fa-backspace"></i> Back to report</div>
                        </div>
                    </div>
                `;
                document.querySelector('#row').innerHTML = output;
            },3000);
        }
    })
    .catch(error=>console.log(error));
}

backToReport = () => {

    let output = `
            <div class="col-12">
                <div id="load">
                    <div id="progress"></div>
                </div>
            </div>
        `;
    document.querySelector('#row').innerHTML = output;
    output = '';

    setTimeout(()=>{
        report();
    },3000);
}

moveBack = year => {
    year = parseInt(year);
    year = year - 1;

    getReport(year);
}

moveForward = year => {
    year = parseInt(year);
    year = year + 1;

    getReport(year);
}

var page = 1;
getInfo = obj => {
    let findTruth = holder.classList.contains('width-30');
    setTimeout(()=>{
        if(findTruth){
            holder.classList.add('width-40');
            holder.classList.remove('width-30');
        }
    },2500);

    let output = `
            <div class="col-12">
                <div id="load">
                    <div id="progress"></div>
                </div>
            </div>
        `;
    document.querySelector('#row').innerHTML = output;

    let url = '../api/cart/fetch_user.php?yr='+obj.year+'&mon='+obj.month+'&page='+page+'&role='+user_role;
    fetch(url)
    .then(response=>response.json())
    .then(response=>{

        if(response.length > 0){
            setTimeout(()=>{
                output = `
                    <div class="col-12 center-text green-text">
                        <div class="font-jsans padding-all-10 border-bottom font-20 uppercase">${obj.month} ${obj.year} Report</div>
                        <div class="width-100 height-5"></div>
                    </div>
                `;
                response.forEach(element=>{
                    output += `
                        <div class="col-12 padding-all-10 font-jsans border">
                            <div>
                                Amount Paid: <span class="blue-text font-allerRg">${element.paid}</span> || Total Unique Items: <span class="blue-text font-allerRg">${element.cart.length}</span>
                            </div>
                            <div>Administered by: <span class="capitalize green-text">${element.role}</span></div>
                            <div class="trailing">---------------------------------------------------------------------------------------------------------------------</div><br />
                            <div></div>
                            <div class="row">
                        
                    `;
                    element.cart.forEach(cartItems=>{
                        output += `
                            <div class="col-6 padding-all-5">
                                <div>Title: <span class="blue-text font-allerRg">${cartItems.title}</span></div>
                                <div>Price: <span class="green-text font-allerRg">${cartItems.price}</span></div>
                                <div>Quantity: <span class="blue-text font-allerRg">${cartItems.qty}</span></div>
                                <div>Sub Total: <span class="red-text font-allerRg">${cartItems.subTotal}</span></div>
                            </div>
                        `;
                    });

                    output += `
                            </div></div>
                            <div class="col-12">
                                <div class="width-100 height-1"></div>
                            </div>
                            `;
                    
                });

                output += `
                            <div class="col-12">
                            <div class="width-100 height-5"></div>
                            <div class="padding-all-10">
                                <div class="center-text">
                                    <span class="padding-right-10" onclick="backInfo({'year':${obj.year}, 'month':'${obj.month}'})">
                                        <i class="fas fa-arrow-left red-text"></i>
                                    </span>
                                    <span class="padding-left-10" onclick="nextInfo({'year':${obj.year}, 'month':'${obj.month}'})">
                                        <i class="fas fa-arrow-right blue-text"></i>
                                    </span>
                                </div><br />
                                <div class="center-text red-hover cursor-pointer padding-all-5" onclick="getReport(${obj.year})">
                                    <i class="fas fa-backspace blue-text"></i> Go back
                                </div>
                            </div>
                            </div>
                        `;
                document.querySelector('#row').innerHTML = output;
            },3000);
            //console.log(response);
        }else{
            setTimeout(()=>{
                if(page>1){
                    page--;
                }
                output += `
                    <div class="col-12 padding-all-5 font-allerRg">
                        <div class="center-text padding-all-10 border">No report for ${obj.month} in ${obj.year}</div>
                        <div class="width-100 height-10"></div>
                        <div class="padding-all-10 yellow-hover cursor-pointer" onclick="getReport(${obj.year})">
                            <i class="fas fa-backspace"></i> Go back
                        </div>
                    </div>
                `;
                document.querySelector('#row').innerHTML = output;
            },3000);
        }
    })
    .catch(error=>console.log(error));
}

nextInfo = obj => {
    let output = `
            <div class="col-12">
                <div id="load">
                    <div id="progress"></div>
                </div>
            </div>
        `;
    document.querySelector('#row').innerHTML = output;

    page++;

    setTimeout(()=>{
        getInfo(obj);
    },500);
}

backInfo = obj => {
    let output = `
            <div class="col-12">
                <div id="load">
                    <div id="progress"></div>
                </div>
            </div>
        `;
    document.querySelector('#row').innerHTML = output;

    page--;
    page = page < 1 ? page=1 : page;

    setTimeout(()=>{
        getInfo(obj);
    },500);
}