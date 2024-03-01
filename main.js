const name = document.querySelector("#name");
const phone = document.getElementById("phone");
const button = document.querySelector("#button");
const validPhoneCharacters = "-_1_2_3_4_5_6_7_8_9_0_ _(_)_+_Backspace_Control_Shift_AltGraph_" //caracteres permitidos para o numero de telefone
const validNameDigit = "a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z_ _Shift_Backspack_AltGraph_~_ã_õ_á_à_é_è"; //caracteres permitidos para o nome
const contactNames = [""]; //array com os nomes adicionados
const contactNumbers = [""]; //array com os numeros adicionados
let error = "";


//Valida número de telefone
function isValidPhoneDigit(key) {    
    //verifica se a tecla digitada está na lista de teclas permitidas
    if(validPhoneCharacters.split("_").includes(key) ||
     phone.value.toLowerCase().includes(validPhoneCharacters)){
        return true;
    }
    //retorna falso caso a tecla não esteja na lista de teclas permitidas
    return false;
}

//Valida nome
function isValidNameDigit(key) {
    //verifica se a tecla digitada está na lista de teclas permitidas
    if(validNameDigit.toLowerCase().split("_").includes(key) || 
        name.value.toLowerCase().includes(validNameDigit)
    ) {
        return true;
    }
    //retorna falso caso a tecla não esteja na lista de teclas permitidas
    return false;
}

//Valida ao clicar no botao
function validateSubmit(name, phone) {
    //valida se o campo ta vazio
    if(!name || !phone) {
        error = "Algum dos campos está vazio";
        return false;
    }
    //valida se não existem dois contatos com o mesmo telefone
    if(contactNumbers.includes(phone.toString())) {
        error = `O contato <strong style="color: yellow">${contactNames[contactNames.indexOf(name)]}</strong> já possui este telefone`;
        return false;
    }
 }

function addContact(){
    //adiciona no array de contatos
    contactNames.push(name.value);
    contactNumbers.push(phone.value);

    //adiciona na tela
    let contact = `<tr class="flex title-table">`;
    contact += `<td>${name.value}</td>`;
    contact += `<td>${phone.value}</td>`;
    contact += `</tr>`;

    const tbody = document.querySelector("tbody");
    tbody.innerHTML += contact;
}

 //Valida cada tecla que o usuario digita no campo de telefone
 phone.addEventListener("keypress", function(e) {
    if(!isValidPhoneDigit(e.key.toString())){
        e.preventDefault();
    }

});

//valida cada tecla que o usuário digita no campo de nome
name.addEventListener("keypress", function(e) {
    if(!isValidNameDigit(e.key.toString())) {
        e.preventDefault();
    }
});

button.addEventListener("click", function(e) {
    const errorMessage = document.querySelector(".error-message");
    if(validateSubmit(name.value.trim(), phone.value.trim()) === false){
        errorMessage.innerHTML = `<p class="error">${error}</p>`;
        return;
    } else {
        errorMessage.innerHTML = "";
        addContact();
    }
});