
export class UserProfile {
    constructor(params) {
        console.log('User Profile params are ', params);
        this.created_at = params.created_at,
        this.email = params.email,
        this.first = params.first,
        this.last = params.last,
        this.imageUrl = params.imageUrl || "/assets/images/nerd-avatar.png" ;
        this.bio = params.bio;
        console.log('This user Profile is ', this );
    }
}