import {
    OWGames,
    OWGamesEvents,
    OWHotkeys
  } from "@overwolf/overwolf-api-ts";
  
import { AppWindow } from "../AppWindow";
import { kGamesFeatures, kWindowNames } from "../consts";

class Desktop extends AppWindow {
    private static _instance: Desktop;
    private _gameEventsListener: OWGamesEvents;
    private _eventsLog: HTMLElement;
    private _infoLog: HTMLElement;

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
          const gameClassId = await this.getCurrentGameClassId();

          const gameFeatures = kGamesFeatures.get(gameClassId);

          if (gameFeatures && gameFeatures.length) {
            this._gameEventsListener = new OWGamesEvents(
              {
                onInfoUpdates: this.onInfoUpdates.bind(this),
                onNewEvents: this.onNewEvents.bind(this)
              },
              gameFeatures
            );

            this._gameEventsListener.start();
          }
    }

    private onInfoUpdates(info) {
        this.logLine(this._infoLog, info, false);
      }
    
      // Special events will be highlighted in the event log
      private onNewEvents(e) {
        const shouldHighlight = e.events.some(event => {
          switch (event.name) {
            case 'kill':
            case 'death':
            case 'assist':
            case 'match_info':
              return true;
          }
    
          return false
        });
        this.logLine(this._eventsLog, e, shouldHighlight);
      }
    
      // Appends a new line to the specified log
      private logLine(log: HTMLElement, data, highlight) {
        const line = document.createElement('pre');
        line.textContent = JSON.stringify(data);
    
        if (highlight) {
          line.className = 'highlight';
        }
    
        // Check if scroll is near bottom
        const shouldAutoScroll =
          log.scrollTop + log.offsetHeight >= log.scrollHeight - 10;
    
        log.appendChild(line);
    
        if (shouldAutoScroll) {
          log.scrollTop = log.scrollHeight;
        }
      }
    
      private async getCurrentGameClassId(): Promise<number | null> {
        const info = await OWGames.getRunningGameInfo();
    
        return (info && info.isRunning && info.classId) ? info.classId : null;
      }
}



Desktop.instance().run();