
export class UserProfile {
    constructor(params) {
        this.created_at = params.created_at,
        this.email = params.email,
        this.first = params.first,
        this.last = params.last,
        this.imageUrl = params.imageUrl || params.pic_url ||"/assets/images/nerd-avatar.png" ;
        this.bio = params.bio;
    }
}