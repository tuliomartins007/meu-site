document.getElementById("cepForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const cep = document.getElementById("cep").value;
    const addressCard = document.getElementById("addressCard");
    const loading = document.getElementById("loading");

    // Exibe o indicador de carregamento
    loading.style.display = "block";

    // Consulta a API do ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
            if (!data.erro) {
                // Preenche os dados do endereço
                document.getElementById("displayCep").textContent = data.cep;
                document.getElementById("displayEndereço").textContent = data.logradouro;
                document.getElementById("displayBairro").textContent = data.bairro;
                document.getElementById("displayCidade").textContent = data.localidade;
                document.getElementById("displayEstado").textContent = data.uf;

                // Exibe o card com os dados do endereço
                addressCard.style.display = "block";
            } else {
                // Caso o CEP não seja encontrado, exibe uma mensagem de erro
                alert("CEP não encontrado.");
            }

            // Oculta o indicador de carregamento
            loading.style.display = "none";
        })
        .catch((error) => {
            console.error("Erro na consulta: ", error);
            alert("Ocorreu um erro na consulta.");
            // Oculta o indicador de carregamento
            loading.style.display = "none";
        });
});