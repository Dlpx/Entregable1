class ProductManager{

    #allProducts
    #validProducts
    #error

    constructor() {
        this.#allProducts = []
        this.#validProducts = []
        this.#error = null
    }

    #idGenerator = () => (this.#allProducts.length === 0) ? 1 : this.#allProducts.length + 1
    
    #setError = ( { id, code, categoria, nombre, marca, precio, stock } ) => {

        //BUSCADOR DE REPETIDOS:
        const rep = this.#allProducts.find( prod => prod.code === code )

        // Validacion de campos
        if (rep != undefined) {
            this.#error = `ID: ${id}: Producto con CODIGO repetido`
        } else if (categoria === ''){
            this.#error = `ID: ${id}: falta CATEGORIA de producto`
        } else if (nombre === '') {
            this.#error = `ID: ${id}: falta NOMBRE de producto`
        } else if (marca === '') {
            this.#error = `ID: ${id}: falta MARCA de producto`
        } else if (precio === '') {
            this.#error = `ID: ${id}: falta PRECIO de producto`
        } else if (stock === '') {
            this.#error = `ID: ${id}: falta STOCK de producto`
        } 
    }
    
    addProduct = ( { code, categoria, nombre, marca, precio, stock } ) => {

        //Llamo a la funcion idGenerator para crear un ID y utilizarlo en el push y en el setError
        let id = this.#idGenerator()

        //Llamo a la funcion set una vez error para verificar que este todo bien
        this.#setError({id, code, categoria, nombre, marca, precio, stock})

        //Pusheo todos los productos (con y sin errores... asi puedo registrar de que producto es el error y en donde esta)
        this.#allProducts.push({
            error: this.#error,
            id: id, 
            code, 
            categoria, 
            nombre, 
            marca, 
            precio, 
            stock})

            this.#error = null
    }

    //Segun yo esta funcion no es tan util, ya que te da los productos con y sin errores.
    getAllProducts = () => this.#allProducts

    //Aca pusheo los items sin errores y los que tengan error solo lo informo, pero no los pongo completo.
    #pushValids = () => {
        this.#validProducts.push(this.#allProducts.map(prod => {
            if(prod.error != undefined) {
                return `Error en producto: ID: ${prod.id}. Error: ${prod.error}`
            } else {
                return prod
            }
        }))
    }

    //En esta funcion obtengo todos los productos validos que pushee anteriormente
    getValidProducts = () => {
        this.#pushValids()
        return this.#validProducts
    }

    //Funcion de encontrar productos por ID
    findProductByID = (id) => {
        const found = this.#allProducts.find(prod => prod.id === id)

        if(found){
            return found
        } else {
            return `Producto con ID:${id} NO ENCONTRADO`
        }
    }

    //Funcion para encontrar productos por categoria
    findProductsByCategory = (categoria) => {
        
        const prods = this.#allProducts.filter(prod => prod.categoria === categoria)

        if(prods.length > 0) {
            return prods
        } else {
            return `No se encontraro productos en la categoria ${categoria}.`
        }
    }
}


const productManager = new ProductManager()


//Listado de productos hechos como objetos para poder manejarlos optimamente luego.
productManager.addProduct({
    code: '1001',
    categoria: '',
    nombre: 'Detergente',
    marca: 'Mr. Musculo',
    precio: 3000,
    stock: 50
})
productManager.addProduct({
    code: '1002',
    categoria: 'Higiene',
    nombre: 'Jabon de tocador',
    marca: 'Dove',
    precio: 1800,
    stock: 84
})
productManager.addProduct({
    code: '1001',
    categoria: 'Cocina',
    nombre: 'Set 12 platos',
    marca: 'KitchenAid',
    precio: 30000,
    stock: 100
})
productManager.addProduct({
    code: '1004',
    categoria: 'Autos',
    nombre: 'Shampoo para carros',
    marca: 'BMW',
    precio: 23000,
    stock: 28
})
productManager.addProduct({
    code: '1005',
    categoria: 'Hogar',
    nombre: 'Florero',
    marca: 'Home',
    precio: '',
    stock: 300
})
productManager.addProduct({
    code: '1006',
    categoria: 'Higiene',
    nombre: 'Papel Higienico',
    marca: 'Scott',
    precio: 7000,
    stock: 300
})


console.log('Todos los productos: ', productManager.getAllProducts())       //Se ven todos los productos

console.log('Productos validos: ', productManager.getValidProducts())       //Se ven solo los validos, de los erroneos solo da un informe

console.log('Product finder by ID: ', productManager.findProductByID(8))    //Busca productos por id

console.log('Product finder by CATEGORY: ', productManager.findProductsByCategory('Higiene'))       //Busca productos por Categoria



// Mi objetivo para este desafio fue crear un codigo que sea lo mas especifico posible
// Queria que si el ID sea fijo para cada producto, no importa si el mismo tenia algun problema o no.. ya que en la vida real asi seria.
// Queria que a la hora de mostrar los productos, estos aparecieran en orden, y no los errores y productos desordenados para que sea mas comodo identificar el error.
// Queria tambien que el error te especificara cual habia sido la falla para que sepas como cambiarlo
// YA sea que quieras ver la lista completa de productos, o solo los validos, ahi tienes las dos opciones por separado. 
// Al momento de hacer un buscador, quise que pueda buscar el producto y que tambien pueda brindar una respuesta especifica del producto no encontrado.
// Y tambien hice un buscador por categoria, donde brinda como respuesta mas de un producto en caso de que haya mas de uno.


// NOTAS: Siempre que he querido utilizar ternarios para mis funciones he tenido problemas... no se porque. :(  Asi que como veran, utilice el IF y el ELSE porque eran los que mejor funcionaban. Esto en react no me sucedia, no se porque aca si. :(

//GRACIAS POR LEER. Saludos! 