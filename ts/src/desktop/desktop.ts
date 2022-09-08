import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

class Desktop extends AppWindow {
    private static _instance: Desktop;

    private constructor() {
        super(kWindowNames.desktop);
    }

    public static instance() {
        if (!this._instance) {
            this._instance = new Desktop();
        }

        return this._instance;
    }

    public async run() {
        //   const gameClassId = await this.getCurrentGameClassId();

        //   const gameFeatures = kGamesFeatures.get(gameClassId);

        //   if (gameFeatures && gameFeatures.length) {
        //     this._gameEventsListener = new OWGamesEvents(
        //       {
        //         onInfoUpdates: this.onInfoUpdates.bind(this),
        //         onNewEvents: this.onNewEvents.bind(this)
        //       },
        //       gameFeatures
        //     );

        //     this._gameEventsListener.start();
        //   }
    }
}

Desktop.instance().run();