import { useCalendarStore } from "../../hooks/useCalendarStore";



export const FavDelete = () => {


    const { startDeleteEvent } = useCalendarStore();

    const handleDelete = async() => {
        await startDeleteEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
