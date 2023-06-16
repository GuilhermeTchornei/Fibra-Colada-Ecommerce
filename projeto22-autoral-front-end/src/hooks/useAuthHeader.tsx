export default function UseAuthHeader(token: string){
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
}