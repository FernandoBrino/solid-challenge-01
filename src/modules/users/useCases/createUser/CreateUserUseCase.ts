import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ email, name }: IRequest): User {
        const user = this.usersRepository.create({ email, name });
        const emailExists = this.usersRepository.findByEmail(email);

        if (emailExists) {
            throw new Error("Um usuário com esse email já existe");
        }

        return user;
    }
}

export { CreateUserUseCase };
