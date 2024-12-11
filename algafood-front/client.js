function consultarFormasPagamento() {
  $.ajax({
    url: "http://localhost:8080/formaspagamento",
    type: "get",

    success: function (response) {
      preencherTabela(response);
    }
  });
}

function cadastrar() {
  var formaPagamentoJson = JSON.stringify({
    "descricao": $("#campo-descricao").val()
  });

  console.log(formaPagamentoJson);

  $.ajax({
    url: "http://localhost:8080/formaspagamento",
    type: "post",
    data: formaPagamentoJson,
    contentType: "application/json",

    success: function (response) {
      alert("Forma de pagamento adicionada!");
      consultarFormasPagamento();
    },

    error: function (error) {
      if (error.status == 400) {
        var problem = JSON.parse(error.responseText);
        alert(problem.userMessage);
      } else {
        alert("Erro ao cadastrar forma de pagamento");
      }
    }
  });
}

function excluir(formaPagamento) {
  $.ajax({
    url: "http://localhost:8080/formaspagamento/" + formaPagamento.id,
    type: "delete",

    success: function (response) {
      consultarFormasPagamento();
      alert("Exclusão realizada com sucesso");
    },

    error: function (error) {
      // tratando todos os erros da categoria 4xx
      if (error.status >= 400 && error.status <= 499) {
        var problem = JSON.parse(error.responseText);
        alert(problem.userMessage);
      } else {
        alert("Erro ao remover forma de pagamento!");
      }
    }

  });


}

function preencherTabela(formasPagamento) {
  $("#tabela tbody tr").remove();

  $.each(formasPagamento, function (i, formaPagamento) {
    var linha = $("<tr>");

    var linkacao = $("<a href='#'>")
      .text("Excluir")
      .click(function (event) {
        event.preventDefault();
        excluir(formaPagamento);
      });

    linha.append(
      $("<td>").text(formaPagamento.id),
      $("<td>").text(formaPagamento.descricao),
      $("<td>").append(linkacao)
    );

    linha.appendTo("#tabela");
  });
}

function consultarRestaurantes() {
  $.ajax({
    url: "http://localhost:8080/cozinhas",
    type: "get",

    success: function (response) {
      $("#conteudo").text(JSON.stringify(response));
    }
  })
}

function fecharRestaurante() {
  $.ajax({
    url: "http://localhost:8080/restaurantes/1/close",
    type: "put",

    success: function (response) {
      alert("Restaurante foi fechado!")
      //$("#conteudo").text(JSON.stringify(response));
    }
  })
}

$("#btn-consultar").click(consultarFormasPagamento);

$("#btn-cadastrar").click(cadastrar);