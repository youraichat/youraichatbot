export const loadState = (key: string) =>
{
    try
    {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null)
        {
            return undefined
        }
        return JSON.parse(serializedState)
    }
    catch (err)
    {
        return undefined
    }
}

export const saveState = (key: string, state: any) =>
{
    try
    {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(key, serializedState)
    }
    catch
    {
        console.log('Save state failed!')
    }
}