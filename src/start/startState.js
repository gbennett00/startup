export class StartState {
    static Unknown = new StartState('unknown');
    static StartHome = new StartState('start-home');
    static Hosting = new StartState('hosting');
    static Joining = new StartState('joining');
  
    constructor(name) {
      this.name = name;
    }
}