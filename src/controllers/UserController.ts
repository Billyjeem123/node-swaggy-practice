export class UserController{


  static login(req, res, next) {
    const error: any = new Error('Email and password is incorrect');
    error.status = 422; // Attach your custom status here
    next(error);
}


}