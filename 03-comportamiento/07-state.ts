/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */
interface State{
    name:string
    insertMoney():void
    selectProduct():void
    dispenseProduct():void
}

class VendingMachine {
    private state: State
    constructor(){
        this.state = new WaitingForMoney(this)
    }

    insertMoney():void{
        this.state.insertMoney()
    }
    selectProduct():void{
        this.state.selectProduct()
    }
    dispenseProduct():void{
        this.state.dispenseProduct()        
    }
    setState(newstate:State){
        this.state = newstate
        console.log(`Estado cambio a" %c${newstate.name}`)
    }
    getStateName():string{
        return this.state.name
    }
}

class WaitingForMoney implements State{
    name: string = 'Esperando Dinero'
    private vendingMachine: VendingMachine

    constructor(vendingMachine: VendingMachine){
        this.vendingMachine = vendingMachine
    }
    insertMoney(): void {
      console.log('Dinero insertado. %cAhora puedes seleccionar un producto', COLORS.green)
      this.vendingMachine.setState(new WaitingForProduct(this.vendingMachine))

    }
    selectProduct(): void {
      console.log('%Primero debes de insertar dinero',COLORS.red)
    }
    dispenseProduct(): void {
        console.log('%Primero debes de insertar dinero',COLORS.red)
    }
}
class WaitingForProduct implements State{
    name: string = 'Seleccionando producto'
    private vendingMachine: VendingMachine

    constructor(vendingMachine: VendingMachine){
        this.vendingMachine = vendingMachine
    }
    insertMoney(): void {
      console.log('%cPor favor selecciona un producto - dinero ya insertado', COLORS.red)
      
    }
    selectProduct(): void {
        console.log('%Primero debes de insertar dinero',COLORS.red)
        this.vendingMachine.setState(new WaitingForDispense(this.vendingMachine))
    }
    dispenseProduct(): void {
        console.log('%Por favor selecciona un producto - producto no seleccionado',COLORS.red)
    }
}
class WaitingForDispense implements State{
    name: string = 'Despachando Producto'
    private vendingMachine: VendingMachine

    constructor(vendingMachine: VendingMachine){
        this.vendingMachine = vendingMachine
    }
    insertMoney(): void {
      console.log('%cPorfavor espera a que se entrega el producto', COLORS.red)

    }
    selectProduct(): void {
      console.log('%Producto ya seleccionado y despachando',COLORS.red)
    }
    dispenseProduct(): void {
        console.log('%Producto despachado cambiando a insertar dinero',COLORS.green)
        this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine))
    }
}

function main(){
    const vendingMachine = new VendingMachine()

    vendingMachine.insertMoney()
    vendingMachine.dispenseProduct()
}
main()