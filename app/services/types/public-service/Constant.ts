export type Constant = {
    id: number, 
    key: 'inactivity_days' | 'session_timeout',
    key_type: 'int' | 'string',
    value: string
}