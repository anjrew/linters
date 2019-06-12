
export class UserProfile {
    constructor(params) {
        this.id = params.id,
        this.created_at = params.created_at || params.profile_creation_date,
        this.email = params.email,
        this.first = params.first,
        this.last = params.last,
        this.imageUrl = params.imageUrl || params.pic_url ||"/assets/images/nerd-avatar.png" ;
        this.bio = params.bio;
    }
}