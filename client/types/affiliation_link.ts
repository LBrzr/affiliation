import User from "./user";

interface AffiliationLink {
    id: string;
    name?: string;
    description?: string;
    url: string;
    postedBy: User;
};

export default AffiliationLink;