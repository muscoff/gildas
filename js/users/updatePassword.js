onSubmit = e => {
    e.preventDefault();
    let pass = document.querySelector('#password').value;
    let username = document.querySelector('#username').value;

    let msgHolder = document.querySelector('#msgHolder');

    let output = `
                <div id="load">
                    <div id="progress"></div>
                </div>
        `;
    msgHolder.innerHTML = output;

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', pass);

    fetch('../api/users/updatePassword.php', {method:"POST", body:formData})
    .then(response=>response.json())
    .then(response=>{
        console.log(response);
        setTimeout(()=>{
            msgHolder.innerHTML = response.msg;
        },3000);
        setTimeout(()=>{
            output = `<div></div>`;
            msgHolder.innerHTML = output;
            pass.value = '';
            document.querySelector('#confirm').value = '';
            document.querySelector('form input[type=submit]').setAttribute('disabled', true);
        },5000);
    })
    .catch(error=>console.log(error));
}

confirmPassword = () => {
    let pass = document.querySelector('#password');
    let confirmP = document.querySelector('#confirm');
    let btn = document.querySelector('form input[type=submit]');

    if(pass.value != '' & confirmP.value !=''){
        if(pass.value == confirmP.value){
            btn.removeAttribute('disabled');
        }else{
            btn.setAttribute('disabled', true);
        }
    }
}

document.querySelector('#password').addEventListener('input', confirmPassword);
document.querySelector('#password').addEventListener('keyup', confirmPassword);

document.querySelector('#confirm').addEventListener('input', confirmPassword);
document.querySelector('#confirm').addEventListener('keyup', confirmPassword);