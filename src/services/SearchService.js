const limitSearch = 10;
function searchItemByName(query, itens) {
  let resposta = itens.filter((item) =>
    item.nome.toLowerCase().includes(query.toLowerCase())
  );
  resposta = resposta.slice(0, limitSearch);
  return resposta;
}
export default searchItemByName;
