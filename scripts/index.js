document.addEventListener("DOMContentLoaded",() => {
    // Container labels
    const searchForm = document.getElementById("box-form-search")
    const deleteForm = document.getElementById("box-form-delete")
    const resultCard = document.getElementById("div-search")
    const resultCardDelete = document.getElementById("div-delete")

    // Dynamic labels 
    const searchInput = document.getElementById("input-search")
    const deleteInput = document.getElementById("input-delete")

    // Btn labels
    const btnSearch = document.getElementById("btn-search")
    const btnDelete = document.getElementById("btn-delete")
    const btnSendSearch = document.getElementById("btn-search-submit")
    const btnSendDelete = document.getElementById("btn-delete-submit")

    // Vars 
    let info = []

    // Events
    btnSearch.addEventListener("click",showSearchForm)
    btnDelete.addEventListener("click",showDeleteForm)
    btnSendSearch.addEventListener("click",searchPet)
    btnSendDelete.addEventListener("click",deletePet)

    // functions
    function showSearchForm() {
        searchForm.classList.remove("inactive")
        deleteForm.classList.add("inactive")
    }

    function showDeleteForm() {
        searchForm.classList.add("inactive")
        deleteForm.classList.remove("inactive")
    }

    function searchPets() {
        fetch("./datas/pets.json")
        .then(res => res.json())
        .then(data => data.forEach(i => info.push(i)))
    }

    function searchPet() {
        const inputName = searchInput.value
        let pets = info

        const pet = pets.find(pet => pet.nombre === inputName)
    
        if(pet) {
            resultCard.innerHTML = `
            <h3>Mascota Encontrada</h3>
            <p><strong>Nombre:</strong> ${pet.nombre}</p>
            <p><strong>Especie:</strong> ${pet.especie}</p>
            <p><strong>Raza:</strong> $${pet.raza}</p>
            <p><strong>Edad:</strong> ${pet.edad}</p>
            <p><strong>Peso:</strong> ${pet.peso}</p>
            <p><strong>Nombre Propietario:</strong> ${pet.nombre_propietario}</p>
            <p><strong>Sexo:</strong> ${pet.sexo}</p>
        `
        } else resultCard.innerHTML = '<p style="color: red;">Mascota no encontrada</p>'
    }
    
    function deletePet() {
        // Vars 
        const deleteInputName = deleteInput.value
        try {
            const index = info.findIndex(pet => pet.nombre === deleteInputName)

            if(index !== -1) {
                const deletedPet = info.splice(index, 1)

                resultCardDelete.innerHTML = `<p style="color: white;">La mascota${deleteInputName} ha sido borrada exitosamente.</p>`
            } else {
                resultCardDelete.innerHTML = '<p style="color: red;">Mascota no encontrada</p>'
            }
        } catch(err) {
            resultCardDelete.innerHTML = `<p style='color: red;'>${err}</p>`
        }
    }

    // Call functions
    searchPets()
    
})