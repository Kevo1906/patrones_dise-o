import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */
interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green)
  }

  unsubscribe(observer:Observer):void{
    this.subscribers = this.subscribers.filter(sub => sub !== observer)
    console.log(`Un suscriptor se ha dado de baja`)
  }

  uploadVideo(videoTitle:string):void{
    console.log(`Canal ${this.name} ha subido un nuevo video %c${videoTitle}`, COLORS.green)

    this.subscribers.forEach(sub=>sub.notify(videoTitle))
  }

  
}

class Subscriber implements Observer{
  private name: string
  constructor(name:string){
    this.name = name
  }
  
    notify(videoTitle: string): void {
    console.log(`${this.name} ha sido notificado: %cNuevo video ${videoTitle}`, COLORS.orange)
  }

}

function main(){
    const channel = new YouTubeChannel('Cocinando con Kevin')

    const user1 = new Subscriber('Salma')
    const user2 = new Subscriber('Erlan')
    const user3 = new Subscriber('Jefferson')

    channel.subscribe(user1)
    channel.subscribe(user2)
    channel.uploadVideo('Ramen Boliviano')
    
    channel.subscribe(user3)
    channel.uploadVideo('Pique Boliviano')
    
    channel.unsubscribe(user2)
    channel.uploadVideo('Lomo montado Boliviano')

}
main()