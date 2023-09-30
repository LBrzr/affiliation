import User from "./user";

interface AffiliationLink {
    _id: string;
    name?: string;
    description?: string;
    url: string;
    postedBy: User;
};

export default AffiliationLink;