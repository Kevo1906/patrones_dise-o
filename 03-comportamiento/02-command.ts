import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */
interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log("%cLa luz esta encendida", COLORS.yellow);
  }

  turnOff(): void {
    console.log("%cLa luz esta apagada", COLORS.yellow);
  }
}

class Fan {
  on(): void {
    console.log("%cEl ventilador esta encendido", COLORS.green);
  }
  off(): void {
    console.log("%cEl ventilador esta apagado", COLORS.green);
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn()
  }
}
class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff()
  }
}
class FanOnCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.on()
  }
}
class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.off()
  }
}

class RemoteControl{
    private commands: Record<string,Command> = {}

    setCommand(button:string,command:Command){
        this.commands[button] = command
    }

    pressButton(button:string):void{
        if(this.commands[button]){
            this.commands[button].execute()
            return
        }

        console.log('Ese boton no existe')
    }
}

function main(){
    const remoteControl = new RemoteControl()
    const light = new Light()
    const fan = new Fan()

    const lightOnCommand = new LightOnCommand(light)
    const lightOffCommand = new LightOffCommand(light)

    const fanOnCommand = new FanOnCommand(fan)
    const fanOffCommand = new FanOffCommand(fan)

    remoteControl.setCommand('1',lightOnCommand)
    remoteControl.setCommand('2',lightOffCommand)
    remoteControl.setCommand('3',fanOnCommand)
    remoteControl.setCommand('4',fanOffCommand)

    let continueProgram = true

    do {
        console.clear()
        const pressedbutton = prompt(
            `Presiona un boton del control:
            1. Encender la luz
            2. Apagar la luz
            3. Encender el ventilador
            4. Apagar ventilador
            
            Boton:`
        )??''

        remoteControl.pressButton(pressedbutton)

        const continueProgramResponse = prompt(`
            \nDesea continuar?(y/n)`)?.toLowerCase()
        continueProgram = continueProgramResponse === 'n'? false:true
    } while(continueProgram)
}

main()