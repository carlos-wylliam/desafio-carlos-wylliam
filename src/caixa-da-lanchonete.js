class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        //Verificando caso item extra seja informado num pedido que não tenha o respectivo item principal
        for (const pedido of itens) {
            if (pedido.includes('chantily')) {
                const verificarItemExtraCafe = itens.some((itemExtra) => {
                    return itemExtra.includes('cafe')
                })
                if (!verificarItemExtraCafe) {
                    return ('Item extra não pode ser pedido sem o principal')

                }
            }

            if (pedido.includes('queijo')) {
                const verificarItemExtraSanduiche = itens.some((itemExtra) => {
                    return itemExtra.includes('sanduiche')
                })

                if (!verificarItemExtraSanduiche) {
                    return ('Item extra não pode ser pedido sem o principal')

                }
            }
        }

        //Verificando se foi informado algum item
        if (itens.length === 0 || itens[0].trim() === '') {
            return ('Não há itens no carrinho de compra!')

        }

        //Verificando se foi passado alguma quantidade válida de item
        const pedidoVetor = itens[0].split(',')
        const pedidoPartes = Number(pedidoVetor[1])

        if (pedidoPartes <= 0) {
            return ('Quantidade inválida!')

        }

        let valorTotal = 0

        //Objeto Cardapio
        const cardapio = [
            { codigo: 'cafe', valor: 3.00 },
            { codigo: 'chantily', valor: 1.50 },
            { codigo: 'suco', valor: 6.20 },
            { codigo: 'sanduiche', valor: 6.50 },
            { codigo: 'queijo', valor: 2.00 },
            { codigo: 'salgado', valor: 7.25 },
            { codigo: 'combo1', valor: 9.50 },
            { codigo: 'combo2', valor: 7.50 }
        ]

        for (const pedido of itens) {
            const pedidoVetor = pedido.split(',');
            const codigo = pedidoVetor[0].trim().toLowerCase();
            const quantidade = Number(pedidoVetor[1]);

            const lanche = cardapio.find((itemCardapio) => itemCardapio.codigo === codigo);

            //verificando se o codigo existe
            if (!lanche) {
                return (`Item inválido!`);

            }

            valorTotal += lanche.valor * quantidade;
        }

        //Validando a forma de pagamento
        if (!(metodoDePagamento === 'credito' || metodoDePagamento === 'debito' || metodoDePagamento === 'dinheiro')) {
            return ('Forma de pagamento inválida!')

        }

        if (metodoDePagamento === 'credito') {
            const acrescimoCredito = 3 * valorTotal / 100
            valorTotal = valorTotal + acrescimoCredito
        } else if (metodoDePagamento === 'dinheiro') {
            const descontoDinheiro = 5 * valorTotal / 100
            valorTotal = valorTotal - descontoDinheiro
        }

        const valorFormatado = valorTotal.toFixed(2).replace(".", ",")
        return (`R$ ${valorFormatado}`)
        return "";
    }
}

new CaixaDaLanchonete().calcularValorDaCompra('debito', ['cafe,1', 'chantily,1'])

export { CaixaDaLanchonete };
