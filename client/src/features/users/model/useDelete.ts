import { useMutation } from "@tanstack/react-query"
import { deleteUser } from "../api/users"

export const useDelete = () => {
    return useMutation({
        mutationFn: deleteUser
    })
}