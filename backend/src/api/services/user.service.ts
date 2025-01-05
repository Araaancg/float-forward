import Container, { Service } from "typedi";

@Service()
export class UserService {
  private userModel: any;

  constructor() {
    this.userModel = Container.get("User");
  }

  //   async get(
  //     filter?: { [key: string]: any },
  //     options?: { [key: string]: any },
  //   ): Promise<any> {
  //     return await this.userModel.find(filter, {}, options)
  //   }

  //   async create(
  //     user: Partial<any>
  //   ): Promise<any> {
  //       return async () => {
  //         const { name, email } = user

  //         // Check user name is not taken
  //         if (await this.userModel.isNameTaken(name)) {
  //           throw new ApiError(httpStatus.CONFLICT, 'USER NAME ALREADY TAKEN')
  //         }

  //         // Check user email is not taken
  //         if (await this.userModel.isEmailTaken(email)) {
  //           throw new ApiError(httpStatus.CONFLICT, 'THIS EMAIL IS ALREADY IN USE, PLEASE LOGIN INSTEAD')
  //         }

  //         // Create the user.
  //         return (await this.userModel.create([user]))[0]
  //       }

  //   }

  //   async update(
  //     _id: Types.ObjectId,
  //     user: Partial<any>
  //   ): Promise<unknown> {
  //       return async () => {
  //         const { name } = user

  //         const _user = (await this.get({ _id }, {}))[0]

  //         if (!_user) {
  //           throw new ApiError(httpStatus.NOT_FOUND, 'CHAT NOT FOUND')
  //         }

  //         if (await this.userModel.isNameTaken(name, _user._id)) {
  //           throw new ApiError(httpStatus.CONFLICT, 'USER NAME ALREADY TAKEN')
  //         }

  //         if (await this.userModel.isEmailTaken(name)) {
  //           throw new ApiError(httpStatus.CONFLICT, 'THIS EMAIL IS ALREADY IN USE, PLEASE USE ANOTHER ONE INSTEAD')
  //         }

  //         // Assign the updated data and save it
  //         Object.assign(_user, user)
  //         await _user.save()

  //         return _user
  //       }

  //   }

  //   async delete(
  //     _id: Types.ObjectId
  //   ): Promise<unknown> {
  //       return async () => {
  //         const _chat = (await this.get({ _id }, {}))[0]

  //         // Check chat exists.
  //         if (!_chat) {
  //           throw new ApiError(httpStatus.NOT_FOUND, 'CHAT NOT FOUND')
  //         }

  //         // Delete the document.
  //         await _chat.deleteOne()

  //         return _chat
  //       }
  //   }
}
