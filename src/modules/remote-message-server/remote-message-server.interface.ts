export interface RemoteMessageServerFilterByIdInterface {
    id: number
}

export interface RemoteMessageServerInterface {
    id: number;
    text: string;
}

export interface RemoteMessageServerCreateDataInterface {
    text: string;
}

export interface RemoteMessageServerUpdateDataInterface {
    id: number;
    text: string;
}
