// deepsdk.d.ts v1.0.81

/// <reference types="easeljs" />
/// <reference types="jquery" />
declare module createjs {
    class DropShadowFilter extends createjs.Filter {
        constructor(distance?: number, angle?: number, color?: number, alpha?: number, blurX?: number, blurY?: number, strength?: number, quality?: number, inner?: boolean, knockout?: boolean, hideObject?: boolean);
    }
    class GlowFilter extends createjs.Filter {
        constructor(color?: number, alpha?: number, blurX?: number, blurY?: number, strength?: number, quality?: number, inner?: boolean, knockout?: boolean);
    }
}
declare module deep.sdk.events {
    class Event {
        type: string;
        constructor(type: string);
    }
}
declare module deep.sdk {
    interface IEventDispatcher {
        dispatchEvent(event: events.Event): void;
        addEventListener(type: string, handlerFunc: (event: events.Event) => void): void;
        removeEventListener(type: string, handlerFunc: (event: events.Event) => void): void;
        removeAllEventListeners(): void;
        hasEventListener(type: string, handlerFunc: (event: events.Event) => void): boolean;
    }
    class EventDispatcher implements IEventDispatcher {
        private listeners;
        dispatchEvent(event: events.Event): void;
        addEventListener(type: string, handlerFunc: (event: events.Event) => void): void;
        removeEventListener(type: string, handlerFunc: (event: events.Event) => void): void;
        removeAllEventListeners(): void;
        hasEventListener(type: string, handlerFunc: (event: events.Event) => void): boolean;
    }
}
declare module deep.sdk.assets {
    class Assets {
        private assets;
        addAsset(id: string, asset: any): void;
        hasAsset(id: string): boolean;
        getAsset(id: string): any;
    }
}
declare module deep {
    var Bridge: deep.sdk.bridge.IBridge;
}
declare module deep.sdk.messaging {
    class AbstractGameRequest {
        private name;
        protected requestParams: any;
        protected requestHeaders: any;
        constructor(name: string);
        appendParam(paramName: string, paramValue: any): void;
        appendHeader(headerName: string, headerValue: any): void;
        readonly Name: string;
        readonly Params: any;
        readonly Headers: any;
    }
}
declare module deep.sdk.bridge {
    interface IDisplayInfo {
        ViewportWidth: number;
        ViewportHeight: number;
        RenderWidth: number;
        RenderHeight: number;
        StageWidth: number;
        StageHeight: number;
        Orientation: sdk.device.Orientation;
        RenderScale: number;
        Breakpoint: number;
        Ratio: number;
        DevicePixelRatio: number;
        GameCanvasScale: number;
    }
}
declare module deep.sdk.bridge {
    interface IGameInfo {
        GameId: string;
        GameContext: string;
        SkinId: string;
        SkinContext: string;
        GameDescriptor: data.GameDescriptor;
        GameOrientation: sdk.device.Orientation;
        Lang: string;
    }
}
declare module deep.sdk.sound {
    interface ISoundEngine extends IEventDispatcher {
        play(id: string, options?: any): string;
        stop(instanceId: string): void;
    }
}
declare module deep.sdk.bridge {
    interface IBridge extends IEventDispatcher {
        sendGameLoaded(): void;
        sendGameReady(): void;
        sendGameRequest(request: messaging.AbstractGameRequest): void;
        showBigWin(): void;
        showSmallWin(): void;
        showLose(): void;
        exitGame(data?: any): void;
        showError(devMessage: string, userMessage?: string): void;
        saveGameItem(key: string, value: string): void;
        getGameItem(key: string): string;
        saveSkinItem(key: string, value: string): void;
        getSkinItem(key: string): string;
        DisplayInfo: sdk.bridge.IDisplayInfo;
        GameInfo: sdk.bridge.IGameInfo;
        GameAssets: sdk.assets.Assets;
        GameLayout: any;
        Sound: sdk.sound.ISoundEngine;
        Lang: any;
    }
}
declare module deep.sdk.component {
    interface CountdownStartArguments {
        onComplete?: Function;
        onReady?: Function;
        onThree?: Function;
        onTwo?: Function;
        onOne?: Function;
        soundId?: string;
    }
    class Countdown extends createjs.Container {
        private ready;
        private three;
        private two;
        private one;
        constructor();
        start(args: CountdownStartArguments): void;
        stop(): void;
        private cleanUp();
    }
}
declare module deep.sdk.data {
    class GameData {
        private data;
        constructor(data: IGameData);
        readonly GameId: string;
        readonly Orientation: string;
        readonly Width: number;
    }
    interface IGameData {
        info: {
            gameId: string;
            orientation: string;
            width: number;
        };
        skins: string[];
    }
}
declare module deep.sdk.data {
    class GameDescriptor {
        private descriptor;
        private gameContext;
        private fileHash;
        constructor(descriptor: IGameDescriptor, gameContext: string);
        private parseGameDescriptorBlock(block, context);
        getFilesToPreload(): IGameDescriptorElement[];
        getColor(id: string): string;
        getProperty(id: string): any;
        readonly Properties: any;
        hasLang(lang: string): boolean;
        getLang(lang: string): string;
        hasDemo(): boolean;
    }
    interface IGameDescriptor {
        data: {
            colors: {};
            properties: {};
        };
        files: {
            skin: IGameDescriptorElement[];
            loader: IGameDescriptorElement[];
        };
        demo: boolean;
        lang: {};
    }
    interface IGameDescriptorElement {
        type: string;
        src: string;
        id: string;
        props?: {
            width?: number;
            height?: number;
        };
        preload?: boolean;
        removable?: boolean;
        removed?: boolean;
        langs?: string[];
    }
}
declare module deep.sdk.data {
    class GameDescriptorConstants {
        static SOUND: string;
        static IMAGE: string;
        static COLOR: string;
        static FONT: string;
        static TEXT: string;
    }
}
declare module deep.sdk.device {
    enum Orientation {
        Portrait = 0,
        Landscape = 1,
    }
}
declare module deep.sdk.events {
    class CloseMenuEvent extends sdk.events.Event {
        static CLOSE: string;
        constructor();
    }
}
declare module deep.sdk.events {
    class GameCleanupEvent extends Event {
        static CLEANUP: string;
        constructor();
    }
}
declare module deep.sdk.events {
    class GameInfoEvent extends Event {
        gameId: string;
        gameContext: string;
        skinId: string;
        skinContext: string;
        width: number;
        height: number;
        orientation: sdk.device.Orientation;
        breakpoint: number;
        ratio: number;
        lang: string;
        static GAME_INFO: string;
        constructor(gameId: string, gameContext: string, skinId: string, skinContext: string, width: number, height: number, orientation: sdk.device.Orientation, breakpoint: number, ratio: number, lang: string);
    }
}
declare module deep.sdk.events {
    class GameResponseEvent extends Event {
        request: sdk.messaging.AbstractGameRequest;
        response: any;
        static GAME_RESPONSE: string;
        constructor(request: sdk.messaging.AbstractGameRequest, response: any);
    }
}
declare module deep.sdk.events {
    class HelpEvent extends sdk.events.Event {
        static HELP: string;
        constructor();
    }
}
declare module deep.sdk.events {
    class OpenMenuEvent extends sdk.events.Event {
        static OPEN: string;
        constructor();
    }
}
declare module deep.sdk.events {
    class OrientationChangeEvent extends sdk.events.Event {
        orientation: sdk.device.Orientation;
        static ORIENTATION_CHANGE: string;
        constructor(orientation: sdk.device.Orientation);
    }
}
declare module deep.sdk.events {
    class ResizeEvent extends sdk.events.Event {
        renderScale: number;
        renderWidth: number;
        renderHeight: number;
        viewportWidth: number;
        viewportHeight: number;
        static RESIZE: string;
        constructor(renderScale: number, renderWidth: number, renderHeight: number, viewportWidth: number, viewportHeight: number);
    }
}
declare module deep.sdk.events {
    class RotationWarningHiddenEvent extends sdk.events.Event {
        static HIDDEN: string;
        constructor();
    }
}
declare module deep.sdk.events {
    class RotationWarningShownEvent extends sdk.events.Event {
        static SHOWN: string;
        constructor();
    }
}
declare module deep.sdk.events {
    class ScrollWarningEndEvent extends sdk.events.Event {
        static END: string;
        constructor();
    }
}
declare module deep.sdk.events {
    class ScrollWarningStartEvent extends sdk.events.Event {
        static START: string;
        constructor();
    }
}
declare module deep.sdk.events {
    class TickerTimerCompleteEvent extends sdk.events.Event {
        private total;
        static COMPLETE: string;
        constructor(total: number);
        readonly Total: number;
    }
}
declare module deep.sdk.events {
    class TickerTimerEvent extends sdk.events.Event {
        private elapsed;
        private remaining;
        private total;
        static TIMER: string;
        constructor(elapsed: number, remaining: number, total: number);
        readonly Elapsed: number;
        readonly Remaining: number;
        readonly Total: number;
        readonly Complete: boolean;
    }
}
declare module deep.sdk.gameplay {
    class Feature {
        static readonly INSTANT: string;
        static readonly LEADERBOARD: string;
    }
}
declare module deep.sdk.gameplay {
    enum PlayResult {
        LOSE = 0,
        SMALLWIN = 1,
        BIGWIN = 2,
    }
}
declare module deep.sdk.games {
    class AbstractGame {
        constructor();
        private ag_onGameInfo;
        protected start(): void;
    }
}
declare module deep.sdk.games {
    class AbstractCreateJSGame extends AbstractGame {
        protected jqGameCanvas: JQuery;
        protected gameCanvas: HTMLCanvasElement;
        protected stage: createjs.Stage;
        private tickerEnabled;
        constructor(enableTicker?: boolean);
        private acjsg_onGameInfo;
        private acjsg_onGameCleanup;
        protected enableTicker(): void;
        protected disableTicker(): void;
        private acjsg_onTick;
        private acjsg_onResize;
        private acjsg_onResizeAfterCleanup;
    }
}
declare module deep.sdk.lang {
    const DEFAULT_LANG: string;
    const SUPPORTED_LANG: string[];
    function isLangSupported(lang: string): boolean;
    function substitute(input: string, vars: any[]): string;
}
declare module deep.sdk.layout {
    enum Registration {
        TopLeft = 0,
        TopCenter = 1,
        TopRight = 2,
        CenterRight = 3,
        BottomRight = 4,
        BottomCenter = 5,
        BottomLeft = 6,
        CenterLeft = 7,
        Center = 8,
        Left = 9,
        Right = 10,
        Top = 11,
        Bottom = 12,
        CenterX = 13,
        CenterY = 14,
        None = 15,
    }
}
declare module deep.sdk.messaging {
    class GameResultRequest extends AbstractGameRequest {
        score: number;
        static NAME: string;
        constructor(score: number);
    }
}
declare module deep.sdk.messaging {
    class GameResultResponse {
        private result;
        constructor(response: any);
    }
}
declare module deep.sdk.messaging {
    class PlayResultRequest extends AbstractGameRequest {
        static NAME: string;
        constructor();
    }
}
declare module deep.sdk.messaging {
    class PlayResultResponse {
        private result;
        constructor(response: any);
        readonly Result: sdk.gameplay.PlayResult;
    }
}
declare module deep.sdk.pause {
    class PauseManager {
        private pauseHandler;
        private unpauseHandler;
        private autoPauseTicker;
        private pauseTrigger;
        constructor(pauseHandler?: Function, unpauseHandler?: Function, autoPauseTicker?: boolean);
        readonly Paused: boolean;
        private onHelp;
        private onOpenMenu;
        private onScrollWarningStart;
        private onRotationWarningShown;
        closeHelp(): void;
        private onCloseMenu;
        private onScrollWarningEnd;
        private onRotationWarningHidden;
        private pause(trigger);
        private unpause(trigger);
    }
}
declare module deep.sdk.text {
    class BitmapTextFactory {
        private static fonts;
        private static defaultProps;
        static setup(id: string, imageId: string, dataId: string): void;
        static setDefaultProps(font: string, props: any): void;
        private static getFont(id);
        static make(idOrObj: string | {
            font: string;
            text?: string;
            props?: any;
            reg?: layout.Registration;
        }, text?: string, props?: any, reg?: layout.Registration): createjs.BitmapText;
        private static createBitmapText(id, text, props, reg);
    }
}
declare module deep.sdk.utils {
    class ColorUtils {
        static luminance(hex: string, lum: number): string;
        static hexToRGBA(hex: string, alpha: number): string;
        static hexToRGBComponents(hex: string): number[];
        static hexToRGB(hex: string): string;
        static RGBToHex(r: number, g: number, b: number): string;
        static hexToInt(hex: string): number;
        static RGBToInt(rgb: string): number;
        static ColorStringToInt(colorString: string): number;
        static expandShorthandHex(hex: string): string;
        static getColorFilter(hex: string): createjs.ColorFilter;
    }
}
declare module deep.sdk.utils {
    class CreateJSUtils {
        static resizeToFit(target: createjs.DisplayObject, constrainWidth: number, constraintHeight: number, preserveAspectRatio?: boolean): void;
        static resizeWidthToFit(target: createjs.DisplayObject, constrainWidth: number, preserveAspectRatio?: boolean, shrinkOnly?: boolean): void;
        static resizeHeightToFit(target: createjs.DisplayObject, constrainHeight: number, preserveAspectRatio?: boolean, shrinkOnly?: boolean): void;
        static centerReg(target: createjs.DisplayObject): void;
        static centerRegX(target: createjs.DisplayObject): void;
        static centerRegY(target: createjs.DisplayObject): void;
        static centerStage(target: createjs.DisplayObject): void;
        static centerStageX(target: createjs.DisplayObject): void;
        static centerStageY(target: createjs.DisplayObject): void;
        static windowToStage(windowPoint: createjs.Point): createjs.Point;
        static canvasToStage(canvasPoint: createjs.Point): createjs.Point;
        static fntXmlToSpriteSheetData(images: HTMLImageElement[], fntXml: XMLDocument, normalizeOffsets?: boolean): any;
    }
}
declare module deep.sdk.utils {
    class HelpUtils {
        static getHelpBackground(orientation: sdk.device.Orientation): createjs.DisplayObject;
        static getNextButton(orientation: sdk.device.Orientation, lang: string): createjs.DisplayObject;
        static getPlayButton(orientation: sdk.device.Orientation, lang: string): createjs.DisplayObject;
        static getButton(id: string, orientation: sdk.device.Orientation): createjs.DisplayObject;
    }
}
declare module deep.sdk.utils {
    class LayoutUtils {
        static applyProps(obj: any, props: any, subs?: any): void;
    }
}
declare module deep.sdk.utils {
    class MobileUtils {
        static getDeviceOrientation(windowRef?: Window): sdk.device.Orientation;
        static isLandscape(windowRef?: Window): boolean;
        static isPortrait(windowRef?: Window): boolean;
        static isAndroid(): boolean;
        static getAndroidVersion(): string;
        static isIOS(): boolean;
        static isIPad(): boolean;
        static isIPhone(): boolean;
        static isIPod(): boolean;
        static isMobileSafari(): boolean;
        static getIOSVersion(): string;
        static isFullScreen(): any;
        static isDesktop(): boolean;
        static isMobile(): boolean;
        static isFacebookMobile(): boolean;
        static isAndroidWebKitBrowser(): boolean;
    }
}
declare module deep.sdk.utils {
    class TickerTimeout {
        private static timeouts;
        private static timeoutId;
        private static running;
        static setTimeout(callback: Function, delay: number, args?: any[], scope?: any): number;
        static setInterval(callback: Function, delay: number, args?: any[], scope?: any): number;
        static clearTimeout(id: number): void;
        static clearInterval(id: number): void;
        private static createInstance(loop, callback, delay, args?, scope?);
        private static checkTimeouts();
    }
}
declare module deep.sdk.utils {
    class TickerTimer extends sdk.EventDispatcher {
        private milliseconds;
        private millisecondResolution;
        private startTime;
        private complete;
        private running;
        private lastTime;
        constructor(milliseconds?: number, millisecondResolution?: boolean);
        start(): boolean;
        stop(): void;
        readonly Complete: boolean;
        readonly Running: boolean;
        private onTick;
    }
}
