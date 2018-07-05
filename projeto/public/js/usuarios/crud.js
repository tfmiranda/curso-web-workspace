$(function() {
    console.log('Javascript de crud de usuário');

    /**
     * Realizar uma requisição do tipo DELETE no clique do botão, 
     * recuperando o id do usuário através de uma propriedade data do botão
     * Sugestão: exibir um modal de confirmação do bootstrap confirmando a remoção
     */

    const $btnRemover = $('[name="btn-remover"]');
    $btnRemover.click(function() {
        const id = $(this).data('id');
        console.log('removendo usuário com id:', id);

        $.ajax({
            url: `/usuarios/${id}`,
            method: 'DELETE',
            contentType: "application/json"
        }).done(() => {
            console.log('Usuário removido com sucesso');
            document.location.reload(true);
        }).fail(err => {
            console.log('Erro ao remover usuário');
        });
    });
});