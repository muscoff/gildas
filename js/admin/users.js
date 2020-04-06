onSubmit = e => {
    e.preventDefault();

    let email = document.querySelector('#email');

    if(email.value != ''){
        let formData = new FormData();
        formData.append('email', email.value);

        let msgHolder = document.querySelector('#msgHolder');

        let output = `
                <div id="load">
                    <div id="progress"></div>
                </div>
        `;

        msgHolder.innerHTML = output;

        fetch('../api/users/create.php', {method:"POST", body: formData})
        .then(response=>response.json())
        .then(response=>{
            setTimeout(()=>{
                if(response.created){
                    msgHolder.innerHTML = response.msg;
                }else{
                    msgHolder.innerHTML = response.msg;
                }
            },3000);
            setTimeout(()=>{
                msgHolder.innerHTML = '';
                email.value = '';
                disableButton();
            },5000);
        })
        .catch(error=>console.log(error));
    }else{
        document.querySelector('#message').innerHTML = 'Field cannot be empty';
    }
}

disableButton = () =>{
    let email = document.querySelector('#email').value;
    let btn = document.querySelector('form input[type=submit]');
    if(email == ''){
        btn.setAttribute('disabled', true);
    }else{
        btn.removeAttribute('disabled');        
    }
    setTimeout(disableButton,500);
}


findEmail = () => {
    let email = document.querySelector('#email').value;
    let btn = document.querySelector('form input[type=submit]');

    if(email != ''){
        fetch('../api/users/findEmail.php?email='+email)
        .then(response=>response.json())
        .then(response=>{
            if(response.valid){
                btn.setAttribute('disabled', true);
                document.querySelector('#message').innerHTML = 'Email already exist';
            }else{
                btn.removeAttribute('disabled');
                document.querySelector('#message').innerHTML = '';
            }
        })
        .catch(error=>console.log(error));
    }
}

document.querySelector('#email').addEventListener('input', findEmail);
document.querySelector('#email').addEventListener('keyup', findEmail);