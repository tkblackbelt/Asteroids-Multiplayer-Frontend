
import PlayerBlastPacket from './PlayerBlastPacket';
import PlayerPositionPacket from "./PlayerPositionPacket";
import GameInitPacket from './GameInitPacket';
import GameJoinPacket from './GameJoinPacket';
import GameLeavePacket from './GameLeavePacket';
import AsteroidKilledPacket from './AsteroidKilledPacket';
import PlayerDiedPacket from './PlayerDiedPacket';
import PlayerRespawnPacket from './PlayerRespawnPacket';
import Packet from './Packet';


const packetTypeToDecoder = {};

packetTypeToDecoder[PlayerPositionPacket.getType()] = PlayerPositionPacket.decode;
packetTypeToDecoder[PlayerBlastPacket.getType()] = PlayerBlastPacket.decode;
packetTypeToDecoder[GameInitPacket.getType()] = GameInitPacket.decode;
packetTypeToDecoder[GameJoinPacket.getType()] = GameJoinPacket.decode;
packetTypeToDecoder[GameLeavePacket.getType()] = GameLeavePacket.decode;
packetTypeToDecoder[AsteroidKilledPacket.getType()] = AsteroidKilledPacket.decode;
packetTypeToDecoder[PlayerDiedPacket.getType()] = PlayerDiedPacket.decode;
packetTypeToDecoder[PlayerRespawnPacket.getType()] = PlayerRespawnPacket.decode;

export function decode(data: JSON): Packet {
    const packetType = data["packet_type"];
    if (!packetTypeToDecoder) {
        throw new Error(`No packet type received ${data}`);
    }

    const decoder = packetTypeToDecoder[packetType];
    if (!decoder) {
        throw new Error(`No decoder found for packet ${data}`)
    }

    return decoder(data);
}

export { default as Packet } from './Packet';
export { default as PlayerPositionPacket } from './PlayerPositionPacket';
export { default as PlayerBlastPacket } from './PlayerBlastPacket';
export { default as GameInitPacket } from './GameInitPacket';
export { default as GameJoinPacket } from './GameJoinPacket';
export { default as GameLeavePacket } from './GameLeavePacket';
export { default as AsteroidKilledPacket } from './AsteroidKilledPacket';
export { default as PlayerDiedPacket } from './PlayerDiedPacket';
export { default as PlayerRespawnPacket } from './PlayerRespawnPacket';