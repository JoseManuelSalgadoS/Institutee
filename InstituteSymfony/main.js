const url = "http://localhost:80/Institute/InstituteSymfony/public/index.php";

const getSchoolById = async id => {
    return await $.ajax({
        type: 'GET',
        url: url + '/school/' + id
    }).done(res => res);
};

const getId = async id => {
    document.getElementById("id_delete").value = id;
};

const getInfo = async id => {
    let school = await getSchoolById(id);

    document.getElementById("name").value = school.school[0].name;
    document.getElementById("street").value = school.school[0].street;
    document.getElementById("created").value = school.school[0].created;
    document.getElementById("updated").value = school.school[0].updated;
    document.getElementById("status").value = school.school[0].status ? "Activo" : "Inactivo";
};

const getInfoUpdate = async id => {
    let school = await getSchoolById(id);

    document.getElementById("id_update").value = id;
    document.getElementById("name_update").value = school.school[0].name;
    document.getElementById("street_update").value = school.school[0].street;
    document.getElementById("created_update").value = school.school[0].created;
    document.getElementById("updated_update").value = school.school[0].updated;
};

const fill = list => {
    let table = "";
    $(`#table > tbody`).empty();

    if(list.length > 0){
        for(let i = 0; i < list.length; i++) {
            table += `
            <tr>
                <td>${ i + 1 }</td>
                <td>${ list[i].name }</td>
                <td>${ list[i].street }</td>
                <td>${ list[i].created }</td>
                <td>${ list[i].updated }</td>
                <td>${ list[i].status ? "Activo" : "Inactivo" }</td>
                <td>
                    <button onclick="getInfo(${ list[i].id })" type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#details">Detalles</button>
                    <button onclick="getInfoUpdate(${ list[i].id })" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-edit"></i> Modificar</button>
                    <button onclick="getId(${ list[i].id })" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete">Eliminar</button>
                </td>
            </tr>
            `;
        }
    }else{
        table = `
        <tr class="text-center">
            <td colspan="5">No hay registros para mostrar</td>
        </tr>
        `;
    }
    $(`#table > tbody`).html(table);
};

const getSchools = async () => {
    await $.ajax({
        type: 'GET',
        url: url + '/schools'
    }).done(res => {
        fill(res.listSchools);
    });
};

const registerSchool = async () => {
    let name = document.getElementById("name_register").value;
    let street = document.getElementById("street_register").value;
    let created = document.getElementById("created_register").value;
    let updated = document.getElementById("updated_register").value;


    await $.ajax({
        type: "POST",
        url: url + "/school/create",
        data: {name, street, created, updated}
    }).done(function(res){
        console.log(res);
    });
};

const updateProduct = async () => {
    let id = document.getElementById("id_update").value;
    let name = document.getElementById("name_update").value;
    let street = document.getElementById("street_update").value;
    let created = document.getElementById("created_update").value;
    let updated = document.getElementById("updated_update").value;
    
    await $.ajax({
        type: "POST",
        url: url + "/school/update/" + id,
        data: {name, street, created, updated}
    }).done(function(res){
        console.log(res);
    });
};

const deleteProduct = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'GET',
        url: url + '/school/delete/' + id
    }).done(res => {
        console.log(res);
        getSchools();
    });
};

getSchools();