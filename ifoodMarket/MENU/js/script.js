let modalKey = 0
let quantProduto = 1
let cart = [] 

// =================================================================
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.janelaProduto').style.opacity = 0
    seleciona('.janelaProduto').style.display = 'flex'
    setTimeout(() => seleciona('.janelaProduto').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.janelaProduto').style.opacity = 0 
    setTimeout(() => seleciona('.janelaProduto').style.display = 'none', 500)
}

const botoesFechar = () => {
    selecionaTodos('.produtoInfo--cancelButton, .produtoInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDosProdutos = (produtoItem, item, index) => {
	produtoItem.setAttribute('data-key', index)
    produtoItem.querySelector('.produto-item--img img').src = item.img
    produtoItem.querySelector('.produto-item--price').innerHTML = formatoReal(item.price[2])
    produtoItem.querySelector('.produto-item--name').innerHTML = item.name
    produtoItem.querySelector('.produto-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.produtoBig img').src = item.img
    seleciona('.produtoInfo h1').innerHTML = item.name
    seleciona('.produtoInfo--desc').innerHTML = item.description
    seleciona('.produtoInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

const pegarKey = (e) => {
    let key = e.target.closest('.produto-item').getAttribute('data-key')
    console.log('Produto clicado ' + key)
    console.log(produtoJson[key])
    quantProduto = 1
    modalKey = key
    return key
}

const preencherTamanhos = (key) => {
    seleciona('.produtoInfo--size.selected').classList.remove('selected')
    selecionaTodos('.produtoInfo--size').forEach((size, sizeIndex) => {
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = produtoJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    selecionaTodos('.produtoInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            seleciona('.produtoInfo--size.selected').classList.remove('selected')
            size.classList.add('selected')
            seleciona('.produtoInfo--actualPrice').innerHTML = formatoReal(produtoJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    seleciona('.produtoInfo--qtmais').addEventListener('click', () => {
        quantProduto++
        seleciona('.produtoInfo--qt').innerHTML = quantProduto
    })

    seleciona('.produtoInfo--qtmenos').addEventListener('click', () => {
        if(quantProduto > 1) {
            quantProduto--
            seleciona('.produtoInfo--qt').innerHTML = quantProduto	
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.produtoInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

    	console.log("Pizza " + modalKey)

	    let size = seleciona('.produtoInfo--size.selected').getAttribute('data-key')
	    console.log("Tamanho " + size)

    	console.log("Quant. " + quantProduto)

        let price = seleciona('.produtoInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')

	    let identificador = produtoJson[modalKey].id+'t'+size

        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {

            cart[key].qt += quantProduto
        } else {

            let pizza = {
                identificador,
                id: produtoJson[modalKey].id,
                size, 
                qt: quantProduto,
                price: parseFloat(price) 
            }
            cart.push(pizza)
            console.log(pizza)
            console.log('Sub total R$ ' + (pizza.qt * pizza.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' 
    }

    seleciona('.menu-aberto').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    seleciona('.menu-fechado').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' 
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
	seleciona('.menu-aberto span').innerHTML = cart.length
	
	if(cart.length > 0) {

		seleciona('aside').classList.add('show')

		seleciona('.cart').innerHTML = ''

		let subtotal = 0
		let desconto = 0
		let total    = 0

		for(let i in cart) {
			let produtoItem = produtoJson.find( (item) => item.id == cart[i].id )
			console.log(produtoItem)

        	subtotal += cart[i].price * cart[i].qt

			let cartItem = seleciona('.modelos .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let pizzaSizeName = cart[i].size

			let pizzaName = `${produtoItem.name} (${pizzaSizeName})`

			cartItem.querySelector('img').src = produtoItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				cart[i].qt++
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					cart[i].qt--
				} else {
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} 

		desconto = subtotal * 0
		total = subtotal - desconto

		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

produtoJson.map((item, index ) => {
    let produtoItem = document.querySelector('.modelos .produto-item').cloneNode(true)
    seleciona('.produto-area').append(produtoItem)

    preencheDadosDosProdutos(produtoItem, item, index)
    
    produtoItem.querySelector('.produto-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na pizza')

        let chave = pegarKey(e)

        abrirModal()

        preencheDadosModal(item)

        preencherTamanhos(chave)

		seleciona('.produtoInfo--qt').innerHTML = quantProduto

        escolherTamanhoPreco(chave)

    })

    botoesFechar()

}) 

mudarQuantidade()

adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
