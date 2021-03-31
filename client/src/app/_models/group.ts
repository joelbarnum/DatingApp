import { StreamInvocationMessage } from "@microsoft/signalr";

export interface Group {
    name: string;
    connection: Connection[]
}

interface Connection {
    connectionId: string;
    username: string;
}