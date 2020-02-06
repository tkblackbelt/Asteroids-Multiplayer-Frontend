
import PlayerBlastPacket from './PlayerBlastPacket';
import PlayerPositionPacket from "./PlayerPositionPacket";
import GameInitPacket from './GameInitPacket';
import GameJoinPacket from './GameJoinPacket';
import GameLeavePacket from './GameLeavePacket';
import Packet from './Packet';

const packetTypeToDecoder = {};

packetTypeToDecoder[PlayerPositionPacket.getType()] = PlayerPositionPacket.decode;
packetTypeToDecoder[PlayerBlastPacket.getType()] = PlayerBlastPacket.decode;
packetTypeToDecoder[GameInitPacket.getType()] = GameInitPacket.decode;
packetTypeToDecoder[GameJoinPacket.getType()] = GameJoinPacket.decode;
packetTypeToDecoder[GameLeavePacket.getType()] = GameLeavePacket.decode;

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