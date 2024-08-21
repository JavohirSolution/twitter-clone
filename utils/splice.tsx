export function spliceUserName(name: string) {
    let username: string;
    if (name.split("").length > 15) {
        username = name.toLocaleLowerCase().replace(" ", "").slice(0, 8);
    } else {
        username = name.toLocaleLowerCase().replace(" ", "");
    }
    return username
}