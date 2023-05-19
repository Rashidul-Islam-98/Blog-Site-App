import Users from "@/models/user";

export default class userMethods {
    public getuser(id) {
        return Users
            .findOne({
                userId: id
            }).select('name email role')
    }
}