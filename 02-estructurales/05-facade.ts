import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Projector {
  turnOn() {
    console.log("Proyector encendido");
  }
  turnOff() {
    console.log("Proyector apagado");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de sonido encendido");
  }
  off() {
    console.log("Sistema de sonido apagado");
  }
}

class VideoPlayer {
  on() {
    console.log("Video player encendido");
  }
  play(movie: string) {
    console.log(`Reproduciendo %c${movie}`, COLORS.purple);
  }
  stop() {
    console.log("Pelicula detenida");
  }
  off() {
    console.log("Video player apagado");
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log("Haciendo palomitas");
  }

  turnOffpoppingPopcorn() {
    console.log("Dejando de hacer palomitas");
  }
}
interface HomeTeatherFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}
class HomeTeatherFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    popcornMaker,
    projector,
    soundSystem,
    videoPlayer,
  }: HomeTeatherFacadeOptions) {
    this.projector = projector;
    this.popcornMaker = popcornMaker;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
  }

  watchMovie(movie:string):void{
    console.log('%cPreparando para ver la pelicula', COLORS.blue)
    this.projector.turnOn()
    this.soundSystem.on()
    this.popcornMaker.poppingPopcorn()
    this.videoPlayer.on()
    this.videoPlayer.play(movie)
    console.log('%cDisfrute la pelicula', COLORS.blue)
  }
  endWatchingMovie():void{
    console.log('%cPreparando para detener la pelicula', COLORS.blue)
    this.projector.turnOff()
    this.soundSystem.off()
    this.popcornMaker.turnOffpoppingPopcorn()
    this.videoPlayer.stop()
    this.videoPlayer.off()
    console.log('%cSistema apagado', COLORS.blue)
  }
}

function main(){
    const projector = new Projector()
    const soundSystem = new SoundSystem()
    const videoPlayer = new VideoPlayer()
    const popcornMaker = new PopcornMaker()

    const hometeather = new HomeTeatherFacade({
        projector,soundSystem,popcornMaker,videoPlayer
})
    hometeather.watchMovie('Avengers')
    hometeather.endWatchingMovie()
}
main()
