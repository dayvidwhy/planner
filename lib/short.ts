export const shortName = (username: string) => {
    if (username) {
        return username.split(" ").map((n) => n[0]).join("");
    }
    return "";
};
