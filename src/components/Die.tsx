import { IDie } from '../interfaces/interfaces';

interface DieProps {
    die: IDie
    placement: string
    callback?: () => void
}

function Die({die, placement, callback}: DieProps) {
    return(
        <div className={'die'}>
            <button onClick={() => callback?.()}>
                {placement === 'rolled_dice' ? `d${die.shape} ${die.value}` : `d${die.shape}`}
            </button>
        </div>
    )
}

export default Die;