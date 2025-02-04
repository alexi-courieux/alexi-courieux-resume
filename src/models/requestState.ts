export enum State {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    IDLE = 'IDLE'
}

interface RequestState {
    state: State;
    error: any;
}

export default RequestState;
