export class Menu
{
    name:string
    actions:Action[]
}
export class Action
{
    actionType:string
    definition:string
    httpType:string
    code:string
}