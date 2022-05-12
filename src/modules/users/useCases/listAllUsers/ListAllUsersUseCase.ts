import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}

class ListAllUsersUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ user_id }: IRequest): User[] {
        const user = this.usersRepository.findById(user_id);
        const userIsAdmin = user.admin === true;

        if (!user || !userIsAdmin) {
            throw new Error("Apenas admin's podem listar usuários");
        }

        const allUsers = this.usersRepository.list();

        return allUsers;
    }
}

export { ListAllUsersUseCase };
