// resources/UserResource.js
export class UserResource {
    static toJson(user) {
        return {
            type: "Users",
            id: user._id,
            attributes: {
               name: user.name ?? '',
                email: user.email ?? '',
                is_verified: Boolean(user.is_verified ?? false),
                created_at: new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'short', day: '2-digit', year: 'numeric'
                })
            }
        };
    }

    static collection(users) {
        return users.map(user => this.toJson(user));
    }
}

