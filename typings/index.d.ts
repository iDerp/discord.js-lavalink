declare module "discord.js-lavalink" {
    import { EventEmitter } from "events";
    import * as WebSocket from "ws";
    import {
        Client as DiscordClient,
        Collection
     } from "discord.js";

    export const version: string;

    export class PlayerManager extends PlayerStore<string, Player> {
        public constructor(client: DiscordClient, nodes: object[], options: PlayerManagerOptions);

        public client: DiscordClient;
        public nodes: Collection<string, LavalinkNode>;
        public options: PlayerManagerOptions;

        public createNode(options: object): void;
        public removeNode(host: string): boolean;
        private onMessage(message: object): any;
        public join(data: { guild: string, channel: string, host: string, }, options?: { selfmute?: boolean, selfdeaf?: boolean }): Promise<Player>;
        public leave(guild: string): boolean;
        private voiceServerUpdate(data: object): void;
        public spawnPlayer(data: { guild: string, channel: string, host: string }): Player;
    }

    export class PlayerStore<K, V> extends Collection<K, V> {
        public constructor(Player: Player);

        private Player: Player;
        private add(obj: object): Player;
    }

    export class Player extends EventEmitter {
        public constructor(options: PlayerOptions);

        public options: PlayerOptions;
        public id: string;
        public client: DiscordClient;
        public manager: PlayerManager;
        public node: LavalinkNode;
        public channel: string;
        public playing: boolean;
        public state: object;
        public track?: Base64;
        public timestamp?: number;

        public connect(data: object): void;
        public disconnect(msg?: string): void;
        public play(track: Base64, options?: { startTime?: number, endTime?: number }): void;
        public stop(): void;
        public pause(pause?: boolean): void;
        public volume(volume: number): void;
        public seek(position: number): void;
        public destroy(): void;
        public switchChannel(channel: string, reactive?: boolean): boolean;
        private event(message: object): any;
        private updateVoiceState(channel: string, options?: { selfmute?: boolean, selfdeaf?: boolean }): void;
    }

    class LavalinkNode extends EventEmitter {
        public constructor(options: NodeOptions);

        public host: string;
        public port?: number | string;
        public address?: string;
        public region?: string;
        public user: string;
        public shards: number;
        public password?: string;
        public connected: boolean;
        public ws?: WebSocket;
        public autoReconnectInterval?: number;
        public stats: NodeStats;

        public connect(): void;
        public send(data: object): boolean;
        public destroy(): boolean;
        private reconnect(): void;
        private _onOpen(): void;
        private _onClose(code: number, reason?: string): void;
        private _onMessage(msg: object): any;
        private _onError(error: Error): void;
    }

    export { LavalinkNode as Node };

    export class Util {
        public static isClass(input: Function): boolean;
    }

    export type PlayerManagerOptions = {
        user: string;
        shards: number;
    };

    export type PlayerOptions = {
        id: string;
        client: DiscordClient;
        manager: PlayerManager;
        node: LavalinkNode;
        channel: string;
    };

    export type NodeOptions = {
        host: string;
        port?: number | string;
        address?: string;
        region?: string;
        user: string;
        shards: number;
        password?: string;
        reconnectInterval?: number;
    };

    export type NodeStats = {
        players: number;
        playingPlayers: number;
    };

    export type Base64 = string;
}
